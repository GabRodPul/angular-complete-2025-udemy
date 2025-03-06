import { afterNextRender, Component, DestroyRef, inject, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private form = viewChild.required<NgForm>("form");
  private destroy = inject(DestroyRef);

  constructor() {
    const saveddForm = window.localStorage.getItem("saved-login-form");
    if (saveddForm) {
      const { email } = JSON.parse(saveddForm);
      setTimeout(() => {
        this.form().setValue({ email, password: "" });
      }, 1);
    }

    afterNextRender(() => {
      const sub = this.form().valueChanges?.pipe(debounceTime(500)).subscribe({
        next: (v) => {
          window.localStorage.setItem(
            "saved-login-form",
            JSON.stringify({ email: v.email })
          )
        }
      });

      this.destroy.onDestroy(() => { sub?.unsubscribe() });
    })
  }

  onSubmit(formData: NgForm) {
    if (formData.form.invalid) return;

    const { email, password } = formData.form.value;

    console.log(formData.form);
    console.log(email, password);

    formData.form.reset();
  }
}
