import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../empService/employee.service';
import { Employee } from '../appModels/employee.model';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  empForm!: FormGroup;
  showModal: boolean = false;
  editMode: boolean = false;
  empData!: Employee[];

  constructor(private fb: FormBuilder, private empService: EmployeeService) { }

  ngOnInit(): void {
    this.getAllEmployee();

    this.empForm = this.fb.group({
      _id: [''],
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      subject: ['', Validators.required],
      desc: ['', Validators.required]
    });

  }

  getAllEmployee() {
    this.empService.getEmployee().subscribe((res: any) => {
      this.empData = res;
      console.log(this.empData);
    })
  }

  onEmpSubmit() {
    if (this.empForm.valid) {
      // console.log(this.empForm.value);
      if (this.editMode) {
        this.empService.updateEmployee(this.empForm.value).subscribe((res: any) => {
          console.log(res);
          this.getAllEmployee();
          // this.editMode = false;
        this.empForm.reset();
        }, (err) => {
          console.log(err)
        })
      } else {
        this.empService.addEmployee(this.empForm.value).subscribe((res: any) => {
          console.log(res);
          this.getAllEmployee();
          this.editMode = false;
        this.empForm.reset();
        }, (err) => {
          console.log(err)
        })
      }
    }
  }

  onEditEmployee(emp: Employee) {
    this.showModal = true;
    this.editMode = true;
    this.empForm.patchValue(emp);
  }

  onDeleteEmployee(id: number) {
    if (confirm('Do you want to delete Employee')) {
      this.empService.deleteEmployee(id).subscribe((res: any) => {
        console.log("Delete Successfull"+res)
        this.getAllEmployee();

      }, (err) => {
        console.log(err)
      })
    } else {
    }
  }

  onAddEmployee() {
    this.empForm.reset();
    this.editMode = false;
  }
  onCloseModel() {
    this.showModal = false;
  }
}
