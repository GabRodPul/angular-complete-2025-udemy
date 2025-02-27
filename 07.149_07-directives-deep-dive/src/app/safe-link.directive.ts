import { Directive, ElementRef, HostListener, inject, input } from '@angular/core';

@Directive({
  selector: 'a[appSafeLink]',
  standalone: true
})
export class SafeLinkDirective {
  paramFrom = input("myapp", { alias: "appSafeLink" });
  private hostRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

  constructor() {
    console.log("SafeLinkDirective is active!");
  }

  @HostListener("click", ["$event"]) onConfirm(event: MouseEvent) {
    if (window.confirm("Do you want to leave the app?")) {
      const t = this.hostRef.nativeElement;
      t.href  =`${t.href}/?from=${this.paramFrom()}`;
      return;
    }

    event.preventDefault();
  }
}
