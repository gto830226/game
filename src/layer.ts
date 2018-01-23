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
  public constructor() { }
  public layers: Layer[] = [];
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
  public layer(name: string) {
    if (!name) return;
    return this.layers.find(layer => layer.name == name);
  }
  public draw(canvas: Canvas, camera: Camera) {
    let timerId: number;
    camera.fps.distinctUntilChanged().subscribe((fps) => {
      if (timerId != null) {
        clearInterval(timerId);
        timerId = null;
      };
      if (fps <= 0) return;
      console.log("FPS:", fps);
      timerId = setInterval(() => {
        for (let layer of this.layers) {
          layer.draw(canvas, camera);
        }
      }, 1000 / fps)
    });
  }
}

export class Layer {
  public constructor(public name: string) { }
  public handler: LayerHandler;
  public disabled = false;
  public sprites: Sprite[] = [];
  public rise() {
    if (!this.handler) return;
    this.handler.moveLayer(this, 1);
  }
  public decline() {
    if (!this.handler) return;
    this.handler.moveLayer(this, -1);
  }
  public draw(canvas: Canvas, camera: Camera) {
    if (this.disabled) return;
    for (let sprite of this.sprites) {
      sprite.draw(canvas, camera);
    }
  }
}

