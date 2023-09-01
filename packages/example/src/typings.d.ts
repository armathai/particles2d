declare module '*.png' {
    const content: string;
    export default content;
}

interface Window {
    game: import('pixi.js').Application;
}
