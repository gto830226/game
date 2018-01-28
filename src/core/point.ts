import { Subject } from "rxjs";

export class Point {
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
      this.x = point.x;
      this.y = point.y;
    })
    target.pointChange.next(target);
  }

}