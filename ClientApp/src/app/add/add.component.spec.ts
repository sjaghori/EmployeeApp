import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddComponent } from './add.component';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { AppRepository } from '../core/app-repository.service';
import { RouterTestingModule } from '@angular/router/testing';


describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AddComponent,
      ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        AppRepository,
    ],
    schemas: [
      CUSTOM_ELEMENTS_SCHEMA
    ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(AddComponent);

        component = fixture.componentInstance;

        de = fixture.debugElement.query(By.css('form'));
        el = de.nativeElement;

      });
  }));

  // Unit Tests
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`Form should be valid if everything is valid`, async(() => {
    component.employeeForm.patchValue({
      firstname: 'Sasan',
      lastname: 'Jaghori',
      dateofbirth: '1998/08/12',
      hours: 40,
      department: 'IT',
    });
    // console.log(component.employeeForm.get('firstname'));
    expect(component.employeeForm.valid).toBeTruthy();
  }));

  it(`Form should be invalid if hours is not valid`, async(() => {
    component.employeeForm.patchValue({
      firstname: 'Sasan',
      lastname: 'Jaghori',
      dateofbirth: '1998/08/12',
      hours: 3000,
      department: 'IT',
    });
    expect(component.employeeForm.invalid).toBeTruthy();
  }));

});
