import { TestBed } from '@angular/core/testing';

import { MissingProductService } from './missing-product.service';

describe('MissingProductService', () => {
  let service: MissingProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MissingProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
