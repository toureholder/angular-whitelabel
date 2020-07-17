import { Injectable } from '@angular/core';
import { Observable, of, config } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ConfigurationCacheService } from './cache/configuration-cache.service';
import { ConfigurationApiService } from './api/configuration-api.service';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  constructor(
    private api: ConfigurationApiService,
    private cache: ConfigurationCacheService
  ) {}

  private isCacheEnabled = true;

  enableCache() {
    this.isCacheEnabled = true;
  }

  disableCache() {
    this.isCacheEnabled = false;
  }

  getConfig(): Observable<any> {
    if (!this.isCacheEnabled) {
      return this.api.fetchConfig();
    }

    const cacheResponse = this.cache.getConfiguration();

    return cacheResponse
      ? of(cacheResponse)
      : this.api.fetchConfig().pipe(
          tap((val) => {
            this.cache.setConfiguration(val);
          })
        );
  }
}
