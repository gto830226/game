import { Sprite } from "./sprite";
import { Animation } from "./animation";
import { Camera } from "./camera";
import { Canvas } from "./canvas";
import { materials, ImageMaterial } from "material";
export class TestPeople extends Sprite {
  public constructor() {
    super()
  }
  public initAnimations() {
    let material = materials['test'] as ImageMaterial;
    let matW = 32;
    let matH = 48;
    let tarW = matW * 1.25;
    let tarH = matH * 1.25;
    this.animations['walk'] = new Animation([{
      script: (canvas: Canvas, camera: Camera) => {
        let x = this.point.x - tarW / 2;
        let y = this.point.y - tarH / 2
        canvas.ctx.drawImage(material.data, matW, matH, matW, matH, x, y, tarW, tarH);
      }
    }])
  }
}

let people = new TestPeople();

