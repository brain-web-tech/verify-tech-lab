import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';  
import { Login } from './login';  
import { AuthService } from '../../../authentication/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class LoginService {  
  userName : any;
  password : any;
  role : any;
  status:any;
  resultSet: any[] = [];

  constructor(private toast: ToastrService, public authService: AuthService, private router: Router) { }  
  
  login(userLogin:any) {
    this.authService.login(userLogin).subscribe({
      next: (result) => {
        this.status = result.status;
        this.userName = result.userName;
        this.role = result.role;
        this.resultSet = result;
        sessionStorage.removeItem("isLoggedIn");
        if (this.status === 'success') {
          sessionStorage.setItem("UserRole", this.role);
          sessionStorage.setItem("UserName", this.userName);
          sessionStorage.setItem("isLoggedIn", "true");
          this.router.navigateByUrl('/dashboard');
        } else {
          this.toast.error('Invalid username or password!', 'Invalid!', {
            timeOut: 5000,
            //closeButton: true,
            progressBar: true            
          });
        }
      },
      error: (err) => {
        console.error("Login API error:", err);
        this.toast.error('Something went wrong! Please try again.', 'Error!', {
          timeOut: 5000,
          progressBar: true
        });
      }
    });
    
  }
}