import { Observable, Subject } from "rxjs";
export type KeyEventType = "keydown" | "keyup" | "keypress";
export class Controller {
  public keydownEvent = Observable.fromEvent<KeyboardEvent>(document.body, 'keydown').filter(e => !e.repeat).shareReplay(1);
  public keyupEvent = Observable.fromEvent<KeyboardEvent>(document.body, 'keyup').filter(e => !e.repeat).shareReplay(1);
  public constructor() {
  }
  public keyEvent(keyName: string, debounceTime = 55) {
    let timerId: number;
    let subject = new Subject<KeyEventType>();
    let keyup = this.keyupEvent.filter(e => e.key == keyName);
    let keydown = this.keydownEvent.filter(e => e.key == keyName);
    keydown.subscribe(e => {
      if (timerId) clearInterval(timerId);
      subject.next('keydown');
      timerId = setInterval(() => {
        subject.next('keypress');
      }, debounceTime)
    })
    keyup.subscribe(e => {
      if (timerId) clearInterval(timerId);
      subject.next('keyup');
    })
    return subject.shareReplay(1);
  }
}

export let controller = new Controller();
controller.keyEvent(' ');