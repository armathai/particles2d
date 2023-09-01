export abstract class BaseParticle {
    public x = 0;
    public y = 0;
    public scale = 1;
    public rotation = 0;
    public tint = 0xffffff;
    public alpha = 1;
    public currentTime = 0;
    public totalTime = 1;

    public abstract update(): void;
    public abstract sleep(): void;
    public abstract start(): void;
    public abstract stop(): void;
    public abstract remove(): void;
}
