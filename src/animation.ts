import { Canvas } from "./canvas";
import { Camera } from "./camera";

export interface IFrameScript {
  stay?: number,
  script: (canvas: Canvas, camera: Camera) => void
}
export class Animation {
  private timerId: number;
  private frameIndex = 0;
  public mode: "once" | "repeat" = "once";
  public constructor(public frames: IFrameScript[]) {
    this.frames = this.frames
      .filter(s => typeof s.script == "function")
      .map(s => {
        if (!s.stay) s.stay = 333;
        return s;
      });
  }
  public start() {
    if (this.frames.length == 0) return;
    this.nextFrame()
  }
  public stop() {
    this.clearTimer();
  }
  public end() {
    this.clearTimer();
    this.frameIndex = 0;
  }
  private clearTimer() {
    if (this.timerId != null) {
      clearTimeout(this.timerId)
      this.timerId = null;
    }
  }
  private nextFrame() {
    if (this.mode == "once" && this.frameIndex + 1 >= this.frames.length) {
      this.end();
      return;
    }
    let frame = this.frames[this.frameIndex];
    this.timerId = setTimeout(() => {
      this.frameIndex = (this.frameIndex + 1) % this.frames.length;
      this.nextFrame();
    }, frame.stay)
  }
  public get draw(): (canvas: Canvas, camera: Camera) => void {
    let frame = this.frames[this.frameIndex];
    if (!frame) return (canvas: Canvas, camera: Camera) => { };
    return
  }
}
