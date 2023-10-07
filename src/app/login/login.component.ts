import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private _AuthService:AuthService,private _Router:Router){

  }
  apiError:string = ''
  flag:boolean = false;

  loginForm:FormGroup = new FormGroup({
    email: new FormControl(null,[Validators.required , Validators.email]),
    password: new FormControl(null,[Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{8,16}$/)])
  })

  loginHandle(loginForm:FormGroup){
    this.flag = true
    this._AuthService.login(loginForm.value).subscribe({
      next:(respo)=>{
        console.log(respo)
        this.flag=false
        localStorage.setItem('userLoginToken',respo.token)
        this._AuthService.decodeToken();
        this._Router.navigate(['/home'])
      },
      error:(err)=>{
        console.log(err);
        this.apiError = err.error.msg
        this.flag=false
      }
    })
    
  }


}
