import { NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';

import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Login } from './login';
import { LoginService } from './login.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [ReactiveFormsModule, ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle]
})
export class LoginComponent {  
  userLoginForm: any;
  myImage:string="./assets/images/ImgFile/Wallpaper-login.gif"
  data : any;
  constructor(public login:LoginService, private formbulider: FormBuilder, private toast:ToastrService) {}
  loginFlag: any;
  
  ngOnInit() {
    sessionStorage.removeItem("isLoggedIn");
    this.userLoginForm = this.formbulider.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });    
  }

  doLogin(data:any) {
    const userLogin = this.userLoginForm.value;
    if(userLogin.username === '' || userLogin.password === '' ){
      this.toast.warning('Please enter username or password!', 'required!');
    }
    else{
      this.login.login(userLogin);
    }
  }
}
