import { Component, OnInit, ElementRef } from '@angular/core';
import { ThemingService } from './core/services/theming.service';
import { ConfigurationService } from './core/configuration/configuration.service';
import { config, Observable } from 'rxjs';
import { AppConfiguration } from './core/configuration/configuration';

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

  isLoadingConfiguration: boolean;

  ngOnInit(): void {
    this.confgureApplication();
  }

  private loadConfiguration(): Observable<AppConfiguration> {
    return this.configurationService.getConfig();
  }

  private confgureApplication(): void {
    this.isLoadingConfiguration = true;
    this.configurationService.disableCache();

    this.loadConfiguration().subscribe((data: any) => {
      this.themingService.setCSSVariables(this.el, data.theme);
      this.isLoadingConfiguration = false;
    });
  }
}
