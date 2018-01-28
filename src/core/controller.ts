import { Observable } from "rxjs";
export class Controller {
  public keydownEvent = Observable.fromEvent<KeyboardEvent>(document.body, 'keydown');
  public keyupEvent = Observable.fromEvent<KeyboardEvent>(document.body, 'keyup');
  public constructor() {
  }
}

export let controller = new Controller();