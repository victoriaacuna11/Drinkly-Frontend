import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BarService {

  _url = "http://localhost:5000/api/bar/";
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

  createBar(file) {
    console.log(this._url+"add");
    console.log(file);
    return this._http.post(this._url+"add", file);
  }

}
