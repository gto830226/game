import { clamp } from "lodash";
import { Sprite } from "./sprite";
import { Canvas } from "./canvas";
import { Camera } from "./camera";
export class LayerHandler {
  public addLayer(layer?: Layer) {
    if (!layer) return;
    layer.handler = this;
    this.layers.push(layer);
  }
  public constructor(public layers: Layer[] = []) { }
  public moveLayer(layer: Layer, offset: number) {
    let ori = this.layers.indexOf(layer);
    let tar = clamp(ori + offset, 0, this.layers.length - 1);
    this.layers.splice(tar, 0, this.layers.splice(ori, 1)[0]);
  }
  public deleteLayer(layer?: Layer) {
    if (!layer) return;
    layer.handler = null;
    let ori = this.layers.indexOf(layer);
    this.layers.splice(ori, 1);
  }
  public clearLayer() {
    for (let layer of this.layers) {
      layer.handler = null;
    }
    this.layers = [];
  }

  public draw(camera: Camera) {
    let timerId: number;
    for (let layer of this.layers) {
      layer.draw(camera);
    }
  }
}

export class Layer {
  public constructor(public sprites: Sprite[] = []) { }
  public handler: LayerHandler;
  public disabled = false;

  public rise() {
    if (!this.handler) return;
    this.handler.moveLayer(this, 1);
  }
  public decline() {
    if (!this.handler) return;
    this.handler.moveLayer(this, -1);
  }
  public draw(camera: Camera) {
    if (this.disabled) return;
    for (let sprite of this.sprites) {
      sprite.draw(camera);
    }
  }
  public addSprite(sprite: Sprite) {
    this.sprites.push(sprite);
  }
  public removeSprite(sprite: Sprite) {
    sprite.endAnimation();
    this.sprites = this.sprites.filter(spr => sprite != spr);
  }
}

