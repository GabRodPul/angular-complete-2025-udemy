import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { PlacesService } from '../places.service';

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
  placesSrv = inject(PlacesService);
  private destroy = inject(DestroyRef);

  ngOnInit() {
    // const sub = 
    this.fetching.set(true);
    const sub = this.placesSrv
      .loadAvailablePlaces()
      .subscribe({
        next: (p) => {
          this.places.set(p);
        },
        error: (err: Error) => {
          this.error.set(err.message);
        },
        complete: () => {
          this.fetching.set(false);
        }
      })

    this.destroy.onDestroy(() => {
      sub.unsubscribe();
    })
  }

  onSelectPlace(place: Place) {
    const sub = this.placesSrv
      .addPlaceToUserPlaces(place)
      .subscribe({
        next: (res) => console.log(res)
    });

    this.destroy.onDestroy(() => {
      sub.unsubscribe();
    })
  }
}
