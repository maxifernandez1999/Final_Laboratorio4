import { TestBed } from '@angular/core/testing';

import { IdiomService } from './idiom.service';

describe('IdiomService', () => {
  let service: IdiomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdiomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
