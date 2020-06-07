import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ingredient} from '../models/ingredient';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  _urladd= 'http://localhost:5000/api/ingredient/add/';
  _url = 'http://localhost:5000/api/ingredient/';
  constructor(private _http: HttpClient) { }

  createIngredient(file){
    this._http.post(this._urladd, file);
  }

  getIngredients(){
    this._http.get(this._url);
  }
}
