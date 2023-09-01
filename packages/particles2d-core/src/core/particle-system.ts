// =================================================================================================
//
//	Starling Framework - Particle System Extension
//	Copyright 2012 Gamua OG. All Rights Reserved.
//
//	This program is free software. You can redistribute and/or modify it
//	in accordance with the terms of the accompanying license agreement.
//
// =================================================================================================

import { Color } from '../color';
import { ParticleConfig } from '../types';
import { DEG_TO_RAD, getAsColor } from '../utils';
import { BaseParticleSystem } from './base-particle-system';
import { Particle } from './particle';

export abstract class ParticleSystem<P extends Particle> extends BaseParticleSystem<P> {
    public static emitterTypeGravity: number = 0;
    public static emitterTypeRadial: number = 1;

    // emitter configuration
    private _emitterType: number; // emitterType
    private _emitterXSpread: number; // sourcePositionSpread x
    private _emitterYSpread: number; // sourcePositionSpread y

    // particle configuration
    private _lifespan: number; // particleLifeSpan
    private _lifespanSpread: number; // particleLifeSpanSpread
    private _startSize: number; // startParticleSize
    private _startSizeSpread: number; // startParticleSizeSpread
    private _endSize: number; // endParticleSize
    private _endSizeSpread: number; // endParticleSizeSpread
    private _emitAngle: number; // angle
    private _emitAngleSpread: number; // angleSpread
    private _startRotation: number; // rotationStart
    private _startRotationSpread: number; // rotationStartSpread
    private _endRotation: number; // rotationEnd
    private _endRotationSpread: number; // rotationEndSpread

    // gravity configuration
    private _speed: number; // speed
    private _speedSpread: number; // speedSpread
    private _gravityX: number; // gravity x
    private _gravityY: number; // gravity y
    private _radialAcceleration: number; // radialAcceleration
    private _radialAccelerationSpread: number; // radialAccelerationSpread
    private _tangentialAcceleration: number; // tangentialAcceleration
    private _tangentialAccelerationSpread: number; // tangentialAccelerationSpread

    // radial configuration
    private _maxRadius: number; // maxRadius
    private _maxRadiusSpread: number; // maxRadiusSpread
    private _minRadius: number; // minRadius
    private _minRadiusSpread: number; // minRadiusSpread
    private _rotatePerSecond: number; // rotatePerSecond
    private _rotatePerSecondSpread: number; // rotatePerSecondSpread

    // color configuration
    private _startColor: Color; // startColor
    private _startColorSpread: Color; // startColorSpread
    private _endColor: Color; // endColor
    private _endColorSpread: Color; // endColorSpread

    // blend mode configuration
    private _blendMode: 0 | 1 | 2 | 3; // blendFuncSource

    public constructor(config: ParticleConfig) {
        super();
        // const parser = new DOMParser();
        // const xmlDoc = parser.parseFromString(config, 'text/xml');

        // _emitterXSpread = parseFloat(config.sourcePositionSpread.attribute("x"));
        // _emitterYSpread = parseFloat(config.sourcePositionSpread.attribute("y"));
        const [x, y] = config.sourcePositionSpread; //getAttributesAsNumber(xmlDoc, 'sourcePositionSpread', ['x', 'y']);
        this._emitterXSpread = x;
        this._emitterYSpread = y;

        // _gravityX = parseFloat(config.gravity.attribute("x"));
        // _gravityY = parseFloat(config.gravity.attribute("y"));
        const [gravityX, gravityY] = config.gravity; //getAttributesAsNumber(xmlDoc, 'gravity', ['x', 'y']);
        this._gravityX = gravityX;
        this._gravityY = gravityY;

        // _emitterType = getIntValue(config.emitterType);
        this._emitterType = config.emitterType; //getAttributesAsNumber(xmlDoc, 'emitterType')[0]!;

        // _lifespan = Math.max(0.01, getFloatValue(config.particleLifeSpan));
        this._lifespan = config.particleLifeSpan; //Math.max(0.01, getAttributesAsNumber(xmlDoc, 'particleLifeSpan')[0]!);

        // _lifespanSpread = getFloatValue(config.particleLifespanSpread);
        this._lifespanSpread = config.particleLifespanSpread; //getAttributesAsNumber(xmlDoc, 'particleLifespanSpread')[0]!;

        // _startSize = getFloatValue(config.startParticleSize);
        this._startSize = config.startParticleSize; //getAttributesAsNumber(xmlDoc, 'startParticleSize')[0]!;

        // _startSizeSpread = getFloatValue(config.startParticleSizeSpread);
        this._startSizeSpread = config.startParticleSizeSpread; //getAttributesAsNumber(xmlDoc, 'startParticleSizeSpread')[0]!;

        // _endSize = getFloatValue(config.endParticleSize);
        this._endSize = config.endParticleSize; //getAttributesAsNumber(xmlDoc, 'endParticleSize')[0]!;

        // _endSizeSpread = getFloatValue(config.endParticleSizeSpread);
        this._endSizeSpread = config.endParticleSizeSpread;
        // getAttributesAsNumber(xmlDoc, 'endParticleSizeSpread')[0] ??
        // getAttributesAsNumber(xmlDoc, 'endParticleSizeSpread')[0]!;

        // _emitAngle = deg2rad(getFloatValue(config.angle));
        this._emitAngle = DEG_TO_RAD * config.angle; //getAttributesAsNumber(xmlDoc, 'angle')[0]!;

        // _emitAngleSpread = deg2rad(getFloatValue(config.angleSpread));
        this._emitAngleSpread = DEG_TO_RAD * config.angleSpread; //getAttributesAsNumber(xmlDoc, 'angleSpread')[0]!;

        // _startRotation = deg2rad(getFloatValue(config.rotationStart));
        this._startRotation = DEG_TO_RAD * config.rotationStart; //getAttributesAsNumber(xmlDoc, 'rotationStart')[0]!;

        // _startRotationSpread = deg2rad(getFloatValue(config.rotationStartSpread));
        this._startRotationSpread = DEG_TO_RAD * config.rotationStartSpread; //getAttributesAsNumber(xmlDoc, 'rotationStartSpread')[0]!;

        // _endRotation = deg2rad(getFloatValue(config.rotationEnd));
        this._endRotation = DEG_TO_RAD * config.rotationEnd; //getAttributesAsNumber(xmlDoc, 'rotationEnd')[0]!;

        // _endRotationSpread = deg2rad(getFloatValue(config.rotationEndSpread));
        this._endRotationSpread = DEG_TO_RAD * config.rotationEndSpread; //getAttributesAsNumber(xmlDoc, 'rotationEndSpread')[0]!;

        // _speed = getFloatValue(config.speed);
        this._speed = config.speed; //getAttributesAsNumber(xmlDoc, 'speed')[0]!;

        // _speedSpread = getFloatValue(config.speedSpread);
        this._speedSpread = config.speedSpread; //getAttributesAsNumber(xmlDoc, 'speedSpread')[0]!;

        // _radialAcceleration = getFloatValue(config.radialAcceleration);
        this._radialAcceleration = config.radialAcceleration; //getAttributesAsNumber(xmlDoc, 'radialAcceleration')[0]!;

        // _radialAccelerationSpread = getFloatValue(config.radialAccelSpread);
        this._radialAccelerationSpread = config.radialAccelSpread; //getAttributesAsNumber(xmlDoc, 'radialAccelSpread')[0]!;

        // _tangentialAcceleration = getFloatValue(config.tangentialAcceleration);
        this._tangentialAcceleration = config.tangentialAcceleration; //getAttributesAsNumber(xmlDoc, 'tangentialAcceleration')[0]!;

        // _tangentialAccelerationSpread = getFloatValue(config.tangentialAccelSpread);
        this._tangentialAccelerationSpread = config.tangentialAccelSpread; //getAttributesAsNumber(xmlDoc, 'tangentialAccelSpread')[0]!;

        // _maxRadius = getFloatValue(config.maxRadius);
        this._maxRadius = config.maxRadius; //getAttributesAsNumber(xmlDoc, 'maxRadius')[0]!;

        // _maxRadiusSpread = getFloatValue(config.maxRadiusSpread);
        this._maxRadiusSpread = config.maxRadiusSpread; //getAttributesAsNumber(xmlDoc, 'maxRadiusSpread')[0]!;

        // _minRadius = getFloatValue(config.minRadius);
        this._minRadius = config.minRadius; // getAttributesAsNumber(xmlDoc, 'minRadius')[0]!;

        // _minRadiusSpread = getFloatValue(config.minRadiusSpread);
        this._minRadiusSpread = config.minRadiusSpread; // getAttributesAsNumber(xmlDoc, 'minRadiusSpread')[0] ?? 0;

        // _rotatePerSecond = deg2rad(getFloatValue(config.rotatePerSecond));
        this._rotatePerSecond = DEG_TO_RAD * config.rotatePerSecond; //getAttributesAsNumber(xmlDoc, 'rotatePerSecond')[0]!;

        // _rotatePerSecondSpread = deg2rad(getFloatValue(config.rotatePerSecondSpread));
        this._rotatePerSecondSpread = DEG_TO_RAD * config.rotatePerSecondSpread; //getAttributesAsNumber(xmlDoc, 'rotatePerSecondSpread')[0]!;

        // _startColor = getColor(config.startColor);
        this._startColor = getAsColor(config.startColor); //getAttributeAsColor(xmlDoc, 'startColor');

        // _startColorSpread = getColor(config.startColorSpread);
        this._startColorSpread = getAsColor(config.startColorSpread); //getAttributeAsColor(xmlDoc, 'startColorSpread');

        // _endColor = getColor(config.endColor);
        this._endColor = getAsColor(config.endColor); //getAttributeAsColor(xmlDoc, 'endColor');

        // _endColorSpread = getColor(config.endColorSpread);
        this._endColorSpread = getAsColor(config.endColorSpread); // getAttributeAsColor(xmlDoc, 'endColorSpread');

        // _blendFactorSource = getBlendFunc(config.blendFuncSource);
        this._blendMode = config.blendMode; //getAttributesAsNumber(xmlDoc, 'blendFuncSource')[0]!;

        // _blendFactorDestination = getBlendFunc(config.blendFuncDestination);
        // this._blendFactorDestination = getAttributesAsNumber(xmlDoc, 'blendFuncDestination');

        // defaultDuration = getFloatValue(config.duration);
        this.defaultDuration = config.duration; //getAttributesAsNumber(xmlDoc, 'duration')[0]!;

        // capacity = getIntValue(config.particlesCount);
        this.maxParticlesCount = config.particlesCount; //getAttributesAsNumber(xmlDoc, 'particlesCount')[0]!;

        this._updateEmissionRate();
        this._updateBlendMode();
    }

    public get blendMode(): number {
        return this._blendMode;
    }

    public set blendMode(value: 0 | 1 | 2 | 3) {
        this._blendMode = value;
        this._updateBlendMode();
    }

    public get emitterType(): number {
        return this._emitterType;
    }

    public set emitterType(value: number) {
        this._emitterType = value;
    }

    public get emitterXSpread(): number {
        return this._emitterXSpread;
    }

    public set emitterXSpread(value: number) {
        this._emitterXSpread = value;
    }

    public get emitterYSpread(): number {
        return this._emitterYSpread;
    }

    public set emitterYSpread(value: number) {
        this._emitterYSpread = value;
    }

    public get maxParticlesCount(): number {
        return super.maxParticlesCount;
    }

    public set maxParticlesCount(value: number) {
        super.maxParticlesCount = value;
        this._updateEmissionRate();
    }

    public get lifespan(): number {
        return this._lifespan;
    }

    public set lifespan(value: number) {
        this._lifespan = Math.max(0.01, value);
        this._updateEmissionRate();
    }

    public get lifespanSpread(): number {
        return this._lifespanSpread;
    }

    public set lifespanSpread(value: number) {
        this._lifespanSpread = value;
    }

    public get startSize(): number {
        return this._startSize;
    }

    public set startSize(value: number) {
        this._startSize = value;
    }

    public get startSizeSpread(): number {
        return this._startSizeSpread;
    }

    public set startSizeSpread(value: number) {
        this._startSizeSpread = value;
    }

    public get endSize(): number {
        return this._endSize;
    }

    public set endSize(value: number) {
        this._endSize = value;
    }

    public get endSizeSpread(): number {
        return this._endSizeSpread;
    }

    public set endSizeSpread(value: number) {
        this._endSizeSpread = value;
    }

    public get emitAngle(): number {
        return this._emitAngle;
    }

    public set emitAngle(value: number) {
        this._emitAngle = value;
    }

    public get emitAngleSpread(): number {
        return this._emitAngleSpread;
    }

    public set emitAngleSpread(value: number) {
        this._emitAngleSpread = value;
    }

    public get startRotation(): number {
        return this._startRotation;
    }

    public set startRotation(value: number) {
        this._startRotation = value;
    }

    public get startRotationSpread(): number {
        return this._startRotationSpread;
    }

    public set startRotationSpread(value: number) {
        this._startRotationSpread = value;
    }

    public get endRotation(): number {
        return this._endRotation;
    }

    public set endRotation(value: number) {
        this._endRotation = value;
    }

    public get endRotationSpread(): number {
        return this._endRotationSpread;
    }

    public set endRotationSpread(value: number) {
        this._endRotationSpread = value;
    }

    public get speed(): number {
        return this._speed;
    }

    public set speed(value: number) {
        this._speed = value;
    }

    public get speedSpread(): number {
        return this._speedSpread;
    }

    public set speedSpread(value: number) {
        this._speedSpread = value;
    }

    public get gravityX(): number {
        return this._gravityX;
    }

    public set gravityX(value: number) {
        this._gravityX = value;
    }

    public get gravityY(): number {
        return this._gravityY;
    }

    public set gravityY(value: number) {
        this._gravityY = value;
    }

    public get radialAcceleration(): number {
        return this._radialAcceleration;
    }

    public set radialAcceleration(value: number) {
        this._radialAcceleration = value;
    }

    public get radialAccelerationSpread(): number {
        return this._radialAccelerationSpread;
    }

    public set radialAccelerationSpread(value: number) {
        this._radialAccelerationSpread = value;
    }

    public get tangentialAcceleration(): number {
        return this._tangentialAcceleration;
    }

    public set tangentialAcceleration(value: number) {
        this._tangentialAcceleration = value;
    }

    public get tangentialAccelerationSpread(): number {
        return this._tangentialAccelerationSpread;
    }

    public set tangentialAccelerationSpread(value: number) {
        this._tangentialAccelerationSpread = value;
    }

    public get maxRadius(): number {
        return this._maxRadius;
    }

    public set maxRadius(value: number) {
        this._maxRadius = value;
    }

    public get maxRadiusSpread(): number {
        return this._maxRadiusSpread;
    }

    public set maxRadiusSpread(value: number) {
        this._maxRadiusSpread = value;
    }

    public get minRadius(): number {
        return this._minRadius;
    }

    public set minRadius(value: number) {
        this._minRadius = value;
    }

    public get minRadiusSpread(): number {
        return this._minRadiusSpread;
    }
    public set minRadiusSpread(value: number) {
        this._minRadiusSpread = value;
    }

    public get rotatePerSecond(): number {
        return this._rotatePerSecond;
    }

    public set rotatePerSecond(value: number) {
        this._rotatePerSecond = value;
    }

    public get rotatePerSecondSpread(): number {
        return this._rotatePerSecondSpread;
    }

    public set rotatePerSecondSpread(value: number) {
        this._rotatePerSecondSpread = value;
    }

    public get startColor(): Color {
        return this._startColor;
    }

    public set startColor(value: Color) {
        this._startColor = value;
    }

    public get startColorSpread(): Color {
        return this._startColorSpread;
    }

    public set startColorSpread(value: Color) {
        this._startColorSpread = value;
    }

    public get endColor(): Color {
        return this._endColor;
    }

    public set endColor(value: Color) {
        this._endColor = value;
    }

    public get endColorSpread(): Color {
        return this._endColorSpread;
    }

    public set endColorSpread(value: Color) {
        this._endColorSpread = value;
    }

    protected initParticle(particle: P): void {
        // for performance reasons, the random spreads are calculated inline instead
        // of calling a function

        const lifespan: number = this._lifespan + this._lifespanSpread * (Math.random() * 2 - 1);

        particle.currentTime = 0;
        particle.totalTime = lifespan > 0 ? lifespan : 0;

        if (lifespan <= 0) return;

        const emitterX: number = this.emitterX;
        const emitterY: number = this.emitterY;

        particle.x = emitterX + this._emitterXSpread * (Math.random() * 2 - 1);
        particle.y = emitterY + this._emitterYSpread * (Math.random() * 2 - 1);
        particle.startX = emitterX;
        particle.startY = emitterY;

        const angle: number = this._emitAngle + this._emitAngleSpread * (Math.random() * 2 - 1);
        const speed: number = this._speed + this._speedSpread * (Math.random() * 2 - 1);
        particle.velocityX = speed * Math.cos(angle);
        particle.velocityY = speed * Math.sin(angle);

        const startRadius: number = this._maxRadius + this._maxRadiusSpread * (Math.random() * 2 - 1);
        const endRadius: number = this._minRadius + this._minRadiusSpread * (Math.random() * 2 - 1);
        particle.emitRadius = startRadius;
        particle.emitRadiusDelta = (endRadius - startRadius) / lifespan;
        particle.emitRotation = this._emitAngle + this._emitAngleSpread * (Math.random() * 2 - 1);
        particle.emitRotationDelta = this._rotatePerSecond + this._rotatePerSecondSpread * (Math.random() * 2 - 1);
        particle.radialAcceleration =
            this._radialAcceleration + this._radialAccelerationSpread * (Math.random() * 2 - 1);
        particle.tangentialAcceleration =
            this._tangentialAcceleration + this._tangentialAccelerationSpread * (Math.random() * 2 - 1);

        let startSize: number = this._startSize + this._startSizeSpread * (Math.random() * 2 - 1);
        let endSize: number = this._endSize + this._endSizeSpread * (Math.random() * 2 - 1);
        if (startSize < 0.1) startSize = 0.1;
        if (endSize < 0.1) endSize = 0.1;
        particle.scale = startSize / particle.size;
        particle.scaleDelta = (endSize - startSize) / lifespan / particle.size;

        // colors

        const startColor: Color = particle.color;
        const colorDelta: Color = particle.colorDelta;

        startColor.red = this._startColor.red;
        startColor.green = this._startColor.green;
        startColor.blue = this._startColor.blue;
        startColor.alpha = this._startColor.alpha;

        if (this._startColorSpread.red !== 0) startColor.red += this._startColorSpread.red * (Math.random() * 2 - 1);
        if (this._startColorSpread.green !== 0)
            startColor.green += this._startColorSpread.green * (Math.random() * 2 - 1);
        if (this._startColorSpread.blue !== 0) startColor.blue += this._startColorSpread.blue * (Math.random() * 2 - 1);
        if (this._startColorSpread.alpha !== 0)
            startColor.alpha += this._startColorSpread.alpha * (Math.random() * 2 - 1);

        let endColorRed: number = this._endColor.red;
        let endColorGreen: number = this._endColor.green;
        let endColorBlue: number = this._endColor.blue;
        let endColorAlpha: number = this._endColor.alpha;

        if (this._endColorSpread.red !== 0) endColorRed += this._endColorSpread.red * (Math.random() * 2 - 1);
        if (this._endColorSpread.green !== 0) endColorGreen += this._endColorSpread.green * (Math.random() * 2 - 1);
        if (this._endColorSpread.blue !== 0) endColorBlue += this._endColorSpread.blue * (Math.random() * 2 - 1);
        if (this._endColorSpread.alpha !== 0) endColorAlpha += this._endColorSpread.alpha * (Math.random() * 2 - 1);

        colorDelta.red = (endColorRed - startColor.red) / lifespan;
        colorDelta.green = (endColorGreen - startColor.green) / lifespan;
        colorDelta.blue = (endColorBlue - startColor.blue) / lifespan;
        colorDelta.alpha = (endColorAlpha - startColor.alpha) / lifespan;

        // rotation

        const startRotation: number = this._startRotation + this._startRotationSpread * (Math.random() * 2 - 1);
        const endRotation: number = this._endRotation + this._endRotationSpread * (Math.random() * 2 - 1);

        particle.rotation = startRotation;
        particle.rotationDelta = (endRotation - startRotation) / lifespan;

        // this.addChild(particle.sprite);
    }

    protected override updateParticle(particle: P, passedTime: number): void {
        const restTime: number = particle.totalTime - particle.currentTime;
        passedTime = restTime > passedTime ? passedTime : restTime;
        particle.currentTime += passedTime;

        if (this._emitterType === ParticleSystem.emitterTypeRadial) {
            particle.emitRotation += particle.emitRotationDelta * passedTime;
            particle.emitRadius += particle.emitRadiusDelta * passedTime;
            particle.x = this.emitterX - Math.cos(particle.emitRotation) * particle.emitRadius;
            particle.y = this.emitterY - Math.sin(particle.emitRotation) * particle.emitRadius;
        } else {
            const distanceX: number = particle.x - particle.startX;
            const distanceY: number = particle.y - particle.startY;
            let distanceScalar: number = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            if (distanceScalar < 0.01) distanceScalar = 0.01;

            let radialX: number = distanceX / distanceScalar;
            let radialY: number = distanceY / distanceScalar;
            let tangentialX: number = radialX;
            let tangentialY: number = radialY;

            radialX *= particle.radialAcceleration;
            radialY *= particle.radialAcceleration;

            const newY: number = tangentialX;
            tangentialX = -tangentialY * particle.tangentialAcceleration;
            tangentialY = newY * particle.tangentialAcceleration;

            particle.velocityX += passedTime * (this._gravityX + radialX + tangentialX);
            particle.velocityY += passedTime * (this._gravityY + radialY + tangentialY);
            particle.x += particle.velocityX * passedTime;
            particle.y += particle.velocityY * passedTime;
        }

        particle.scale += particle.scaleDelta * passedTime;
        particle.rotation += particle.rotationDelta * passedTime;

        particle.color.red += particle.colorDelta.red * passedTime;
        particle.color.green += particle.colorDelta.green * passedTime;
        particle.color.blue += particle.colorDelta.blue * passedTime;
        particle.color.alpha += particle.colorDelta.alpha * passedTime;

        particle.tint = particle.color.toRgb();
        particle.alpha = particle.color.alpha;
    }

    private _updateEmissionRate(): void {
        if (!this.maxParticlesCount || !this._lifespan) {
            return;
        }
        this.emissionRate = (this.maxParticlesCount - 1) / this._lifespan;
    }

    private _updateBlendMode(): void {
        this.particles.forEach((particle) => {
            particle.blendMode = this._blendMode;
        });
    }
}
