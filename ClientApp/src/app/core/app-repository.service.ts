import { Injectable, Inject } from '@angular/core';
import { Employee } from './app-item';
import { Subject } from 'rxjs';
import { tap, repeatWhen } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from 'src/baseUrl';

@Injectable()
export class AppRepository {
  private refreshSubject = new Subject<any>();

  constructor(private http: HttpClient, @Inject(BASE_URL) private baseUrl: string) { }

  public get employeeItems$() {
    return this.http.get<Employee[]>(`${this.baseUrl}api/employee`)
      .pipe(
        tap(items => {
          items.forEach(item => item.dateofbirth = new Date(item.dateofbirth));
        }),
        repeatWhen(_ => this.refreshSubject.asObservable())
      );
  }


  public add(employeeItem: Employee) {
    return this.http.post<Employee>(`${this.baseUrl}api/employee`, employeeItem)
      .pipe(
        tap(item => this.refreshSubject.next(item))
      ).subscribe((data) => { console.log(data); }, (error) => { console.error(error); });
  }

  public remove(itemId: number) {
    return this.http.delete(`${this.baseUrl}api/employee/${itemId}`)
      .pipe(
        tap(item => this.refreshSubject.next(item))
      );
  }

  public findItem(itemId: number) {
    return this.http.get<Employee>(`${this.baseUrl}api/employee/${itemId}`);
  }

  public delete(itemId: number) {
    return this.http.delete(`${this.baseUrl}api/employee/${itemId}`)
      .pipe(
        tap(item => this.refreshSubject.next(item))
      );
  }
}
