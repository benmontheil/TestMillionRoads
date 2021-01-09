import { Component, OnInit } from '@angular/core';
import { DummyService } from '../dummy.service';
import { Employee } from '../employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees : Employee[];
  message : string;

  constructor(private dummyService : DummyService) {
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  // récupère la liste des employés
  getEmployees() {
    this.dummyService.getEmployees()
      .subscribe(
        data => {this.employees = data.data}
      );
  }

  // supprime l'employé grâce au service
  delete(employee : Employee){
    this.dummyService.delete(employee.id)
      .subscribe(
        data => {
          const index = this.employees.indexOf(employee);
          this.employees.splice(index, 1);
          this.message = data.message
          console.log(data);
        }
      );
  }
}
