import { Component, DestroyRef, inject, signal } from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { Place } from '../place.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent {
  fetching = signal(true);
  error = signal("");
  private placesSrv = inject(PlacesService);
  private destroy = inject(DestroyRef);
  places = this.placesSrv.loadedUserPlaces;

  ngOnInit() {
    const sub = this.placesSrv
      .loadUserPlaces()
      .subscribe({
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
    const sub = this.placesSrv
      .removeUserPlace(place.id)
      .subscribe({
        next: (res) => console.log(res)
    });

    this.destroy.onDestroy(() => {
      sub.unsubscribe();
    })
  }
}
