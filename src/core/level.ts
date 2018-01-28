import { Camera } from "./camera";
import { LayerHandler } from "./layer";
import { BehaviorSubject } from "rxjs";
import { Sprite } from "./sprite";
export type LevelsType = { [levelName: string]: any };
export class LevelHandler {
  public cameras: Camera[] = [];
  public level: Level = null;
  public constructor() { }
  public endLevel() {
    if (!this.level) return;
    this.level._destroyLevel(this.cameras);
    this.level = null;
  }
  public nextLevel(LevelType: typeof Level) {
    if (!LevelType) return;
    this.endLevel();
    this.level = new LevelType();
    this.level._initLevel(this.cameras);
  }
}
// export interface ILevel {
//   initSprites: () => void,
//   destroyLevel: () => void,
// }
export class Level {
  public layerHandler = new LayerHandler([]);
  public constructor(
    private _name = "神秘關卡",
  ) { }
  public get name() {
    return this._name;
  }
  public initSprites(cameras: Camera[]) {
    throw "未實作 Level initSprites";
  }
  public destroyLevel() {
    throw "未實作 Level endLevel";
  }
  public startLevel(cameras: Camera[]) {
    throw "未實作 Level endLevel";
  }
  public initLevel(cameras: Camera[]) {
    throw "未實作 Level endLevel";
  }
  public _initLevel(cameras: Camera[]) {
    console.log(`Level: ${this.name}, 初始化`);
    this.initLevel(cameras);
    this.initSprites(cameras);
    for (let camera of cameras) {
      camera.handler = this.layerHandler;
      camera.start();
    }
    console.log(`Level: ${this.name}, 開始`);
    this.startLevel(cameras);
  }
  public _destroyLevel(cameras: Camera[]) {
    console.log(`Level: ${this.name}, 結束`);
    for (let camera of cameras) {
      camera.handler = null;
      camera.stop();
    }
    this.layerHandler.clearLayer();
    delete this.layerHandler;
    this.destroyLevel();
  }
}
export let levelHandler = new LevelHandler()