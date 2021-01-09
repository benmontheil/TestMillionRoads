import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DummyService {

  constructor(private http : HttpClient) { }

  // récupère la liste de tous les employés
  getEmployees() : Observable<any> {
    // returns un Observable de Employee
    return this.http.get<any>("http://dummy.restapiexample.com/api/v1/employees");
  }

  // supprime un employé de la liste par son id
  delete(employeeId : number) : Observable<any> {
    // returns un Observable de Employee
    return this.http.delete<any>("http://dummy.restapiexample.com/api/v1/delete/"+employeeId);
  }

  // récupère un employé par son id pour affiché ses infos
  getEmployeeFromId(employeeId : number) : Observable<any> {
    return this.http.get<any>("http://dummy.restapiexample.com/api/v1/employee/"+employeeId);
  }

  // met à jour les infos d'un employé (utilisation du proxy.conf.json pour contourner le CORS)
  updateEmployee(employee : Employee) : Observable<any> {
    return this.http.put<any>("http://localhost:4200/api/v1/update/"+employee.id,employee);
  }

  // ajoute un nouvel employé à la liste (utilisation du proxy.conf.json pour contourner le CORS)
  createEmployee(employee : Employee) : Observable<any> {
    return this.http.post<any>("http://localhost:4200/api/v1/create",employee);
  }
}
