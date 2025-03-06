import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, of } from 'rxjs';

const initVals = { email: "" }
const ls = window.localStorage.getItem("saved-login-form");
if (ls) {
  initVals.email = JSON.parse(ls).email;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule]
,  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    email:    new FormControl(initVals.email, {
      validators: [
        Validators.required,
        Validators.email,
      ]
    }),
    password: new FormControl("", {
      validators: [
        Validators.required,
        Validators.minLength(6),
        (ctrl: AbstractControl) => ctrl.value.includes("?")
          ? null
          : { noQuestionMark: true }
      ],
      asyncValidators: [
        (ctrl: AbstractControl) => ctrl.value !== "test@example.com"
          ? of(null)
          : of({ notUnique: true })
      ]
    }),
  });

  private destroy = inject(DestroyRef);

  ngOnInit(): void {
    const sub = this.form.valueChanges.pipe(debounceTime(500)).subscribe(v => {
      window.localStorage.setItem("saved-login-form", JSON.stringify({ email: this.form.controls.email.value }))
    });

    this.destroy.onDestroy(() => {
      sub.unsubscribe();
    })
  }

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