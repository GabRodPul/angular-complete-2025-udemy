import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

type Role = "student"
          | "teacher"
          | "employee"
          | "founder"
          | "other"

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  form = new FormGroup({
    email:    new FormControl("", {
      validators: [
        Validators.required,
        Validators.email,
      ]
    }),
    passwords: new FormGroup({
      pwd: new FormControl("", {
        validators: [
          Validators.required,
          Validators.minLength(6),
        ],
      }),
      confirmPwd: new FormControl("", {
        validators: [
          Validators.required,
          Validators.minLength(6),
        ],
      })
    }),
    firstName:  new FormControl("", { validators: [ Validators.required ] }),
    lastName:   new FormControl("", { validators: [ Validators.required ] }),
    address: new FormGroup({
      street:     new FormControl("", { validators: [ Validators.required ] }),
      number:     new FormControl("", { validators: [ Validators.required ] }),
      postalCode: new FormControl("", { validators: [ Validators.required ] }),
      city:       new FormControl("", { validators: [ Validators.required ] }),
    }),
    role:       new FormControl<Role>("student", { validators: [ Validators.required ] }),
    agree:      new FormControl(false, { validators: [ 
      Validators.required,
      (ctrl) => ctrl.value // Agree = true
    ]}),
  });

  onSubmit() {
    console.log(this.form);
  }

  onReset() {
    this.form.reset();
  }
}
