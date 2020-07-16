import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import getConfigApiResponse from '../../../testing/api-responses/get-config.json';
import { ConfigurationService } from './configuration.service';
import { of } from 'rxjs';

describe('ConfigurationService', () => {
  let service: ConfigurationService;
  let mockHttpClient: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    mockHttpClient = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: mockHttpClient }],
    });
    service = TestBed.inject(ConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch config from api', () => {
    // Given
    const apiResponse = getConfigApiResponse;
    mockHttpClient.get.and.returnValue(of(getConfigApiResponse));

    // When
    const configObservable = service.getConfig();

    // Then
    configObservable.subscribe((data) => {
      expect(data).toEqual(jasmine.objectContaining(apiResponse));
    });
  });
});
