import {Component} from 'angular2/core';
import {FORM_DIRECTIVES, FormBuilder} from 'angular2/common';

@Component({
  selector: 'form-demo',
  template: `
		<h3>Form Demo</h3>
    <form [ngFormModel]="testForm">
      <div class="row">
        <input type="text" ngControl="password" />
      </div>
      <div class="row">
        <span>{{passwordStrength}}</span>
      </div>
    </form>
	`
})
export class FormDemo {
  constructor(formBuilder: FormBuilder) {
    this.testForm = formBuilder.group({password: ''});

    this.testForm.controls.password.valueChanges
      .subscribe((newPw) => {

      if (!newPw) {
        this.passwordStrength = 'required';
      } else if (newPw.length <= 2) {
        this.passwordStrength = 'weak';
      } else if (newPw.length <= 4) {
        this.passwordStrength = 'moderate';
      } else if (newPw.length <= 6) {
        this.passwordStrength = 'strong';
      } else if (newPw.length <= 8) {
        this.passwordStrength = 'very strong';
      }
    });
  }

  public testForm: any;
  public passwordStrength: string;
}

