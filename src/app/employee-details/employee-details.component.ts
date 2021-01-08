import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  @Input() employees;

  employee;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const employeeIdFromRoute = Number(routeParams.get("employeeId"));
    
    // on peut récupérer l'employée à partir de la liste récupérée depuis le parent avec un @input
    // ou alors avec un observale en appelant l'url de la Dummy api
    //this.employee = employees[employeeIdFromRoute]; 
  }

}
