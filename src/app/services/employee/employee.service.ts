import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse  } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';  
import { EmployeeModel } from './employee';  

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {  
  private url: string = 'https://localhost:50001/Api/Employee';
  constructor(private http: HttpClient) { }  

  getEmployeeById(EmpId: string): Observable<EmployeeModel> {  
    return this.http.get<EmployeeModel>(`${this.url}/GetEmployeeById?id=${EmpId}`);
  } 

  createEmployee(employee: any): Observable<any> {
    return this.http.post(this.url + '/CreateEmployee/', employee);
  }  

  getEmployees(employee:any): Observable<any> {
    return this.http.post(this.url+ '/GetEmployeesList/', employee);
  }

  updateEmployee(employee: EmployeeModel): Observable<EmployeeModel> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.put<EmployeeModel>(this.url + '/UpdateEmployeeDetails/', employee, httpOptions);  
  }  

  deleteEmployeeById(EmpId: string): Observable<number> { 
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.delete<number>(this.url + '/DeleteEmployeeById?id=' + EmpId, httpOptions);  
  }  

  public downloadImage(image: string): Observable < Blob > {  
    return this.http.get(this.url + '/GetImage?image=' + image, {  
        responseType: 'blob',
    });  
  }
}  