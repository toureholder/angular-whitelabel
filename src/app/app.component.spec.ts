import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ThemingService } from './core/services/theming.service';

describe('AppComponent', () => {
  let mockThemingSerivce: jasmine.SpyObj<ThemingService>;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    mockThemingSerivce = jasmine.createSpyObj('ThemingService', [
      'setCSSVariables',
    ]);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, CoreModule],
      declarations: [AppComponent],
      providers: [{ provide: ThemingService, useValue: mockThemingSerivce }],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
  }));

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should delegate theming to theming service', () => {
    // Act / When
    fixture.detectChanges();
    // Assert / Then
    expect(mockThemingSerivce.setCSSVariables).toHaveBeenCalled();
  });
});
