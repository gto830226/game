import { BehaviorSubject } from "rxjs";
export type MaterialTypes = "image" | "audio" | "video";
export class MaterialHandler {
  public addMaterials(items: { name: string, src: string, type: MaterialTypes }[]) {
    items.forEach(item => {
      this.addMaterial(item.name, item.type, item.src)
    });
  }
  public total = 0;
  public process = new BehaviorSubject<number>(0);

  public addMaterial(
    name: string,
    type: MaterialTypes,
    src: string
  ) {
    if (!name) return false;
    if (this.materials[name]) throw `Error: material name "${name}" 重複`;
    let material: Material;
    switch (type) {
      case "image":
        material = new ImageMaterial(src);
        break;
      case "audio":
        material = new AudioMaterial(src);
        break;
      case "video":
        material = new VideoMaterial(src);
        break;
      default:
        throw `Error: material type "${type}"`;
    }
    this.total++;
    this.materials[name] = material;
  }

  public materials: {
    [name: string]: Material
  } = {};

  public constructor() { }

  public async load() {
    let tasks = Object
      .keys(this.materials)
      .map(async (name) => {
        let material = this.materials[name];
        await material.loadMaterial().catch(e => {
          console.log("圖片載入:", e);
        });
        // await this.sleep(Math.random() * 5 * 1000);
        this.process.next(this.process.getValue() + 1);
        return
      });
    return Promise.all(tasks);
  }

  public async sleep(ms: number) {
    return new Promise((resolve) => setTimeout(() => resolve(), ms));
  }
}

export class Material {
  public data: HTMLImageElement | HTMLVideoElement | HTMLAudioElement;
  public constructor(public src: string) { }
  public async loadMaterial(): Promise<HTMLImageElement | HTMLAudioElement | HTMLVideoElement> {
    throw "你沒有實作 loadMaterial";
  }
}

export class ImageMaterial extends Material {
  public data = new Image();
  public constructor(src: string) {
    super(src);
  }
  public async loadMaterial() {
    let task = new Promise<HTMLImageElement>((resolve, reject) => {
      this.data.onload = () => {
        resolve(this.data);
      }
      this.data.onerror = (err) => {
        reject(err);
      }
    })
    this.data.src = this.src;
    return task;
  }
  public splitWidth(count: number) {
    return this.width / count;
  }
  public splitHeight(count: number) {
    return this.height / count;
  }
  public get width() {
    return this.data.width;
  }
  public get height() {
    return this.data.height;
  }
}

export class AudioMaterial extends Material {
  public data = new Audio();
  public constructor(src: string) {
    super(src);
  }
  public async loadMaterial() {
    let task = new Promise<HTMLAudioElement>((resolve, reject) => {
      this.data.onload = () => {
        resolve(this.data);
      }
      this.data.onerror = (err) => {
        reject(err);
      }
    })
    this.data.src = this.src;
    return task;
  }
}

export class VideoMaterial extends Material {
  public data = new HTMLVideoElement();
  public constructor(src: string) {
    super(src);
  }
  public async loadMaterial() {
    let task = new Promise<HTMLVideoElement>((resolve, reject) => {
      this.data.onload = () => {
        resolve(this.data);
      }
      this.data.onerror = (err) => {
        reject(err);
      }
    })
    this.data.src = this.src;
    return task;
  }
}

export let materialHandler = new MaterialHandler();
export let materials = materialHandler.materials;