import { Animation } from "./animation";
import { Canvas } from "./canvas";
import { Camera } from "./camera";
import { Point } from "./point";
import { BehaviorSubject } from "rxjs";
export class Sprite {
  public point: Point;
  public animations: {
    [name: string]: Animation
  } = {};
  public defaultAnimationIndex: string;
  public animationIndex = new BehaviorSubject<string>("");
  private lastAnimationIndex = new BehaviorSubject<string>("");
  public constructor(x = 0, y = 0) {
    this.point = new Point(x, y);
    this.initAnimations()
    this.initAnimationName();
    this.animationIndex.distinctUntilChanged().subscribe(index => {
      this.endLastAnimation();
      this.startAnimation();
      this.lastAnimationIndex.next(index);
    })
  }
  protected initAnimationName() {
    let name = Object.keys(this.animations)[0];
    if (!name) return;
    this.animationIndex.next(name);
    this.defaultAnimationIndex = name;
  }

  public draw(camera: Camera) {
    let animation = this.animations[this.animationIndex.getValue()];
    if (!animation) return;
    animation.draw(camera);
  }

  public get animation(): Animation {
    return this.animations[this.animationIndex.getValue()];
  }

  public get lastAnimation(): Animation {
    return this.animations[this.lastAnimationIndex.getValue()];
  }


  public startAnimation() {
    if (!this.animation) return;
    this.animation.start();
  }

  public stopAnimation() {
    if (!this.animation) return;
    this.animation.stop();
  }

  public endAnimation() {
    if (!this.animation) return;
    this.animation.end();
  }

  public endLastAnimation() {
    if (!this.lastAnimation) return;
    this.lastAnimation.end();
  }

  public initAnimations() {
    throw "未實作 Sprite initAnimations";
  }
}

