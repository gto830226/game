import { Sprite } from "./core/sprite";
import { Animation } from "./core/animation";
import { Camera } from "./core/camera";
import { Canvas } from "./core/canvas";

export class Background extends Sprite {
  public constructor() {
    super();
  }
  public initAnimations() {
    this.animations['back1'] = new Animation([{
      script: (camera: Camera, canvas: Canvas) => {
        canvas.fullRect("#FFF");
      }
    }])
  }
}