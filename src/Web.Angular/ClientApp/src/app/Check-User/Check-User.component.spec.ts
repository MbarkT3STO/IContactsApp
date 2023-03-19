/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CheckUserComponent } from './Check-User.component';

describe('CheckUserComponent', () => {
  let component: CheckUserComponent;
  let fixture: ComponentFixture<CheckUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CheckUserComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
