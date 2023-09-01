export class Color {
    public constructor(
        public red: number = 0,
        public green: number = 0,
        public blue: number = 0,
        public alpha: number = 0,
    ) {}

    public static fromRgb(color: number): Color {
        const rgb: Color = new Color();
        rgb.fromRgb(color);
        return rgb;
    }

    public static fromArgb(color: number): Color {
        const argb: Color = new Color();
        argb.fromArgb(color);
        return argb;
    }

    public toRgb(): number {
        let r: number = this.red;
        if (r < 0) r = 0;
        else if (r > 1) r = 1;
        let g: number = this.green;
        if (g < 0) g = 0;
        else if (g > 1) g = 1;
        let b: number = this.blue;
        if (b < 0) b = 0;
        else if (b > 1) b = 1;

        return ((r * 255) << 16) | ((g * 255) << 8) | (b * 255);
    }

    public toArgb(): number {
        let a: number = this.alpha;
        if (a < 0) a = 0;
        else if (a > 1) a = 1;
        let r: number = this.red;
        if (r < 0) r = 0;
        else if (r > 1) r = 1;
        let g: number = this.green;
        if (g < 0) g = 0;
        else if (g > 1) g = 1;
        let b: number = this.blue;
        if (b < 0) b = 0;
        else if (b > 1) b = 1;

        return ((a * 255) << 24) | ((r * 255) << 16) | ((g * 255) << 8) | (b * 255);
    }

    public fromRgb(color: number): void {
        this.red = ((color >> 16) & 0xff) / 255;
        this.green = ((color >> 8) & 0xff) / 255;
        this.blue = (color & 0xff) / 255;
    }

    public fromArgb(color: number): void {
        this.red = ((color >> 16) & 0xff) / 255;
        this.green = ((color >> 8) & 0xff) / 255;
        this.blue = (color & 0xff) / 255;
        this.alpha = ((color >> 24) & 0xff) / 255;
    }

    public copyFrom(argb: Color): void {
        this.red = argb.red;
        this.green = argb.green;
        this.blue = argb.blue;
        this.alpha = argb.alpha;
    }
}
