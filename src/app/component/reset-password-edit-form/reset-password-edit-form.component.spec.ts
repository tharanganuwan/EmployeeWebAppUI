import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordEditFormComponent } from './reset-password-edit-form.component';

describe('ResetPasswordEditFormComponent', () => {
  let component: ResetPasswordEditFormComponent;
  let fixture: ComponentFixture<ResetPasswordEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPasswordEditFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetPasswordEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
