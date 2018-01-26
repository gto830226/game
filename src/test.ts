import { Sprite } from "./sprite";
import { Animation } from "./animation";
import { Camera } from "./camera";
import { Canvas } from "./canvas";
import { materials, ImageMaterial } from "./material";
import { controller } from "./controller";
export class TestPeople extends Sprite {
  public direction = 2;
  public constructor() {
    super();
    this.point.x = 200;
    this.point.y = 200;
    controller.keydownEvent.subscribe(e => {
      switch (e.key) {
        case 'ArrowDown':
          this.direction = 2;
          this.point.y += 5;
          break;
        case 'ArrowUp':
          this.direction = 8;
          this.point.y -= 5;
          break;
        case 'ArrowRight':
          this.direction = 6;
          this.point.x += 5;
          break;
        case 'ArrowLeft':
          this.direction = 4;
          this.point.x -= 5;
          break;
      }
    })
  }
  private get materialDirectionOffset() {
    switch (this.direction) {
      case 2: return 0;
      case 4: return 48;
      case 6: return 96;
      case 8: return 144;
    }
    return 0
  }
  public initAnimations() {
    let material = materials['test'] as ImageMaterial;
    let matW = 32;
    let matH = 48;
    let tarW = matW * 1.25;
    let tarH = matH * 1.25;

    this.animations['walk'] = new Animation([{
      script: (camera: Camera, canvas: Canvas) => {
        let x = this.point.x - tarW / 2;
        let y = this.point.y - tarH / 2
        canvas.ctx.drawImage(material.data, 0, this.materialDirectionOffset, matW, matH, x, y, tarW, tarH);
      },
      stay: 50
    }, {
      script: (camera: Camera, canvas: Canvas) => {
        let x = this.point.x - tarW / 2;
        let y = this.point.y - tarH / 2
        canvas.ctx.drawImage(material.data, matW, this.materialDirectionOffset, matW, matH, x, y, tarW, tarH);
      },
      stay: 50
    }, {
      script: (camera: Camera, canvas: Canvas) => {
        let x = this.point.x - tarW / 2;
        let y = this.point.y - tarH / 2
        canvas.ctx.drawImage(material.data, matW * 2, this.materialDirectionOffset, matW, matH, x, y, tarW, tarH);
      },
      stay: 50
    }, {
      script: (camera: Camera, canvas: Canvas) => {
        let x = this.point.x - tarW / 2;
        let y = this.point.y - tarH / 2
        canvas.ctx.drawImage(material.data, matW * 3, this.materialDirectionOffset, matW, matH, x, y, tarW, tarH);
      },
      stay: 50
    }], -1);
  }
}

let people = new TestPeople();

