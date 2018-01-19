export type MaterialTypes = "image" | "audio" | "video";
export class MaterialHandler {
  public addMaterials(items: { name: string, src: string, type: MaterialTypes }[]) {
    items.forEach(item => {
      this.addMaterial(item.name, item.type, item.src)
    });
  }

  public addMaterial(
    name: string,
    type: MaterialTypes,
    src: string
  ) {
    if (!name) return false;
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
        return false;
    }

    this.materials[name] = material;
  }

  public materials: {
    [name: string]: Material
  } = {};

  public constructor() {
    // this.materials["jay"] = new ImageMaterial("");
    // this.materials["jay"].loadMaterial();
  }

  public async load() {
    let tasks = Object
      .keys(this.materials)
      .map(async (name) => {
        let material = this.materials[name];
        return material.loadMaterial()
      });
    return Promise.all(tasks);
  }
}

export class Material {
  public data: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap;
  public constructor(public src: string) { }
  public async loadMaterial(): Promise<HTMLImageElement> {
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
      this.data.onerror = () => {
        reject(null);
      }
    })
    this.data.src = this.src;
    return task;
  }
}