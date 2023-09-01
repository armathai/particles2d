import { Color } from '../color';
import { BaseParticle } from './base-particle';

export abstract class Particle extends BaseParticle {
    public color: Color;
    public colorDelta: Color;
    public startX: number = 0;
    public startY: number = 0;
    public velocityX: number = 0;
    public velocityY: number = 0;
    public radialAcceleration: number = 0;
    public tangentialAcceleration: number = 0;
    public emitRadius: number = 0;
    public emitRadiusDelta: number = 0;
    public emitRotation: number = 0;
    public emitRotationDelta: number = 0;
    public rotationDelta: number = 0;
    public scaleDelta: number = 0;
    public blendMode: 0 | 1 | 2 | 3 = 0;

    public abstract get size(): number;

    public constructor() {
        super();
        this.color = new Color();
        this.colorDelta = new Color();
    }
}
