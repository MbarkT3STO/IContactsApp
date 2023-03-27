/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserTopBarComponent } from './user-Top-Bar.component';

describe('UserTopBarComponent', () => {
  let component: UserTopBarComponent;
  let fixture: ComponentFixture<UserTopBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTopBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
