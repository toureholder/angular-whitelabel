import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ThemingService } from './core/services/theming.service';
import { ConfigurationService } from './core/configuration/configuration.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppComponent', () => {
  let mockThemingSerivce: jasmine.SpyObj<ThemingService>;
  let mockConfigService: jasmine.SpyObj<ConfigurationService>;
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(() => {
    mockThemingSerivce = jasmine.createSpyObj('ThemingService', [
      'setCSSVariables',
    ]);

    mockConfigService = jasmine.createSpyObj('ConfigurationService', [
      'getConfig',
    ]);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, CoreModule, HttpClientTestingModule],
      declarations: [AppComponent],
      providers: [
        { provide: ThemingService, useValue: mockThemingSerivce },
        { provide: ConfigurationService, useValue: mockConfigService },
      ],
    });

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should delegate theming to theming service', () => {
    // Given
    const config = {
      theme: {
        'primary-color': 'red',
        'secondary-color': 'teal',
      },
    };

    mockConfigService.getConfig.and.returnValue(of(config));

    // Act / When
    fixture.detectChanges();

    // Assert / Then
    expect(mockThemingSerivce.setCSSVariables).toHaveBeenCalledWith(
      fixture.elementRef,
      config.theme
    );
  });
});
