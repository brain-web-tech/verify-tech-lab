import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';  
import { Login } from './login';  
import { AuthService } from '../../../authentication/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface ApiResponse<T> {
  status: string; // "success" or "failed"
  message: string; // Response message
  data: T | null; // Response data or null
}

@Injectable({
  providedIn: 'root'
})

export class LoginService {  
  userName : any;
  password : any;
  data : any;
  constructor(private http: HttpClient, public authService: AuthService) { }  
  
  login(userLogin:any) {
    this.authService.login(userLogin).subscribe(data => {
      this.data = data;
      debugger
      this.authService.loginsuccess(data); // Handle login
    });
  }
}