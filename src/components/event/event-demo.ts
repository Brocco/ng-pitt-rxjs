import {Component} from 'angular2/core';
import {EventChild} from './event-child';

@Component({
  selector: 'event-demo',
  template: `
		<h3>Event Demo</h3>
    <event-child (customEvent)="customEventHandler($event)"></event-child>
	`,
  directives: [EventChild]
})
export class EventDemo {
  constructor() {}

  customEventHandler (event) {
    console.log('customEventHandler', event);
  }
}
