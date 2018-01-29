import { Level, levelHandler } from "../core/level";
import { Camera } from "../core/camera";
import { materials, ImageMaterial } from "../core/material";
import { Layer } from "../core/layer";
import { Background } from "../background";
import { People } from "../people";
export class Level2 extends Level {
  public constructor() {
    super('關卡');
  }
  public initSprites(cameras: Camera[]) {
    let backLayer = new Layer([new Background()]);
    this.layerHandler.addLayer(backLayer);
    let p1 = new People({ up: 'w', down: 's', left: 'a', right: 'd', rotate: 'z' }, materials['p1'] as ImageMaterial, 200, 400);
    let p2 = new People({ up: 'ArrowUp', down: 'ArrowDown', left: 'ArrowLeft', right: 'ArrowRight', rotate: ' ' }, materials['p2'] as ImageMaterial, 500, 200);
    cameras[0].point.follow(p1.point);
    // cameras[0].point.pointChange.subscribe(e => console.log('p1', e.x, e.y));
    cameras[1].point.follow(p2.point);
    // cameras[1].point.pointChange.subscribe(e => console.log('p2', e.x, e.y))
    let peopleLayer = new Layer([p1, p2]);
    this.layerHandler.addLayer(peopleLayer);
  }

  public async startLevel(cameras: Camera[]) {

  }

  public destroyLevel() {

  }

  public initLevel() {

  }
}