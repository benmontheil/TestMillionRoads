import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DummyService } from '../dummy.service';
import { Employee } from '../employee';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  createForm;
  employee : Employee;
  lastId : number;
  message : string;

  constructor(private formBuilder: FormBuilder, private dummyService : DummyService) { }

  // construit un nouvel employé, attribue les valeurs du formulaire et récupère le dernier id de la liste des employés
  ngOnInit(): void {
    this.employee = {id : 0, employee_age : 0, employee_name : "", employee_salary : 0, profile_image : ""};
    this.createForm = this.formBuilder.group({
      name: "",
      salary: "",
      age: "",
      profile_image: ""
    });
  }

  // récupère le dernier id des employés
  getLastId(){
    this.dummyService.getEmployees()
    .subscribe(
      data => {
        this.lastId = data.data.lenght;
      }
    )
  }

  // enregistre les valeurs du formulaires dans l'employé qui est transmis au service
  onSubmit(employeeData) {
    this.employee.id = this.lastId;
    this.employee.employee_name = employeeData.name;
    this.employee.employee_salary = employeeData.salary;
    this.employee.employee_age = employeeData.age;
    this.employee.profile_image = employeeData.profile_image;
    this.dummyService.createEmployee(this.employee)
    .subscribe(
      data => {
        this.message = data.message
        console.log(data);
      }
    )
  }
}
