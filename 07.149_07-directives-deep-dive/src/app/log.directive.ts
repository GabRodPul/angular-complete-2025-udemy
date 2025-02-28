import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appLog]',
  standalone: true
})
export class LogDirective {
  private el = inject(ElementRef);

  @HostListener("click") onLog() {
    console.log("CLICKED");
    console.log(this.el.nativeElement);
  }
}
