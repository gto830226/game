import { Canvas } from "./core/canvas";
import { Sprite } from "./core/sprite";
import { Animation } from "./core/animation";
import { Camera } from "./core/camera";
import { MaterialHandler } from "./core/material";

export class Loading extends Sprite {
  public constructor(private handler: MaterialHandler) {
    super();
  }
  public initAnimations() {
    this.animations['loading'] = new Animation([{
      script: (camera: Camera, canvas: Canvas) => {
        canvas.fullRect("#FFF");
        let w = canvas.width * .8 / this.handler.total * this.handler.process.getValue();
        canvas.ctx.fillStyle = "#CCC";
        canvas.ctx.fillRect(canvas.width * .1, canvas.height / 2, canvas.width * .8, 6)
        canvas.ctx.fillStyle = "#333";
        canvas.ctx.fillRect(canvas.width * .1, canvas.height / 2, w, 6)
        canvas.ctx.font = "36pt Calibri";
        canvas.ctx.fillStyle = "#F00";
        let text = `${Math.round(this.handler.process.getValue() / this.handler.total * 100)}%`;
        let offset = canvas.ctx.measureText(text);
        canvas.ctx.fillText(text, (canvas.width - offset.width) / 2, canvas.height / 2 - 20);
      }
    }], 1);
  }
  public initController() {

  }

}