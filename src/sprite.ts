import { Animation } from "./animation";
import { Canvas } from "./canvas";
import { Camera } from "./camera";
import { Point } from "./point";

export class Sprite {
  public point = new Point();
  public animations: {
    [name: string]: Animation
  } = {};
  // region animationIndex
  private _animationIndex = "";
  public get animationIndex(): string {
    return this._animationIndex;
  }
  public set animationIndex(index: string) {
    if (!this.animations[index]) return;
    if (index == this._animationIndex) return;
    this.stopAnimation();
    this._animationIndex = index;
    this.startAnimation();
  }
  // endregion

  public constructor() {
    this.initAnimations()
    this.initAnimationName();
  }
  private initAnimationName() {
    let name = Object.keys(this.animations)[0];
    if (name) this.animationIndex = name;
  }

  public draw(camera: Camera) {
    let animation = this.animations[this.animationIndex];
    if (!animation) return;
    animation.draw(camera);
  }

  public get animation(): Animation {
    return this.animations[this.animationIndex];
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

  public initAnimations() {
    throw "未實作 Sprite initAnimations";
  }
}

