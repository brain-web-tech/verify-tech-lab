import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http';  
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
  data : any;
  constructor(private toast: ToastrService, public authService: AuthService, private router: Router) { }  
  
  login(userLogin:any) {
    this.authService.login(userLogin).subscribe(result => {
      this.data = result.data;
      localStorage.setItem("isLoggedIn", "false");
      if(parseInt(this.data) > 0){
        localStorage.setItem("isLoggedIn", "true");
        this.router.navigateByUrl('/dashboard');
      }
      else{
        this.toast.error('Invalid username or password!', 'Invalid!');
      }
    });
  }
}