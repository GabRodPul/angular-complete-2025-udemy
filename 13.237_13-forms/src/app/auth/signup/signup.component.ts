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
    password: new FormControl("", {
      validators: [
        Validators.required,
        Validators.minLength(6),
      ],
    }),
    rePassword: new FormControl("", {
      validators: [
        Validators.required,
        Validators.minLength(6),
      ],
    }),
    firstName:  new FormControl("", { validators: [ Validators.required ] }),
    lastName:   new FormControl("", { validators: [ Validators.required ] }),
    street:     new FormControl("", { validators: [ Validators.required ] }),
    postalCode: new FormControl<Role>("student", { validators: [ Validators.required ] }),
    city:     new FormControl("", { validators: [ Validators.required ] }),
    role:       new FormControl(false, { validators: [ Validators.required ] }),
  });

  onSubmit() {
    console.log(this.form);
  }

  onReset() {
    this.form.reset();
  }
}
