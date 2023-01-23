import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNestedReplyComponent } from './add-nested-reply.component';

describe('AddNestedReplyComponent', () => {
  let component: AddNestedReplyComponent;
  let fixture: ComponentFixture<AddNestedReplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNestedReplyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNestedReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
