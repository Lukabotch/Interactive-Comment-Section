import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepliesOfCommentComponent } from './replies-of-comment.component';

describe('RepliesOfCommentComponent', () => {
  let component: RepliesOfCommentComponent;
  let fixture: ComponentFixture<RepliesOfCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepliesOfCommentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepliesOfCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
