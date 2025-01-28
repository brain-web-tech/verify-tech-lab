import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isLoggedIn = false;
  userName : any;
  password : any;
  private url: any = 'https://localhost:44375/Api';
  data : any;
  constructor(private router: Router, private http: HttpClient) {}

  login(userLogin: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.url + '/Common/Login?userName=' + userLogin.username + '&password=' + userLogin.password, httpOptions);
  }

  logout() {
    localStorage.setItem("isLoggedIn", "false");
    this.router.navigateByUrl('/');
  }
}
