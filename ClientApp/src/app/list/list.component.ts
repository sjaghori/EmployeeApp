import { Component, OnInit } from '@angular/core';
import { Employee } from '../core/app-item';
import { AppRepository } from '../core/app-repository.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public employeeItems$: Observable<Employee[]>;

  constructor(private appReposervice: AppRepository) {
    this.employeeItems$ = appReposervice.employeeItems$;
  }

  ngOnInit(): void {
  }


  public removeEmployeeItem(id: number) {
    this.appReposervice.delete(id).subscribe();
  }

}
