import { Component, OnInit, ElementRef } from '@angular/core';
import { ThemingService } from './core/services/theming.service';
import { ConfigurationService } from './core/configuration/configuration.service';
import { config } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private el: ElementRef,
    private themingService: ThemingService,
    private configurationService: ConfigurationService
  ) {}

  ngOnInit(): void {
    this.confgureApplication();
  }

  private confgureApplication(): void {
    this.configurationService.getConfig().subscribe((data: any) => {
      this.themingService.setCSSVariables(this.el, data.theme);
    });
  }
}
