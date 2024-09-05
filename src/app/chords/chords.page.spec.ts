import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChordsPage } from './chords.page';

describe('ChordsPage', () => {
  let component: ChordsPage;
  let fixture: ComponentFixture<ChordsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChordsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
