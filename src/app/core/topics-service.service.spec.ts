import { TestBed } from '@angular/core/testing';

import { TopicsServiceService } from './topics-service.service';

describe('TopicsServiceService', () => {
  let service: TopicsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopicsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
