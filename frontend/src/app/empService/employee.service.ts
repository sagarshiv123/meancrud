import { Injectable } from '@angular/core';
import { Employee } from '../appModels/employee.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  
  url = 'http://localhost:8080/employees';

  constructor(private http:HttpClient) { }


getEmployee():Observable<Employee>{
  return this.http.get<Employee>(this.url);
}


  addEmployee(emp:Employee):Observable<Employee>{
   return this.http.post<Employee>(this.url,emp);
  }

 updateEmployee(emp:Employee):Observable<Employee>{
  return this.http.put<Employee>(`${this.url}/${emp._id}`,emp);
 }


  deleteEmployee(id:number):Observable<Employee>{
   return this.http.delete<Employee>(`${this.url}/${id}`);
  }
}
