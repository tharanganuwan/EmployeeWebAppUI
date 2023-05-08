import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordInputEmailFormComponent } from './reset-password-input-email-form.component';

describe('ResetPasswordInputEmailFormComponent', () => {
  let component: ResetPasswordInputEmailFormComponent;
  let fixture: ComponentFixture<ResetPasswordInputEmailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPasswordInputEmailFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetPasswordInputEmailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
