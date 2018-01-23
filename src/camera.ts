import { BehaviorSubject } from "rxjs";
export class Camera {
  public constructor() {

  }
  public fps = new BehaviorSubject<number>(60);
}