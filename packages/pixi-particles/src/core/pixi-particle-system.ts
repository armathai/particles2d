// =================================================================================================
//
//	Starling Framework - Particle System Extension
//	Copyright 2012 Gamua OG. All Rights Reserved.
//
//	This program is free software. You can redistribute and/or modify it
//	in accordance with the terms of the accompanying license agreement.
//
// =================================================================================================

import { ParticleConfig, ParticleSystem } from '@armathai/particles2d-core';
import { Container, Texture, utils } from 'pixi.js';
import { PixiParticle } from './pixi-particle';

export class PixiParticleSystem extends ParticleSystem<PixiParticle> {
    public readonly event = new utils.EventEmitter<{
        start: [];
        stop: [];
        clear: [];
        complete: [];
    }>();

    private _parent: Container;
    private _texture: Texture;

    public constructor(pixiParticleSystemConfig: { config: ParticleConfig; parent?: Container; texture: Texture }) {
        super(pixiParticleSystemConfig.config);
        this._parent = pixiParticleSystemConfig.parent || new Container();
        this._texture = pixiParticleSystemConfig.texture;
    }

    public get parent(): Container {
        return this._parent;
    }

    public start(duration?: number): void {
        super.start(duration);
        this.event.emit('start');
    }

    public stop(clearParticles: boolean = false): void {
        super.stop(clearParticles);
        this.event.emit('stop');
    }

    public clear(): void {
        super.clear();
        this.event.emit('clear');
    }

    protected createParticle(): PixiParticle {
        return new PixiParticle();
    }

    protected initParticle(particle: PixiParticle): void {
        particle.texture = this._texture;
        this._parent.addChild(particle.sprite);
        super.initParticle(particle);
    }

    protected onComplete(): void {
        super.onComplete();
        this.event.emit('complete');
    }
}
