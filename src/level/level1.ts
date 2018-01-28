import { Level, levelHandler } from "../core/level";
import { Camera } from "../core/camera";
import { Loading } from "../loading";
import { materialHandler } from "../core/material";
import { Layer } from "../core/layer";
import { Level2 } from "./level2";
export class Level1 extends Level {
  public constructor() {
    super('載入畫面');
  }
  public initSprites(cameras: Camera[]) {
    let layer = new Layer([new Loading(materialHandler)]);
    this.layerHandler.addLayer(layer);
  }

  public async startLevel(cameras: Camera[]) {
    await materialHandler.load();
    levelHandler.nextLevel(Level2)
  }

  public destroyLevel() {

  }

  public initLevel() {

  }
}