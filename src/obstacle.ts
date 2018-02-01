import { Canvas } from "./core/canvas";
import { Sprite } from "./core/sprite";
import { Animation } from "./core/animation";
import { Camera } from "./core/camera";
import { materials, ImageMaterial } from "./core/material";


export class Obstacle extends Sprite {
  public matX: number;
  public matY: number;
  public constructor(x: number, y: number, matX: number, matY: number) {
    super();
    this.point.x = x;
    this.point.y = y;
    this.matX = matX;
    this.matY = matY;
  }

  public initAnimations() {
    let image = materials['obstacle'] as ImageMaterial;
    let matW = image.splitWidth(8);
    let matH = image.splitHeight(8);
    let tarW = matW * 1.5;
    let tarH = matH * 1.5;
    this.animations['stand'] = new Animation([{
      script: (camera: Camera, canvas: Canvas) => {
        let x = this.point.x - camera.point.x + camera.width / 2 - tarW / 2
        let y = this.point.y - camera.point.y + camera.height / 2 - tarH / 2
        canvas.ctx.drawImage(
          image.data,
          matW * this.matX, matH * this.matY, matW, matH,
          x, y, tarW, tarH
        )
        // canvas.fullRect("#FFF");
        // let w = canvas.width * .8 / this.handler.total * this.handler.process.getValue();
        // canvas.ctx.fillStyle = "#CCC";
        // canvas.ctx.fillRect(canvas.width * .1, canvas.height / 2, canvas.width * .8, 6)
        // canvas.ctx.fillStyle = "#333";
        // canvas.ctx.fillRect(canvas.width * .1, canvas.height / 2, w, 6)
        // canvas.ctx.font = "36pt Calibri";
        // canvas.ctx.fillStyle = "#F00";
        // let text = `${Math.round(this.handler.process.getValue() / this.handler.total * 100)}%`;
        // let offset = canvas.ctx.measureText(text);
        // canvas.ctx.fillText(text, (canvas.width - offset.width) / 2, canvas.height / 2 - 20);
      }
    }], 1);
  }
  public initController() {

  }

}