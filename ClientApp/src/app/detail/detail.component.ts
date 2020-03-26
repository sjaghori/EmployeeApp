import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { Employee } from '../core/app-item';
import { AppRepository } from '../core/app-repository.service';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {

  private routeSubscription?: Subscription;

  public employeeItems$: Observable<Employee[]>;

  public employee$: Observable<Employee>;

  constructor(private appRepo: AppRepository,
    private activatedRoute: ActivatedRoute) {
    this.employeeItems$ = appRepo.employeeItems$;
  }

  ngOnInit() {
    this.routeSubscription =
      this.activatedRoute.params.subscribe(params => {
        this.employee$ = this.appRepo.findItem(+params['id']);
      });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
}
