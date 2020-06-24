import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bar } from '../models/bar';

@Injectable({
  providedIn: 'root'
})
export class BarService {

  // _url = "http://localhost:5000/api/bar/";
  _url = 'https://drinklyapi.herokuapp.com/api/bar/'
  constructor(private _http: HttpClient) { }

  deleteBar(id) {
    return this._http.delete(this._url + "delete/" + id);
  }

  getBars() {
    return this._http.get(this._url);
  }

  getBar(id) {
    return this._http.get(this._url + id);
  }

  createBar(bar) {
    return this._http.post(this._url+"add", bar);
  }

  updateBar(bar){
    console.log(bar);
    return this._http.put(this._url+'update/'+bar._id, bar);
  }

  

}
