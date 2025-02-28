import { DestroyRef, inject, Injectable, signal } from '@angular/core';

import { Place } from './place.model';
import { catchError, map, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private userPlaces = signal<Place[]>([]);
  private httpClient = inject(HttpClient);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchPlaces("http://localhost:3000/places", "Something went wrong fetching data!");
  }

  loadUserPlaces() {
    return this.fetchPlaces("http://localhost:3000/user-places", "Something went wrong fetching data!")
      .pipe(tap({
        next: (p) => this.userPlaces.set(p)
      }));
  }

  addPlaceToUserPlaces(place: Place) {
    this.userPlaces.update(prev => [...prev, place])
    return this.httpClient.put("http://localhost:3000/user-places", { 
      placeId: place.id
    })
  }

  removeUserPlace(placeId: string) {
    this.userPlaces.update(prev => prev.filter((p) => p.id != placeId))
    return this.httpClient
      .delete("http://localhost:3000/user-places/" + placeId)
  }

  private fetchPlaces(url: string, errMsg: string) {
    return this.httpClient
      .get<{ places: Place[] }>(url)
      .pipe(
        map((res) => res.places),
        catchError((err) => throwError(() => new Error(errMsg)))
      );
  }
}
