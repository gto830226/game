import { Sprite } from "./core/sprite";
import { Animation } from "./core/animation";
import { Camera } from "./core/camera";
import { Canvas } from "./core/canvas";
import { ImageMaterial } from "./core/material";
import { controller } from "./core/controller";
import { BehaviorSubject } from "rxjs";
export interface ControllKeyMap {
  up: string,
  down: string,
  left: string,
  right: string,
  rotate: string
}
export class People extends Sprite {
  public direction = new BehaviorSubject<number>(2);
  public speed = 20;
  public moveUnit = 2;
  public constructor(
    keymap: ControllKeyMap,
    private material: ImageMaterial,
    x = 200,
    y = 200
  ) {
    super();
    this.point.x = x;
    this.point.y = y;
    this.initController(keymap);
  }

  public initController(keymap: ControllKeyMap) {
    controller.keyEvent(keymap.down, this.speed).subscribe(e => {
      if (e == 'keyup') {
        this.stand();
        return
      }
      this.animationIndex.next("walk");
      this.direction.next(2);
      this.move();
    })
    controller.keyEvent(keymap.up, this.speed).subscribe(e => {
      if (e == 'keyup') {
        this.stand();
        return
      }
      this.animationIndex.next("walk");
      this.direction.next(8);
      this.move();

    })
    controller.keyEvent(keymap.right, this.speed).subscribe(e => {
      if (e == 'keyup') {
        this.stand();
        return
      }
      this.animationIndex.next("walk");
      this.direction.next(6);
      this.move();
    })
    controller.keyEvent(keymap.left, this.speed).subscribe(e => {
      if (e == 'keyup') {
        this.stand();
        return
      }
      this.animationIndex.next("walk");
      this.direction.next(4);
      this.move();
    })
    controller.keyEvent(keymap.rotate).subscribe(e => {
      this.stand();
      this.animationIndex.next("rotate");
    })
  }

  private stand() {
    this.animationIndex.next('stand');
  }

  private move() {
    switch (this.direction.getValue()) {
      case 2:
        this.point.y += this.moveUnit;
        break;
      case 4:
        this.point.x -= this.moveUnit;
        break;
      case 6:
        this.point.x += this.moveUnit;
        break;
      case 8:
        this.point.y -= this.moveUnit;
        break;
    }
  }
  private get materialDirectionOffset() {
    switch (this.direction.getValue()) {
      case 2: return 0;
      case 4: return 48;
      case 6: return 96;
      case 8: return 144;
    }
    return 0
  }
  public prevDraw(camera: Camera, canvas: Canvas) {
    let offsetX = camera.point.x - camera.width / 2;
    let offsetY = camera.point.y - camera.height / 2;
    let matW = 32;
    let matH = 48;
    let tarW = matW * 1.25;
    let tarH = matH * 1.25;
    let x = this.point.x - tarW / 2 - offsetX;
    let y = this.point.y - tarH / 2 - offsetY;
    canvas.ctx.fillStyle = "#333";
    canvas.ctx.font = "font";
    canvas.ctx.fillText(`(${this.point.x},${this.point.y})`, x, y);
  }
  public initAnimations() {
    let matW = 32;
    let matH = 48;
    let tarW = matW * 1.25;
    let tarH = matH * 1.25;
    this.animations['stand'] = new Animation([{
      script: (camera: Camera, canvas: Canvas) => {
        let offsetX = camera.point.x - camera.width / 2;
        let offsetY = camera.point.y - camera.height / 2;
        let x = this.point.x - tarW / 2 - offsetX;
        let y = this.point.y - tarH / 2 - offsetY;
        canvas.ctx.drawImage(this.material.data, 0, this.materialDirectionOffset, matW, matH, x, y, tarW, tarH);
      },
    }], -1)
    this.animations['walk'] = new Animation([{
      script: (camera: Camera, canvas: Canvas) => {
        let offsetX = camera.point.x - camera.width / 2;
        let offsetY = camera.point.y - camera.height / 2;
        let x = this.point.x - tarW / 2 - offsetX;
        let y = this.point.y - tarH / 2 - offsetY;
        canvas.ctx.drawImage(this.material.data, 0, this.materialDirectionOffset, matW, matH, x, y, tarW, tarH);
      },
      stay: 300
    }, {
      script: (camera: Camera, canvas: Canvas) => {
        let offsetX = camera.point.x - camera.width / 2;
        let offsetY = camera.point.y - camera.height / 2;
        let x = this.point.x - tarW / 2 - offsetX;
        let y = this.point.y - tarH / 2 - offsetY;
        canvas.ctx.drawImage(this.material.data, matW, this.materialDirectionOffset, matW, matH, x, y, tarW, tarH);
      },
      stay: 300
    }, {
      script: (camera: Camera, canvas: Canvas) => {
        let offsetX = camera.point.x - camera.width / 2;
        let offsetY = camera.point.y - camera.height / 2;
        let x = this.point.x - tarW / 2 - offsetX;
        let y = this.point.y - tarH / 2 - offsetY;
        canvas.ctx.drawImage(this.material.data, matW * 2, this.materialDirectionOffset, matW, matH, x, y, tarW, tarH);
      },
      stay: 300
    }, {
      script: (camera: Camera, canvas: Canvas) => {
        let offsetX = camera.point.x - camera.width / 2;
        let offsetY = camera.point.y - camera.height / 2;
        let x = this.point.x - tarW / 2 - offsetX;
        let y = this.point.y - tarH / 2 - offsetY;
        canvas.ctx.drawImage(this.material.data, matW * 3, this.materialDirectionOffset, matW, matH, x, y, tarW, tarH);
      },
      stay: 300
    }], -1);

    this.animations['rotate'] = new Animation([{
      script: (camera: Camera, canvas: Canvas) => {
        let offsetX = camera.point.x - camera.width / 2;
        let offsetY = camera.point.y - camera.height / 2;
        let x = this.point.x - tarW / 2 - offsetX;
        let y = this.point.y - tarH / 2 - offsetY;
        canvas.ctx.drawImage(this.material.data, 0, 0, matW, matH, x, y, tarW, tarH);
      }
    }, {
      script: (camera: Camera, canvas: Canvas) => {
        let offsetX = camera.point.x - camera.width / 2;
        let offsetY = camera.point.y - camera.height / 2;
        let x = this.point.x - tarW / 2 - offsetX;
        let y = this.point.y - tarH / 2 - offsetY;
        canvas.ctx.drawImage(this.material.data, 0, matH, matW, matH, x, y, tarW, tarH);
      }
    }, {
      script: (camera: Camera, canvas: Canvas) => {
        let offsetX = camera.point.x - camera.width / 2;
        let offsetY = camera.point.y - camera.height / 2;
        let x = this.point.x - tarW / 2 - offsetX;
        let y = this.point.y - tarH / 2 - offsetY;
        canvas.ctx.drawImage(this.material.data, 0, matH * 3, matW, matH, x, y, tarW, tarH);
      }
    }, {
      script: (camera: Camera, canvas: Canvas) => {
        let offsetX = camera.point.x - camera.width / 2;
        let offsetY = camera.point.y - camera.height / 2;
        let x = this.point.x - tarW / 2 - offsetX;
        let y = this.point.y - tarH / 2 - offsetY;
        canvas.ctx.drawImage(this.material.data, 0, matH * 2, matW, matH, x, y, tarW, tarH);
      }
    }], 1);
  }
}

