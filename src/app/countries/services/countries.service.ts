import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';

@Injectable({ providedIn: 'root' })
export class CountryService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: {
      term: '',
      countries: [],
    },
    byCountry: {
      term: '',
      countries: [],
    },
    byRegion: {
      region: '',
      countries: [],
    },
  };

  constructor(private http: HttpClient) {}

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url).pipe(catchError(() => of([])));
  }

  searchCountryByAlphaCode(code: string): Observable<Country | null> {
    return this.http.get<Country[]>(`${this.apiUrl}/alpha/${code}`).pipe(
      map((countries) => (countries.length > 0 ? countries[0] : null)),
      catchError(() => of(null))
    );
  }

  searchCapital(searchTerm: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${searchTerm}`;
    return this.getCountriesRequest(url);
  }

  searchCounty(searchTerm: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${searchTerm}`;
    return this.getCountriesRequest(url);
  }

  searchRegion(searchTerm: string): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${searchTerm}`;
    return this.getCountriesRequest(url);
  }
}
