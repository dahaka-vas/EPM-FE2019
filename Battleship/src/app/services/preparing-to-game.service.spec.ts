import { TestBed } from '@angular/core/testing';

import { PreparingToGameService } from './preparing-to-game.service';

describe('PreparingToGameServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PreparingToGameServiceService = TestBed.get(PreparingToGameServiceService);
    expect(service).toBeTruthy();
  });
});
