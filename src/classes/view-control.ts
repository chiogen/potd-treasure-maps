import { Application, Point } from 'pixi.js';

export class ViewControl {

    inputElement: HTMLCanvasElement;
    app: Application;

    private pointerId = -1;

    private lastCursorPosition = new Point();
    private currentCursorPosition = new Point();

    constructor(app: Application) {
        this.app = app;
        this.inputElement = app.view as HTMLCanvasElement;

    }

    attach() {
        this.inputElement.addEventListener('pointerdown', this.onPointerDown);
        this.inputElement.addEventListener('wheel', this.onWheel)
        return this;
    }

    private readonly onPointerDown = (e: PointerEvent) => {
        if (this.pointerId !== -1)
            return;

        e.preventDefault();
        e.stopPropagation();

        this.pointerId = e.pointerId;

        this.lastCursorPosition.set(e.x, e.y);
        this.currentCursorPosition.set(e.x, e.y);

        this.inputElement.addEventListener('pointermove', this.onPointerMove);
        this.inputElement.addEventListener('pointerup', this.onPointerUp);
        this.app.ticker.add(this.update, this);

    };
    private readonly onPointerMove = (e: PointerEvent) => {
        if (e.pointerId !== this.pointerId)
            return;

        e.preventDefault();
        e.stopPropagation();

        this.currentCursorPosition.set(e.x, e.y);

    };
    private readonly onPointerUp = (e: PointerEvent) => {

        if (e.pointerId !== this.pointerId)
            return;

        e.preventDefault();
        e.stopPropagation();

        this.pointerId = -1;

        this.inputElement.removeEventListener('pointermove', this.onPointerMove);
        this.inputElement.removeEventListener('pointerup', this.onPointerUp);
        this.app.ticker.remove(this.update, this);
    };

    private readonly onWheel = (e: WheelEvent) => {
        const direction = -Math.sign(e.deltaY);

        this.app.stage.scale.x += direction * 0.1;
        this.app.stage.scale.y += direction * 0.1;

    };

    private update() {
        const deltaX = this.currentCursorPosition.x - this.lastCursorPosition.x;
        const deltaY = this.currentCursorPosition.y - this.lastCursorPosition.y;

        this.app.stage.position.x += deltaX;
        this.app.stage.position.y += deltaY;

        this.lastCursorPosition.copyFrom(this.currentCursorPosition);
    }

}