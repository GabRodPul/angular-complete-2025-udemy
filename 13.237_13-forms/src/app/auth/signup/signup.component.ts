import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

type Role = "student"
          | "teacher"
          | "employee"
          | "founder"
          | "other"

const equalValues = (ctrl1: string, ctrl2: string) => {
  return (ctrl: AbstractControl) => {
    const v1 = ctrl.get(ctrl1)?.value;
    const v2 = ctrl.get(ctrl2)?.value;
  
    return v1 === v2
         ? null
         : { valsNotEqual: true }
  }
}

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
    }, {
      validators: [ equalValues("pwd", "confirmPwd") ]
    }),
    firstName:  new FormControl("", { validators: [ Validators.required ] }),
    lastName:   new FormControl("", { validators: [ Validators.required ] }),
    address:    new FormGroup({
      street:     new FormControl("", { validators: [ Validators.required ] }),
      number:     new FormControl("", { validators: [ Validators.required ] }),
      postalCode: new FormControl("", { validators: [ Validators.required ] }),
      city:       new FormControl("", { validators: [ Validators.required ] }),
    }),
    role:       new FormControl<Role>("student", { validators: [ Validators.required ] }),
    source:     new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
    ]),
    agree:      new FormControl(false, { validators: [ 
      Validators.required,
      (ctrl) => ctrl.value // Agree = true
    ]}),
  });

  onSubmit() {
    if (this.form.invalid) {
      console.log("INVALID")
      return;
    }

    console.log(this.form);
  }

  onReset() {
    this.form.reset();
  }
}
