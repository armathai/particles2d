import { PixiParticleSystem } from '@armathai/pixi-particles';
import { Application, Texture } from 'pixi.js';
import Stats from 'stats.js';
import { configs } from './configs';

class Game extends Application<HTMLCanvasElement> {
    public constructor() {
        super({ resizeTo: window, backgroundColor: 0x000000, hello: true });
        this.ticker.maxFPS = 60;
    }
}

window.addEventListener('load', () => {
    const stats = new Stats();
    stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(stats.dom);

    const game = new Game();
    document.body.appendChild(game.view);

    const positions = [
        [0.25, 0.25],
        [0.75, 0.25],
        [0.25, 0.75],
        [0.75, 0.75],
    ];

    const systems = Object.keys(configs).map((key) => {
        const config = configs[key];
        const ps = new PixiParticleSystem({
            config: config.pex,
            parent: game.stage,
            texture: Texture.from(config.png),
        });
        const position = positions.pop();
        ps.emitterX = window.innerWidth * position[0];
        ps.emitterY = window.innerHeight * position[1];
        return ps;
    });

    setTimeout(() => {
        systems.forEach((system, i) => {
            system.event.once('start', () => console.log('start', i));
            system.event.once('stop', () => console.log('stop', i));
            system.event.once('clear', () => console.log('clear', i));
            system.event.once('complete', () => console.log('complete', i));
            system.start();
        });
        game.ticker.add(() => {
            stats.begin();
            systems.forEach((system) => {
                system.update(game.ticker.deltaMS * 0.001);
            });
            stats.end();
        });
        setTimeout(() => {
            systems.forEach((system) => {
                system.stop(false);
            });
            setTimeout(() => {
                systems.forEach((system) => {
                    system.start();
                });
            }, 3000);
        }, 2000);
    }, 200);
});
