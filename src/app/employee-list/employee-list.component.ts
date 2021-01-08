import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { DummyService } from '../dummy.service';
import { Employee } from '../employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees : Employee[];
  display : boolean;

  constructor(private dummyService : DummyService) {
    this.employees = null;
    this.display = false;
  }

  ngOnInit(): void {
  }

  getEmployees() {
    this.dummyService.getEmployees()
      .subscribe(
        data => {
          this.employees = data;
          this.display = true;
          console.log(this.employees);
        },
        error => console.log("Erreur")
      );
  }

  delete(employeeId : number){
    this.dummyService.delete(employeeId)
      .subscribe(
        data => {
          this.employees.splice(employeeId, 1);
          console.log("Employée supprimé");
        },
        error => console.log("Erreur")
      );
  }
}
