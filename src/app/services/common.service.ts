import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';  
import { Common } from './common';  

@Injectable({
  providedIn: 'root'
})

export class CommonService {  
   private url: string = 'https://localhost:44375/';

  constructor(private http: HttpClient) { }  

  login(userName: string, password: string) {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post(this.url + '/Common/Login/' + '?userName=' +userName + '&password=' + password, httpOptions);  
  }

  getEmployeeById(EmpId: string): Observable<Common> {  
    return this.http.get<Common>(this.url + '/GetEmaployeeById/' + EmpId);  
  } 

  createEmployee(employee: Common): Observable<Common> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<Common>(this.url + '/InsertEmployeeDetails/', employee, httpOptions);  
  }  

  updateEmployee(employee: Common): Observable<Common> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.put<Common>(this.url + '/UpdateEmployeeDetails/', employee, httpOptions);  
  }  

  deleteEmployeeById(EmpId: string): Observable<number> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.delete<number>(this.url + '/DeleteEmployeeDetailsById?id=' +EmpId, httpOptions);  
  }  

  public downloadImage(image: string): Observable < Blob > {  
    return this.http.get(this.url + '/GetImage?image=' + image, {  
        responseType: 'blob',
    });  
  }
  
}  