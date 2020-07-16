import { Injectable } from '@angular/core';
import { Observable, of, config } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ConfigurationCacheService } from './cache/configuration-cache.service';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  constructor(
    private http: HttpClient,
    private cache: ConfigurationCacheService
  ) {}

  getConfig(): Observable<any> {
    const cacheResponse = this.cache.getConfiguration();

    return cacheResponse
      ? of(cacheResponse)
      : this.fetchConfigFromApi().pipe(
          tap((val) => {
            this.cache.setConfiguration(val);
          })
        );
  }

  private fetchConfigFromApi(): Observable<any> {
    return this.http.get('http://localhost:3000/config');
  }
}
