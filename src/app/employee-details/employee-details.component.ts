import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FormBuilder } from '@angular/forms';
import { DummyService } from '../dummy.service';
import { Employee } from '../employee';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  
  employee : Employee;
  updateForm;
  message: string;

  constructor(private route: ActivatedRoute, private dummyService : DummyService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    const employeeId = this.getEmployeeId();
    this.getEmployeeFromId(employeeId);
  }

  // récupère l'id de l'employé à partir de l'url de la route
  getEmployeeId(){
    const routeParams = this.route.snapshot.paramMap;
    return Number(routeParams.get("employeeId"));
  }

  // récupère l'employé avec un service grâce à son id
  getEmployeeFromId(employeeId : number){
    this.dummyService.getEmployeeFromId(employeeId)
    .subscribe(
      data => {
        // on défini les valeurs du formulaire avec celles de l'employé
        this.employee = data.data;
        this.updateForm = this.formBuilder.group({
          name: this.employee.employee_name,
          salary: this.employee.employee_salary,
          age: this.employee.employee_age,
          profile_image: this.employee.profile_image
        });
      }
    );
  }

  // enregistre les valeurs mises à jour du formulaires dans l'employé qui est transmis au service
  onSubmit(employeeData) {
    this.employee.employee_name = employeeData.name;
    this.employee.employee_salary = employeeData.salary;
    this.employee.employee_age = employeeData.age;
    this.employee.profile_image = employeeData.profile_image;
    this.dummyService.updateEmployee(this.employee)
    .subscribe(
      data => {
        this.message = data.message;
        console.log(data);
      }
    )
  }
}
