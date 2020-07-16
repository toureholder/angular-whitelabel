import { Component, OnInit, ElementRef } from '@angular/core';
import { ThemingService } from './core/services/theming.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private el: ElementRef, private theming: ThemingService) {}
  ngOnInit(): void {
    this.theme({ 'primary-color': 'red' });
  }

  private theme(map: { [key: string]: string }) {
    this.theming.setCSSVariables(this.el, map);
  }
}
