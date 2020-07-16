import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import getConfigApiResponse from '../../../testing/api-responses/get-config.json';
import { ConfigurationService } from './configuration.service';
import { of } from 'rxjs';
import { ConfigurationCacheService } from './cache/configuration-cache.service';

describe('ConfigurationService', () => {
  let service: ConfigurationService;
  let mockHttpClient: jasmine.SpyObj<HttpClient>;
  let mockCache: jasmine.SpyObj<ConfigurationCacheService>;

  beforeEach(() => {
    mockHttpClient = jasmine.createSpyObj('HttpClient', ['get']);
    mockCache = jasmine.createSpyObj('ConfigurationCacheService', [
      'getConfiguration',
      'setConfiguration',
    ]);

    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: mockHttpClient },
        { provide: ConfigurationCacheService, useValue: mockCache },
      ],
    });
    service = TestBed.inject(ConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch config from api', () => {
    // Given
    const apiResponse = getConfigApiResponse;
    mockHttpClient.get.and.returnValue(of(apiResponse));

    // When
    const configObservable = service.getConfig();

    // Then
    configObservable.subscribe((data) => {
      expect(data).toEqual(jasmine.objectContaining(apiResponse));
    });
  });

  it('#getConfig should get check cache', () => {
    // Given
    mockHttpClient.get.and.returnValue(of(getConfigApiResponse));

    // When
    service.getConfig();

    // Then
    expect(mockCache.getConfiguration).toHaveBeenCalled();
  });

  it('should get config from cache if available', () => {
    // Given
    mockHttpClient.get.and.returnValue(of(getConfigApiResponse));

    mockCache.getConfiguration.and.returnValue({ foo: 'bar' });

    // When
    const configObservable = service.getConfig();

    // Then
    configObservable.subscribe((data) => {
      expect(data).toEqual(jasmine.objectContaining({ foo: 'bar' }));
    });
  });

  it('should get config from api if cache is not available', () => {
    // Given
    const apiResponse = getConfigApiResponse;
    mockHttpClient.get.and.returnValue(of(apiResponse));

    mockCache.getConfiguration.and.returnValue(undefined);

    // When
    const configObservable = service.getConfig();

    // Then
    configObservable.subscribe((data) => {
      expect(data).toEqual(jasmine.objectContaining(apiResponse));
    });
  });

  it('should set config in cache after api response', () => {
    // Given
    const apiResponse = getConfigApiResponse;
    mockHttpClient.get.and.returnValue(of(apiResponse));

    mockCache.getConfiguration.and.returnValue(undefined);

    // When
    const configObservable = service.getConfig();

    // Then
    configObservable.subscribe((data) => {
      expect(mockCache.setConfiguration).toHaveBeenCalledWith(apiResponse);
    });
  });
});
