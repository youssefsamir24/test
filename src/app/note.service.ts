import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable ,BehaviorSubject } from 'rxjs';
import { Token } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private _HttpClient:HttpClient, private _Router:Router) { }

  token:any = {
    token:'3b8ny__'+localStorage.getItem('userLoginToken')
  }
  addNotes(data:object):Observable<any>{
    return this._HttpClient.post('https://note-sigma-black.vercel.app/api/v1/notes/',data,{headers:this.token})
  }
  getNotes():Observable<any>{
    return this._HttpClient.get('https://note-sigma-black.vercel.app/api/v1/notes/',{headers:this.token})
  }
  updateNotes(data:object,id:string):Observable<any>{
    return this._HttpClient.put(`https://note-sigma-black.vercel.app/api/v1/notes/${id}`,data,{headers:this.token})
  }
  deleteNotes(id:string):Observable<any>{
    return this._HttpClient.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${id}`,{headers:this.token})
  }


}
