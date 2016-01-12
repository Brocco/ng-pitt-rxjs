import {Component} from 'angular2/core';
import {RouteConfig, RouterOutlet, ROUTER_DIRECTIVES} from 'angular2/router';
import {FormDemo} from '../form/form-demo';
import {EventDemo} from '../event/event-demo';
import {HttpDemo} from '../http/http-demo';

@Component({
    selector: 'app',
    template: `
    <div class="container">
      <div class="row text-center">
		    <h1>RxJS + Angular 2</h1>
      </div>
      <div class="row">
        <a [routerLink]="['./HttpDemo']" class="btn btn-primary">Http</a>
        <a [routerLink]="['./FormDemo']" class="btn btn-primary">Form</a>
        <a [routerLink]="['./EventDemo']" class="btn btn-primary">Event</a>
      </div>
		  <router-outlet></router-outlet>
    </div>
	`,
	directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  { path: '/form-demo', as: 'FormDemo', component: FormDemo },
  { path: '/event-demo', as: 'EventDemo', component: EventDemo },
  { path: '/http-demo', as: 'HttpDemo', component: HttpDemo }
])
export class App {
	constructor() {}
}

