/** @format */

export class MagicParticle {
    private x!: number;
    private y!: number;
    private size: number = 2;
    private angle: number = 0;
    private radius!: number;
    public opacity: number = 1;
    private baseColor!: string;
    private followCursor: boolean = true;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.radius = random(20, 25);
        this.angle = random(0, Math.PI * 2);
        this.baseColor = randomColor([
            '#e84e66',
            '#67c69e',
            '#edf1f4',
            '#80acc9',
            '#73a8b0',
            '#fe817f',
            '#68d2a4',
            '#1d203f',
            '#c9a30d',
        ]);
    }

    update(cursorX: number, cursorY: number) {
        if (this.followCursor) {
            this.x += Math.cos(this.angle) * 0.5;
            this.y += Math.sin(this.angle) * 0.5;
        } else {
            this.angle += 0.05;
            this.x = cursorX + Math.cos(this.angle) * this.radius;
            this.y = cursorY + Math.sin(this.angle) * this.radius;
        }

        // this.opacity -= 0.01;
        // if (this.opacity <= 0) {
        //     this.opacity = 0;
        // }
    }

    draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = this.baseColor;
        context.globalAlpha = this.opacity;
        context.fill();
        context.closePath();
    }

    stopFollowingCursor() {
        this.followCursor = false;
    }
}

function random(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

function randomColor<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}
