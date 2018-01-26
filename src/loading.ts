import { Canvas } from "./canvas";
import { Sprite } from "./sprite";
import { Animation } from "./animation";
import { Camera } from "./camera";

export class Loading extends Sprite {
  public progress = 0;
  public animationIndex = "loading";
  public constructor(public total: number) {
    super();
  }
  public initAnimations() {
    this.animations['loading'] = new Animation([{
      script: (camera: Camera, canvas: Canvas) => {
        canvas.fullRect("#FFF");
        let w = canvas.width * .8 / this.total * this.progress;
        canvas.ctx.fillStyle = "#CCC";
        canvas.ctx.fillRect(canvas.width * .1, canvas.height / 2, canvas.width * .8, 6)
        canvas.ctx.fillStyle = "#333";
        canvas.ctx.fillRect(canvas.width * .1, canvas.height / 2, w, 6)
        canvas.ctx.font = "36pt Calibri";
        canvas.ctx.fillStyle = "#F00";
        let text = `${Math.round(this.progress / this.total * 100)}%`;
        let offset = canvas.ctx.measureText(text);
        canvas.ctx.fillText(text, (canvas.width - offset.width) / 2, canvas.height / 2 - 20);
      }
    }]);
  }

}