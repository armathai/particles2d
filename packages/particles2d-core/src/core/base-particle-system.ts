import { BaseParticle } from './base-particle';

export abstract class BaseParticleSystem<P extends BaseParticle> {
    public static maxParticlesCount = 16383;

    protected particles: P[] = [];

    private _frameTime: number = 0;
    private _particlesCount: number = 0;
    private _defaultDuration!: number;
    private _emissionRate: number = 10;
    private _emissionTime: number = 0;
    private _emitterX: number = 0;
    private _emitterY: number = 0;
    private _maxParticlesCount = 128;

    // smoothed emitter positions
    private _emitterNextX: number = 0;
    private _emitterNextY: number = 0;

    // properties

    public get isEmitting(): boolean {
        return this._emissionTime > 0 && this._emissionRate > 0;
    }

    public get particlesCount(): number {
        return this._particlesCount;
    }

    public get emissionRate(): number {
        return this._emissionRate;
    }

    public set emissionRate(value: number) {
        this._emissionRate = value;
    }

    /** The x-coordinate of the emitter, where new particles are spawning. */
    public get emitterX(): number {
        return this._emitterX;
    }

    public set emitterX(value: number) {
        this._emitterX = this._emitterNextX = value;
    }

    /** The y-coordinate of the emitter, where new particles are spawning. */
    public get emitterY(): number {
        return this._emitterY;
    }

    public set emitterY(value: number) {
        this._emitterY = this._emitterNextY = value;
    }

    /** Smoothly moves the x-coordinate of the emitter to this coordinate during the next frame.
     *  This provides a homogeneous particle distribution in situations with a low frame rate. */
    public get emitterNextX(): number {
        return this._emitterNextX;
    }

    public set emitterNextX(value: number) {
        this._emitterNextX = value;
    }

    /** Smoothly moves the y-coordinate of the emitter to this coordinate during the next frame.
     *  This provides homogeneous particle distribution in situations with a low frame rate. */
    public get emitterNextY(): number {
        return this._emitterNextY;
    }

    public set emitterNextY(value: number) {
        this._emitterNextY = value;
    }

    public get maxParticlesCount(): number {
        return this._maxParticlesCount;
    }

    public set maxParticlesCount(value: number) {
        const oldCapacity: number = this._maxParticlesCount;
        this._maxParticlesCount =
            value > BaseParticleSystem.maxParticlesCount ? BaseParticleSystem.maxParticlesCount : value;
        for (let i = 0; i < this._maxParticlesCount; ++i) {
            this.particles.push(this.createParticle());
        }
        if (this._maxParticlesCount < oldCapacity) {
            this.particles.length = this._maxParticlesCount;
            if (this._particlesCount > this._maxParticlesCount) this._particlesCount = this._maxParticlesCount;
        }
    }

    public get defaultDuration(): number | undefined {
        return this._defaultDuration;
    }

    public set defaultDuration(value: number) {
        this._defaultDuration = value < 0 ? Number.MAX_VALUE : value;
    }

    /** Starts the emitter for a certain time. @default infinite time */
    public start(duration?: number): void {
        if (this._emissionRate !== 0)
            this._emissionTime = duration ? (duration < 0 ? Number.MAX_VALUE : duration) : this._defaultDuration;
        this.particles.forEach((particle) => {
            particle.start();
        });
    }

    /** Stops emitting new particles. Depending on 'clearParticlesImmediately', the existing particles
     *  will either keep animating until they die or will be removed right away. */
    public stop(clearParticlesImmediately: boolean = false): void {
        this._emissionTime = 0;
        this.particles.forEach((particle) => {
            particle.stop();
        });
        if (clearParticlesImmediately) this.clear();
    }

    /** Removes all currently active particles. */
    public clear(): void {
        this._particlesCount = 0;
        this.particles.forEach((particle) => {
            particle.remove();
        });
    }

    public update(dt: number): void {
        let particleIndex: number = 0;
        const maxNumParticles: number = this._maxParticlesCount;

        // advance existing particles
        while (particleIndex < this._particlesCount) {
            const particle = this.particles[particleIndex];

            if (particle.currentTime < particle.totalTime) {
                this.updateParticle(particle, dt);
                ++particleIndex;
            } else {
                if (particleIndex !== this._particlesCount - 1) {
                    const nextParticle = this.particles[this._particlesCount - 1];
                    this.particles[this._particlesCount - 1] = particle;
                    this.particles[particleIndex] = nextParticle;
                }

                --this._particlesCount;
                particle.sleep();

                if (this._particlesCount === 0 && this._emissionTime === 0) {
                    this.onComplete();
                }
            }
        }

        // create and advance new particles

        if (this._emissionTime > 0) {
            this._frameTime += dt;

            let frameTimeRatio: number;
            const emitterLastX: number = this._emitterX;
            const emitterLastY: number = this._emitterY;
            const emitterMoveX: number = this._emitterNextX - emitterLastX;
            const emitterMoveY: number = this._emitterNextY - emitterLastY;
            let timeBetweenParticles: number = 1 / this._emissionRate;

            // if we'd exceed capacity, lower spawn rate
            if (
                this._particlesCount < maxNumParticles &&
                this._particlesCount + this._frameTime / timeBetweenParticles > maxNumParticles
            ) {
                timeBetweenParticles = this._frameTime / (maxNumParticles - this._particlesCount);
            }

            while (this._frameTime > 0) {
                if (this._particlesCount < maxNumParticles) {
                    if (emitterMoveX || emitterMoveY) {
                        frameTimeRatio = 1 - this._frameTime / dt;
                        this._emitterX = emitterLastX + emitterMoveX * frameTimeRatio;
                        this._emitterY = emitterLastY + emitterMoveY * frameTimeRatio;
                    }

                    const particle = this.particles[this._particlesCount];
                    this.initParticle(particle);

                    // particle might be dead at birth
                    if (particle.totalTime > 0) {
                        this.updateParticle(particle, this._frameTime);
                        ++this._particlesCount;
                    }
                }
                this._frameTime -= timeBetweenParticles;
            }

            if (this._emissionTime !== Number.MAX_VALUE)
                this._emissionTime = this._emissionTime > dt ? this._emissionTime - dt : 0;

            if (this._particlesCount === 0 && this._emissionTime === 0) {
                this.onComplete();
            }
        }

        this._emitterX = this._emitterNextX;
        this._emitterY = this._emitterNextY;

        // update vertex data

        for (let i: number = 0; i < this._particlesCount; ++i) {
            const particle = this.particles[i];
            particle.update();
        }
    }

    /** Initialize the <code>ParticleSystem</code> with particles distributed randomly
     *  throughout their lifespans. */
    public populate(count: number): void {
        const maxNumParticles: number = this._maxParticlesCount;
        count = Math.min(count, maxNumParticles - this._particlesCount);

        for (let i: number = 0; i < count; i++) {
            const p = this.particles[this._particlesCount + i];
            this.initParticle(p);
            this.updateParticle(p, Math.random() * p.totalTime);
        }

        this._particlesCount += count;
    }

    protected onComplete(): void {
        this.particles.forEach((particle) => {
            particle.remove();
        });
    }

    protected abstract createParticle(): P;

    protected abstract initParticle(particle: P): void;

    protected abstract updateParticle(particle: P, passedTime: number): void;
}
