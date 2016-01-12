import {Component, Output, EventEmitter} from 'angular2/core';

@Component({
  selector: 'event-child',
  template: `
		<h3>I emit events</h3>
	`
})
export class EventChild {
  constructor() {
    setInterval(() => {
      let output = new Date();
      this.customEvent.emit(output);
    }, 1000);
  }

  @Output() customEvent = new  EventEmitter();
}