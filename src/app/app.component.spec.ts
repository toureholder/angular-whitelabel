import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ThemingService } from './core/services/theming.service';
import { ConfigurationService } from './core/configuration/configuration.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';

describe('AppComponent', () => {
  let mockThemingSerivce: jasmine.SpyObj<ThemingService>;
  let mockConfigService: jasmine.SpyObj<ConfigurationService>;
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let template: HTMLElement;

  beforeEach(() => {
    mockThemingSerivce = jasmine.createSpyObj('ThemingService', [
      'setCSSVariables',
    ]);

    mockConfigService = jasmine.createSpyObj('ConfigurationService', [
      'getConfig',
      'disableCache',
    ]);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, CoreModule, HttpClientTestingModule],
      declarations: [AppComponent, MainLayoutComponent],
      providers: [
        { provide: ThemingService, useValue: mockThemingSerivce },
        { provide: ConfigurationService, useValue: mockConfigService },
      ],
    });

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    template = fixture.nativeElement;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should delegate theming to theming service', () => {
    // Given
    const data = {
      theme: {
        'primary-color': 'red',
        'secondary-color': 'teal',
      },
    };

    mockConfigService.getConfig.and.returnValue(of(data));

    // Act / When
    fixture.detectChanges();

    // Assert / Then
    expect(mockThemingSerivce.setCSSVariables).toHaveBeenCalledWith(
      fixture.elementRef,
      data.theme
    );
  });

  it('should NOT render main layout when loading configuration', () => {
    // Given
    app.isLoadingConfiguration = true;

    // Then
    expect(template.querySelector('app-main-layout')).toBeFalsy();
  });

  it('should render main layout after it loads configuration', () => {
    // Given
    const data = {
      theme: {
        'primary-color': 'red',
        'secondary-color': 'teal',
      },
    };

    mockConfigService.getConfig.and.returnValue(of(data));

    // Act / When
    fixture.detectChanges();

    // Assert / Then
    expect(template.querySelector('app-main-layout')).toBeTruthy();
  });
});
