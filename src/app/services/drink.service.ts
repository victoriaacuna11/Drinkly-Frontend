import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { drink } from "../models/drink";

@Injectable({
  providedIn: "root",
})
export class DrinkService {
  _url = "http://localhost:5000/api/drink/";
  constructor(private _http: HttpClient) { }

  createDrink(file) {
    return this._http.post(this._url + "add/", file);
  }

  updateDrinkPhoto(file, id) {
    return this._http.put(this._url + "update/photo/" + id, file);
  }

  getDrinks() {
    return this._http.get(this._url);
  }

  getDrink(id) {
    return this._http.get(this._url + id);
  }

  deleteDrink(id) {
    return this._http.delete(this._url + "delete/" + id);
  }

  updateDrink(drink: drink) {
    return this._http.put(this._url + "update/" + drink._id, drink);
  }
}
