import { Canvas } from "./canvas";
import { Camera } from "./camera";
export interface IFrameScript {
  stay?: number,
  script: (camera: Camera, canvas: Canvas) => void
}
export class Animation {
  private timerId: number;
  private frameIndex = 0;
  private defaultRepeatCount: number;
  public constructor(public frames: IFrameScript[], public repeatCount = 1) {
    this.defaultRepeatCount = repeatCount;
    this.frames = this.frames
      .filter(s => typeof s.script == "function")
      .map(s => {
        if (!s.stay) s.stay = 200;
        return s;
      });
  }

  public start(repeatCount?: number) {
    if (this.frames.length == 0) return;
    if (this.timerId) this.clearTimer();
    if (typeof repeatCount == "number") this.repeatCount = repeatCount;
    this.nextFrame()
  }

  public stop() {
    this.clearTimer();
  }

  public end() {
    this.clearTimer();
    this.frameIndex = 0;
    this.repeatCount = this.defaultRepeatCount;
  }

  private clearTimer() {
    if (this.timerId != null) {
      clearTimeout(this.timerId)
      this.timerId = null;
    }
  }

  private nextFrame() {
    if (this.repeatCount > 0) {
      if (this.frameIndex + 1 > this.frames.length) this.repeatCount--;
      if (this.repeatCount == 0) {
        this.end();
        return;
      }
    }
    let frame = this.frames[this.frameIndex];
    this.timerId = setTimeout(() => {
      this.frameIndex = (this.frameIndex + 1) % this.frames.length;
      this.nextFrame();
    }, frame.stay)
  }

  public draw(camera: Camera) {
    let frame = this.frames[this.frameIndex];
    if (!frame) return (camera: Camera, canvas: Canvas) => { };
    frame.script(camera, camera.canvas);
  }
}
