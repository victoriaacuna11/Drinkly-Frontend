import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {userP} from '../models/user-p';

 
@Injectable({
  providedIn: 'root'
})
export class PruebaService {

  _url = 'http://localhost:5000/api/usersprueba/';
  _urlpost = 'http://localhost:5000/api/usersprueba/adduser';
  _urldelete = 'http://localhost:5000/api/usersprueba/delete/';

  constructor(
    private _http : HttpClient
  ) { }

  getUsers() {
    return this._http.get(this._url);
    
  }

  postUser(user: userP){
    console.log(user);
    return this._http.post(this._urlpost, user);
  }

  deleteUser(id){
    console.log(id);
    return this._http.delete(this._urldelete+id);
  }

  getUser(id){
    // console.log(id);
    return this._http.get(this._url+id);
  }

  updateUser(user : userP){
    return this._http.put(this._url+'update/'+user._id, user);
  }
}
