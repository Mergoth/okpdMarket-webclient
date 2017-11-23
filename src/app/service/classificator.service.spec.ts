import { TestBed, inject } from '@angular/core/testing';

import { ClassificatorService } from './classificator.service';

describe('ClassificatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClassificatorService]
    });
  });

  it('should be created', inject([ClassificatorService], (service: ClassificatorService) => {
    expect(service).toBeTruthy();
  }));
});
