import { TestBed } from '@angular/core/testing';

import { NbaNewsService } from './nba-news.service';

describe('NbaNewsService', () => {
  let service: NbaNewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NbaNewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
