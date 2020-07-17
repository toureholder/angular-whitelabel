import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ConfigurationService } from '../../configuration/configuration.service';
import { NavComponent } from './nav.component';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let template: HTMLElement;
  let mockConfigService: jasmine.SpyObj<ConfigurationService>;

  beforeEach(async(() => {
    mockConfigService = jasmine.createSpyObj('ConfigurationService', [
      'getConfig',
    ]);

    TestBed.configureTestingModule({
      declarations: [NavComponent],
      providers: [
        { provide: ConfigurationService, useValue: mockConfigService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    template = fixture.nativeElement;
    component.features = [];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get enables features from configuration service', () => {
    // Given
    const data = {
      features: ['sales', 'documentation'],
    };
    mockConfigService.getConfig.and.returnValue(of(data));

    // When
    fixture.detectChanges();

    // THen
    mockConfigService
      .getConfig()
      .subscribe((configuration) =>
        expect(component.features).toEqual(
          jasmine.arrayContaining(configuration.features)
        )
      );
  });

  it('#isFeatureEnabled', () => {
    // Given
    const data = {
      features: ['documentation'],
    };
    mockConfigService.getConfig.and.returnValue(of(data));

    fixture.detectChanges();

    expect(component.isFeatureEnabled('sales')).toBe(false);
    expect(component.isFeatureEnabled('documentation')).toBe(true);
  });

  it('should only have a link to enabled features', () => {
    // Given
    const data = {
      features: ['documentation'],
    };
    mockConfigService.getConfig.and.returnValue(of(data));

    fixture.detectChanges();

    expect(template.querySelector('[data-test="sales-link"]')).not.toBeTruthy();
    expect(
      template.querySelector('[data-test="documentation-link"]')
    ).toBeTruthy();
  });
});
