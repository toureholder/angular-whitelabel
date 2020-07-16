import { Injectable, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemingService {
  setCSSVariables(el: ElementRef, propertyMap: { [key: string]: string }) {
    Object.keys(propertyMap).forEach((key) => {
      const property = `--${key}`;
      const value = propertyMap[key];
      el.nativeElement.style.setProperty(property, value);
    });
  }
}
