import { Directive, effect, inject, input } from '@angular/core';
import { Permission } from './auth.model';
import { AuthService } from './auth.service';

@Directive({
  selector: '[appAuth]',
  standalone: true
})
export class AuthDirective {
  permission    = input.required<Permission>({ alias: "appAuth" });
  private auth  = inject(AuthService);

  constructor() {
    effect(() => {
      if (this.auth.activePermission() === this.permission()) {
        console.log("SHOW");
      } else {
        console.log("DON'T SHOW");
      }
    })
  }

}
