import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DrinkService {

  _url = "http://localhost:5000/api/drink/";
  constructor(private _http: HttpClient) {

   }

  getBars() {
    return this._http.get(this._url);
  }
}
