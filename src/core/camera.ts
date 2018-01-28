import { BehaviorSubject, Subscription } from "rxjs";
import { LayerHandler } from "./layer";
import { Canvas } from "./canvas";
import { Point } from "./point";
export class Camera {
  public handler: LayerHandler;
  public canvas: Canvas;
  private timerId: number;
  private fpsSubscription: Subscription
  public fps = new BehaviorSubject<number>(60);
  public point: Point;
  public constructor(x = 0, y = 0) {
    this.point = new Point(x, y);
  }
  public get width() {
    if (!this.canvas) return;
    return this.canvas.width;
  }
  public get height() {
    if (!this.canvas) return;
    return this.canvas.height;
  }

  public get isRunning() {
    return this.timerId != null || this.fpsSubscription != null;
  }
  public start() {
    if (this.isRunning) throw "Error: canvas is running.";
    if (!this.canvas) throw "Error: camera is undefined.";
    if (!this.handler) throw "Error: handler is undefined.";
    this.fpsSubscription = this.fps.
      distinctUntilChanged()
      .subscribe(fps => {
        console.log("FPS:", fps);
        this.clearTimer();
        this.timerId = setInterval(() => {
          this.handler.draw(this);
        }, 1000 / fps);
      })
  }
  private clearTimer() {
    if (!this.timerId) return;
    clearInterval(this.timerId);
    this.timerId = null;
  }
  private unsubscribeFPS() {
    if (!this.fpsSubscription) return;
    this.fpsSubscription.unsubscribe();
    this.fpsSubscription = null;
  }
  public stop() {
    this.clearTimer();
    this.unsubscribeFPS()
  }
}