import { Level, levelHandler } from "../core/level";
import { Camera } from "../core/camera";
import { materials, ImageMaterial } from "../core/material";
import { Layer } from "../core/layer";
import { Background } from "../background";
import { People } from "../people";
import { Obstacle } from "../obstacle";
export class Level2 extends Level {
  public constructor() {
    super('關卡');
  }
  public initSprites(cameras: Camera[]) {
    let obstacle = new Obstacle(250, 150, 2, 1);
    let map = new Background("#000", 300, 300);
    let backLayer = new Layer([map]);
    this.layerHandler.addLayer(backLayer);
    let p1 = new People({ up: 'w', down: 's', left: 'a', right: 'd', rotate: 'z' }, materials['p1'] as ImageMaterial, 200, 400);
    let p2 = new People({ up: 'ArrowUp', down: 'ArrowDown', left: 'ArrowLeft', right: 'ArrowRight', rotate: ' ' }, materials['p2'] as ImageMaterial, 500, 200);
    cameras[0].point.follow(p1.point);
    cameras[1].point.follow(p2.point);
    map.limitInside(p1.point);
    map.limitInside(p2.point);
    let peopleLayer = new Layer([p1, p2, obstacle]);
    this.layerHandler.addLayer(peopleLayer);
  }

  public async startLevel(cameras: Camera[]) {

  }

  public destroyLevel() {

  }

  public initLevel() {

  }
}