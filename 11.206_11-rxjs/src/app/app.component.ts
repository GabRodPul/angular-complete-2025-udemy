import { Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { interval, map, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  private destroy = inject(DestroyRef);
  count = signal(0);
  count$ = toObservable(this.count);
  interval$ = interval(1000);
  intervalSig = toSignal(this.interval$, { initialValue: 0, manualCleanup: false });
  customIntv$ = new Observable((sub) => {
    let execCount = 0;
    const intv = setInterval(() => {
      // sub.error();
      if (execCount > 3) {
        clearInterval(intv);
        sub.complete();
        return;
      }
      console.log("Emitting new value...");
      sub.next({ message: "New value" });
      execCount++;
    }, 2000);
  });

  constructor() {
    // effect(() => {
    //   console.log("CLICKS: " + this.count())
    // });
  }

  ngOnInit(): void {
    //  const sub = interval(1000).pipe(
    //   map((n) => n * 2)
    //  ).subscribe({
    //   next: (n) => console.log(n)
    //  });

    //  this.destroy.onDestroy(() => {
    //   sub.unsubscribe();
    //  })
    this.customIntv$.subscribe({
      next:     (n)   => console.log(n),
      complete: ()    => console.log("COMPLETED"),
      error:    (err) => console.log(err),
    })
    const sub = this.count$.subscribe({
      next: (n) => console.log("CLICKS: " + this.count())
    });

    this.destroy.onDestroy(() => {
      sub.unsubscribe();
    })
  }

  onClick() {
    this.count.update(c => c + 1);
  }
}
