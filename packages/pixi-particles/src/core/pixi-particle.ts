import { Particle } from '@armathai/particles2d-core';
import { Sprite, Texture } from 'pixi.js';

export class PixiParticle extends Particle {
    private _sprite: Sprite;

    public constructor() {
        super();
        this._sprite = new Sprite();
        this._sprite.anchor.set(0.5);
        this._sprite.visible = false;
    }

    public get size(): number {
        return this._sprite.texture.width;
    }

    public get sprite(): Sprite {
        return this._sprite;
    }

    public set texture(texture: Texture) {
        this._sprite.texture = texture;
    }

    public update(): void {
        this.sprite.renderable = true;
        this.sprite.position.set(this.x, this.y);
        this.sprite.scale.set(this.scale);
        this.sprite.alpha = this.alpha;
        this.sprite.rotation = this.rotation;
        this.sprite.tint = this.tint;
        this.sprite.blendMode = this.blendMode;
    }

    public sleep(): void {
        this.sprite.renderable = false;
    }

    public start(): void {
        this.sprite.visible = true;
    }

    public stop(): void {
        this.sprite.renderable = false;
    }

    public remove(): void {
        this.sprite.visible = false;
    }
}
