import { Animation } from "./animation";
import { Canvas } from "./canvas";
import { Camera } from "./camera";
import { Point } from "./point";


export class Sprite {
  public point = new Point();
  public animations: {
    [name: string]: Animation
  } = {};
  private animationName = "";
  public constructor() {
    this.initAnimations()
  }
  public draw(canvas: Canvas, camera: Camera) {
    let animation = this.animations[this.animationName];
    if (!animation) return;
    animation.draw(canvas, camera);
  }
  public initAnimations() {
    throw "未實作 Sprite initAnimations";
  }
}

