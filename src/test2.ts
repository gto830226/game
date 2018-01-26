import { Sprite } from "./sprite";
import { Animation } from "./animation";
import { Camera } from "./camera";
import { Canvas } from "./canvas";
import { materials, ImageMaterial } from "./material";
import { controller } from "./controller";
export class TestPeople2 extends Sprite {
  public direction = 2;
  public constructor() {
    super();
    this.point.x = 300;
    this.point.y = 200;
    controller.keydownEvent.subscribe(e => {
      switch (e.key) {
        case 's':
          this.animationIndex = "walk";
          this.direction = 2;
          this.point.y += 5;
          break;
        case 'w':
          this.animationIndex = "walk";
          this.direction = 8;
          this.point.y -= 5;
          break;
        case 'd':
          this.animationIndex = "walk";
          this.direction = 6;
          this.point.x += 5;
          break;
        case 'a':
          this.animationIndex = "walk";
          this.direction = 4;
          this.point.x -= 5;
          break;
        case 'z':
          this.animationIndex = "rotate";
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
    let material = materials['test2'] as ImageMaterial;
    let matW = 32;
    let matH = 48;
    let tarW = matW * 1.25;
    let tarH = matH * 1.25;

    this.animations['walk'] = new Animation([{
      script: (camera: Camera, canvas: Canvas) => {
        let x = this.point.x - tarW / 2;
        let y = this.point.y - tarH / 2;
        canvas.ctx.drawImage(material.data, 0, this.materialDirectionOffset, matW, matH, x, y, tarW, tarH);
      },
      stay: 300
    }, {
      script: (camera: Camera, canvas: Canvas) => {
        let x = this.point.x - tarW / 2;
        let y = this.point.y - tarH / 2;
        canvas.ctx.drawImage(material.data, matW, this.materialDirectionOffset, matW, matH, x, y, tarW, tarH);
      },
      stay: 300
    }, {
      script: (camera: Camera, canvas: Canvas) => {
        let x = this.point.x - tarW / 2;
        let y = this.point.y - tarH / 2;
        canvas.ctx.drawImage(material.data, matW * 2, this.materialDirectionOffset, matW, matH, x, y, tarW, tarH);
      },
      stay: 300
    }, {
      script: (camera: Camera, canvas: Canvas) => {
        let x = this.point.x - tarW / 2;
        let y = this.point.y - tarH / 2;
        canvas.ctx.drawImage(material.data, matW * 3, this.materialDirectionOffset, matW, matH, x, y, tarW, tarH);
      },
      stay: 300
    }], -1);

    this.animations['rotate'] = new Animation([{
      script: (camera: Camera, canvas: Canvas) => {
        let x = this.point.x - tarW / 2;
        let y = this.point.y - tarH / 2;
        canvas.ctx.drawImage(material.data, 0, 0, matW, matH, x, y, tarW, tarH);
      }
    }, {
      script: (camera: Camera, canvas: Canvas) => {
        let x = this.point.x - tarW / 2;
        let y = this.point.y - tarH / 2;
        canvas.ctx.drawImage(material.data, 0, matH, matW, matH, x, y, tarW, tarH);
      }
    }, {
      script: (camera: Camera, canvas: Canvas) => {
        let x = this.point.x - tarW / 2;
        let y = this.point.y - tarH / 2;
        canvas.ctx.drawImage(material.data, 0, matH * 3, matW, matH, x, y, tarW, tarH);
      }
    }, {
      script: (camera: Camera, canvas: Canvas) => {
        let x = this.point.x - tarW / 2;
        let y = this.point.y - tarH / 2;
        canvas.ctx.drawImage(material.data, 0, matH * 2, matW, matH, x, y, tarW, tarH);
      }
    }], 3);
  }
}

