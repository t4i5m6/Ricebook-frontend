import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      imports: [ReactiveFormsModule, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch the logged in user\'s profile username', () => {

    localStorage.setItem("userName", "tim")
    component.ngOnInit()
    expect(component.userNameStr).toEqual("tim")
    localStorage.clear()
  });

  it('should produce required messages', () => {

    let profileForm = component.profileForm
    component.onSubmit()
    expect(component.validationMessage).toEqual([
        "Email is required.",
      'Phone number is required.',
      'Zipcode is required.',
      'Password is required.',
      'Password confirm is required.'
    ])

  });

  it('should submit correctly', () => {

    let profileForm = component.profileForm

    profileForm.get("email")?.setValue("123@rice.edu")
    component.profileForm.controls.email.setValue("123@rice.edu")
    component.profileForm.controls.phoneNumber.setValue("123-345-5454")
    component.profileForm.controls.zipcode.setValue("65666")
    component.profileForm.controls.password.setValue("123")
    component.profileForm.controls.passwordConfirm.setValue("123")


    component.onSubmit()
    expect(component.validationMessage).toEqual([])

  });
});
