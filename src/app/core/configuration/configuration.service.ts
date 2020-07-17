import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ConfigurationApiService } from './api/configuration-api.service';
import { ConfigurationCacheService } from './cache/configuration-cache.service';
import { AppConfiguration } from './configuration';
import { ConfigurationInMemoryService } from './in-memory/configuration-in-memory.service';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  constructor(
    private api: ConfigurationApiService,
    private cache: ConfigurationCacheService,
    private inMemory: ConfigurationInMemoryService
  ) {}

  private isCacheEnabled = true;

  enableCache() {
    this.isCacheEnabled = true;
  }

  disableCache() {
    this.isCacheEnabled = false;
  }

  getConfig(): Observable<AppConfiguration> {
    const inMemoryConfiguration = this.getFromMemory();

    if (inMemoryConfiguration) {
      return of(inMemoryConfiguration);
    }

    if (this.isCacheEnabled) {
      const cacheResponse = this.cache.getConfiguration();

      return cacheResponse
        ? this.getFromCache(cacheResponse)
        : this.getFromApi(true);
    }

    return this.getFromApi();
  }

  private getFromApi(isCacheEnabled = false): Observable<AppConfiguration> {
    return this.api.fetchConfig().pipe(
      tap((val) => {
        this.inMemory.saveConfiguration(val);
        if (isCacheEnabled) {
          this.cache.saveConfiguration(val);
        }
      })
    );
  }

  private getFromCache(
    cacheResponse: AppConfiguration
  ): Observable<AppConfiguration> {
    return of(cacheResponse).pipe(
      tap((val) => {
        this.inMemory.saveConfiguration(val);
      })
    );
  }

  private getFromMemory(): AppConfiguration {
    return this.inMemory.getConfiguration();
  }
}
