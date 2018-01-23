export class Canvas {
  public ctx: CanvasRenderingContext2D;
  public constructor(public dom: HTMLCanvasElement, public width = 800, public height?: number) {
    this.resize();
    this.createCanvasContent();
  }
  private resize() {
    this.height = this.height || this.width * 9 / 16;
    this.dom.width = this.width;
    this.dom.height = this.height;
  }
  public get centerX() {
    return this.width / 2;
  }
  public get centerY() {
    return this.height / 2;
  }
  private createCanvasContent() {
    this.ctx = this.dom.getContext("2d");
  }
  public clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
  public fullRect(color = "#FFFFFF") {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.width, this.height)
  }
}