import { Subject } from "rxjs";

export class Point {

  private prev = { x: 0, y: 0 };
  // region x
  private _x: number = 0;
  public get x() {
    return this._x;
  }
  public set x(x: number) {
    if (typeof x != "number") return;
    if (typeof this.option.maxX == "number") x = Math.max(x, this.option.maxX);
    if (typeof this.option.minX == "number") x = Math.min(x, this.option.minX);
    if (this._x === x) return;
    this.prev.x = this.x;
    this._x = x;
    this.pointChange.next(this);
  }
  // endregion

  // region y
  private _y: number = 0;
  public get y() {
    return this._y;
  }
  public set y(y: number) {
    if (typeof y != "number") return;
    if (typeof this.option.maxY == "number") y = Math.max(y, this.option.maxY);
    if (typeof this.option.minY == "number") y = Math.min(y, this.option.minY);
    if (this._y === y) return;
    this.prev.y = this.y;
    this._y = y;
    this.pointChange.next(this);
  }
  // endregion

  public pointChange = new Subject<Point>();
  public constructor(x = 0, y = 0, private option: {
    maxX?: number,
    minX?: number,
    maxY?: number,
    minY?: number
  } = {}) {
    this.x = x;
    this.y = y;
  }
  public follow(target: Point, offset?: Point) {
    target.pointChange.map(point => {
      let x = point.x;
      let y = point.y;
      if (offset) {
        x += offset.x;
        y += offset.y;
      }
      return { x, y };
    }).subscribe(point => {
      this.set(point.x, point.y);
    })
    target.pointChange.next(target);
  }

  public set(x: number, y: number) {
    let isChange = false;
    if (typeof x == "number") {
      if (typeof this.option.maxX == "number") x = Math.max(x, this.option.maxX);
      if (typeof this.option.minX == "number") x = Math.min(x, this.option.minX);
      if (this._x != x) {
        this.prev.x = this.x;
        this._x = x;
        isChange = true;
      };
    }
    if (typeof y == "number") {
      if (typeof this.option.maxY == "number") x = Math.max(x, this.option.maxY);
      if (typeof this.option.minY == "number") x = Math.min(x, this.option.minY);
      if (this._y != y) {
        this.prev.y = this.y;
        this._y = y;
        isChange = true;
      };
    }
    if (isChange) this.pointChange.next(this);
  }
  public back() {
    this.set(this.prev.x, this.prev.y);
  }
}