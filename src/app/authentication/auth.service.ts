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
  private sessionTimeout = 30 * 60 * 1000; // 10 minutes
  private timeoutId: any;

  constructor(private router: Router, private http: HttpClient) {
    this.resetTimer(); // Start session timer
    this.setupActivityListeners();
  }

  login(userLogin: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.url + '/Common/Login?userName=' + userLogin.username + '&password=' + userLogin.password, httpOptions);
  }

  private setupActivityListeners() {
    // Listen for user actions to reset the timer
    document.addEventListener('mousemove', () => this.resetTimer());
    document.addEventListener('keydown', () => this.resetTimer());
  }

  private resetTimer() {
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => this.clearSession(), this.sessionTimeout);
  }

  private clearSession() {
    console.log('Session expired. Clearing storage and redirecting...');
    sessionStorage.clear();  // Clear all local storage
    this.router.navigate(['/login']);  // Redirect to login page
  }
}