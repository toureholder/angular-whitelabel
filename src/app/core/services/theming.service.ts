import { Injectable, ElementRef } from '@angular/core';
import { AppConfiguration } from '../configuration/configuration';

@Injectable({
  providedIn: 'root',
})
export class ThemingService {
  setCSSVariables(el: ElementRef, propertyMap: AppConfiguration) {
    Object.keys(propertyMap).forEach((key) => {
      el.nativeElement.style.setProperty(`--${key}`, propertyMap[key]);
    });
  }
}
