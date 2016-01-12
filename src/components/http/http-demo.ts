import {Component} from 'angular2/core';
import {Http, Headers} from 'angular2/http';

@Component({
    selector: 'http-demo',
    template: `
		<h3>Http Demo</h3>
    <div class="row">
      <button class="btn btn-danger btn-xs" (click)="tester()">Click Here</button>
    </div>
    <div class="row">
      <pre>{{httpData|json}}</pre>
    </div>
	`
})
export class HttpDemo {
	constructor(private http: Http) {}

  tester(){
    this.httpData = undefined;
    this.http
      .get('http://localhost:4444/list')
      .map(res => res.json())
      .subscribe((data) => {
        this.httpData = data;
      });
  }

  httpData: any;
}

