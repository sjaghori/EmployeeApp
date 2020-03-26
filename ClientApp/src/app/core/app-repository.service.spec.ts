import { TestBed, ComponentFixture, inject } from '@angular/core/testing';

import { AppRepository } from './app-repository.service';

describe('AppRepository', () => {
  let appservice: AppRepository;
  let fixture: ComponentFixture<AppRepository>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppRepository,
      ]
    });
    // fixture = TestBed.createComponent(AppRepository);
    // service = TestBed.inject(AppRepository);
  });

  beforeEach(inject([AppRepository], (service: AppRepository) => {
    appservice = service;
  }));

  it('should be created', () => {
    expect(appservice).toBeTruthy();
  });
/*
  // Unit Tests
  it('should add a new Element to the array of Employee Objects', () => {
    expect(appservice.employeelist.length).toBe(0);
    appservice.add('Sasan', 'Jaghori', 40, 'BOSS', '2000/08/12');
    appservice.add('Max', 'Musternann', 60, 'IT', '1990/01/01');
    expect(appservice.employeelist.length).toBe(2);
  });

  it('shoud remove the Employee Object from the Array of Employees by ID', () => {
    // precondition: add() function should work!
    expect(appservice.employeelist.length).toBe(0);
    appservice.add('Hasan', 'Jaghori', 40, 'BOSS', '1999/08/12');
    appservice.add('Max', 'Musternann', 60, 'IT', '1990/01/01');
    appservice.remove(2);
    expect(appservice.employeelist.length).toBe(1);
  });
*/
});
