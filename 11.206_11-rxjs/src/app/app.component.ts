import { Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  private destroy = inject(DestroyRef);
  count = signal(0);

  constructor() {
    effect(() => {
      console.log("CLICKS: " + this.count())
    });
  }

  ngOnInit(): void {
   const sub = interval(1000).pipe(
    map((n) => n * 2)
   ).subscribe({
    next: (n) => console.log(n)
   });

   this.destroy.onDestroy(() => {
    sub.unsubscribe();
   })
 }

 onClick() {
  this.count.update(c => c+1);
 }
}
