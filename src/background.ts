import { Sprite } from "./core/sprite";
import { Animation } from "./core/animation";
import { Camera } from "./core/camera";
import { Canvas } from "./core/canvas";
import { materials } from "./core/material";
import { Point } from "./core/point";
import { clamp } from "lodash";

export class Background extends Sprite {
  private mapData: number[][] = [];
  private srcW = 31.25;
  private srcH = 29;
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
  public get width() {
    return this.countX * this.srcW;
  }
  public get height() {
    return this.countY * this.srcH;
  }
  public limitInside(point: Point) {
    let width = this.width;
    let height = this.height;
    point.pointChange.subscribe(() => {
      if (point.x < 0 || point.x > this.width) point.x = clamp(point.x, 0, this.width);
      if (point.y < 0 || point.y > this.height) point.y = clamp(point.y, 0, this.height);
    })
  }
  public initAnimations() {
    let source = materials['map'].data as HTMLImageElement;
    this.animations['map'] = new Animation([{
      script: (camera: Camera, canvas: Canvas) => {
        canvas.fullRect(this.color);
        let offsetX = camera.point.x - camera.width / 2;
        let offsetY = camera.point.y - camera.height / 2;
        for (let j = 0; j < this.countY; j++) {
          for (let i = 0; i < this.countX; i++) {
            let x = i * this.srcW;
            let y = j * this.srcH;
            if (camera.isInside(x, y)) canvas.ctx.drawImage(source, 0, 0, this.srcW, this.srcH, x - offsetX, y - offsetY, this.srcW, this.srcH);
          }
        }
      }
    }])
  }
  public initController() {

  }
}