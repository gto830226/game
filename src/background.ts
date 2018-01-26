import { Sprite } from "./sprite";
import { Animation } from "./animation";
import { Camera } from "./camera";
import { Canvas } from "./canvas";

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