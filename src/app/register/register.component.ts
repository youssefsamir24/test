import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private _AuthService:AuthService, private _Router:Router){

  }

  signUpFrom:FormGroup = new FormGroup({
    name: new FormControl(null,[Validators.required , Validators.minLength(3) , Validators.maxLength(10)]),
    email: new FormControl(null, [Validators.required , Validators.email]),
    password: new FormControl(null , [Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{8,16}$/)]),
    age: new FormControl(null , [Validators.required]),
    phone: new FormControl(null ,[Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)])
  })
  flag:boolean = false;
  apiError:string = '';
  handleSignUp(signUpFrom:FormGroup){
    this.flag = true;
    this._AuthService.signUp(signUpFrom.value).subscribe({
      next:(respo)=>{
        this._Router.navigate(['/login']);
        console.log(respo);
        this.flag = false;
        
      },
      error:(err)=>{
        console.log(err);
        this.flag = false;
        this.apiError = err.error.msg
        
      }
    })
    // console.log(signUpFrom);
    

  }



}
