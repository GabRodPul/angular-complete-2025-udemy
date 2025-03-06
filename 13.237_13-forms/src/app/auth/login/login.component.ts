import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule]
,  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
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
      ]
    }),
  });

  invalidField(key: "email" | "password") {
    return this.form.controls[key].touched
        && this.form.controls[key].dirty
        && this.form.controls[key].invalid
  }

  onSubmit() {
    console.log(this.form);
    const { email, password } = this.form.value;
    console.log(email, password);
  }
}