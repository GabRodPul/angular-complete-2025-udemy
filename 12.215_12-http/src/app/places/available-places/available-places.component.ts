import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);
  fetching = signal(true);
  error = signal("");
  private httpClient = inject(HttpClient);
  private destroy = inject(DestroyRef);

  ngOnInit() {
    const sub = this.httpClient
      .get<{ places: Place[] }>("http://localhost:3000/places")
      .pipe(
        map((res) => res.places),
        catchError((err) => throwError(() => new Error("Something went wrong fetching data!")))
      )
      .subscribe({
        next: (places) => {
          this.places.set(places);
        },
        error: (err: Error) => {
          this.error.set(err.message);
        },
        complete: () => {
          this.fetching.set(false);
        }
      });

    this.destroy.onDestroy(() => {
        sub.unsubscribe();
    })
  }

  onSelectPlace(place: Place) {
    this.httpClient.put("http://localhost:3000/user-places", {
      placeId: place.id
    }).subscribe({
      next: (res) => console.log(res)
    });
  }
}
