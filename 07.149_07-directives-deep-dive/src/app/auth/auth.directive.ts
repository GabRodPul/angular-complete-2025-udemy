import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Permission } from './auth.model';
import { AuthService } from './auth.service';

@Directive({
  selector: '[appAuth]',
  standalone: true
})
export class AuthDirective {
  permission        = input.required<Permission>({ alias: "appAuth" });
  private auth      = inject(AuthService);
  private template  = inject(TemplateRef);
  private viewCont  = inject(ViewContainerRef);

  constructor() {
    effect(() => {
      if (this.auth.activePermission() === this.permission()) {
        this.viewCont.createEmbeddedView(this.template);
      } else {
        this.viewCont.clear();
      }
    })
  }

}
