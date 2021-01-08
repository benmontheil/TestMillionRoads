import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DummyService {

  constructor(private http : HttpClient) { }

  getEmployees() : Observable<Employee[]> {
    // returns un Observable de Employee
    return this.http.get<Employee[]>("http://dummy.restapiexample.com/api/v1/employees");
  }

  delete(employeeId : number) : Observable<boolean> {
    // returns un Observable de Employee
    return this.http.delete<boolean>("http://dummy.restapiexample.com/api/v1/delete/"+employeeId);
  }
}
