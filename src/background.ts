import { Sprite } from "./core/sprite";
import { Animation } from "./core/animation";
import { Camera } from "./core/camera";
import { Canvas } from "./core/canvas";
import { materials } from "./core/material";

export class Background extends Sprite {
  private mapData: number[][] = [];
  public constructor(public color = "#000", public countX: number = 30, public countY: number = 30) {
    super();
    this.initMap();
  }
  private initMap() {
    for (let j = 0; j < this.countY; j++) {
      let m: number[] = [];
      for (let i = 0; i < this.countX; i++) {
        m.push(Math.round(Math.random() * 10));
      }
      this.mapData.push(m);
    }
  }
  public initAnimations() {
    let source = materials['map'].data as HTMLImageElement;
    let srcW = 31.25;
    let srcH = 29;
    this.animations['map'] = new Animation([{
      script: (camera: Camera, canvas: Canvas) => {
        canvas.fullRect(this.color);
        let offsetX = camera.point.x - camera.width / 2;
        let offsetY = camera.point.y - camera.height / 2;
        for (let j = 0; j < this.countY; j++) {
          for (let i = 0; i < this.countX; i++) {
            canvas.ctx.drawImage(source, 0, 0, srcW, srcH, i * srcW - offsetX, j * srcH - offsetY, srcW, srcH);
          }
        }
      }
    }])
  }
  public initController() {

  }
}