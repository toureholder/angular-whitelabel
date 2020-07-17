import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationApiService {
  constructor(private http: HttpClient) {}

  fetchConfig(): Observable<any> {
    return this.http.get('http://localhost:3000/config');
  }
}
