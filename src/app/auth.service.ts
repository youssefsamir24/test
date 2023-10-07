import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { Observable ,BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient,private _Router:Router) { 
    if(localStorage.getItem('userLoginToken')!=null){
      this.decodeToken();

    }else{
      this._Router.navigate(['/login'])
    }
  }


  userInfo = new BehaviorSubject(null)

  decodeToken(){
    let encode = JSON.stringify(localStorage.getItem('userLoginToken'));
    let decode:any = jwtDecode(encode);
    console.log(decode);
    this.userInfo.next(decode)
  }

  signUp(data:object):Observable<any>{
    return this._HttpClient.post('https://note-sigma-black.vercel.app/api/v1/users/signUp',data)
  }

  login(data:object):Observable<any>{
    return this._HttpClient.post('https://note-sigma-black.vercel.app/api/v1/users/signIn',data)
  }

  logout(){
    this.userInfo.next(null)
    localStorage.removeItem('userLoginToken')
    this._Router.navigate(['/login'])
  }

}
