import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OtherPostsPage } from './other-posts.page';

describe('OtherPostsPage', () => {
  let component: OtherPostsPage;
  let fixture: ComponentFixture<OtherPostsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherPostsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
