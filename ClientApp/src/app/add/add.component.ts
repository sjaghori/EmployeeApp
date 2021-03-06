import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Employee } from '../core/app-item';
import { AppRepository } from '../core/app-repository.service';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit, OnDestroy  {

  employeeItems$: Observable<Employee[]>;

  startDate = new Date(1998, 8, 12);
  minDate: Date;
  maxDate: Date;

  public isLogged = false;
  private authSubscription: Subscription;

  constructor(private appReposervice: AppRepository, private router: Router, private oAuthService: OAuthService) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 70, 0, 0); // oldest members are 70 years old
    this.maxDate = new Date(currentYear - 10, 0, 0); // newest members are at least 10 years old
  }




  employeeForm = new FormGroup({
    firstname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(2)]),
    dateofbirth: new FormControl('', Validators.required),
    hours: new FormControl('', [Validators.required, Validators.min(6), Validators.max(60)]),
    department: new FormControl('', Validators.required),
  });


  ngOnInit(): void {
    this.authSubscription = this.oAuthService.events.subscribe(() => this.updateAuthState());
    this.updateAuthState();
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }


  private updateAuthState() {
    this.isLogged = this.oAuthService.hasValidAccessToken();
  }

  public addEmployee() {
    if (!this.employeeForm.valid) {
      return;
    }


    const value = this.employeeForm.value;
    const employeeItem: Employee = {
      id: 0,
      firstname: value.firstname,
      lastname: value.lastname,
      dateofbirth: value.dateofbirth,
      hours: +value.hours,
      department: value.department,
      name: null,
      email: null
    };

    this.appReposervice.add(employeeItem);

    this.employeeForm.reset({ firstname: '', lastname: '', dateofbirth: '', hours: undefined, department: '' });
    this.router.navigate(['/list']);

  }

  resetValue() {
    this.employeeForm.reset({ firstname: '', lastname: '', dateofbirth: '', hours: undefined, department: '' });
  }

  // getters for formvalidation
  get firstname() {
    return this.employeeForm.get('firstname');
  }

  get lastname() {
    return this.employeeForm.get('lastname');
  }

  get dateofbirth() {
    return this.employeeForm.get('dateofbirth');
  }

  get hours() {
    return this.employeeForm.get('hours');
  }

  get department() {
    return this.employeeForm.get('department');
  }

}


