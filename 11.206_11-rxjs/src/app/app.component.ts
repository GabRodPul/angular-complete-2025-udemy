import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  private destroy = inject(DestroyRef);

  ngOnInit(): void {
   const sub = interval(1000).subscribe({
    next: (n) => console.log(n)
   });

   this.destroy.onDestroy(() => {
    sub.unsubscribe();
   })
 }
}
