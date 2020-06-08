import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ingredient } from "../models/ingredient";

@Injectable({
  providedIn: "root",
})
export class IngredientService {
  _url = "http://localhost:5000/api/ingredient/";
  constructor(private _http: HttpClient) {}

  createIngredient(file) {
    return this._http.post(this._url + "add/", file);
  }

  updateIngredientPhoto(file, id) {
    return this._http.put(this._url + "update/photo/" + id, file);
  }

  getIngredients() {
    return this._http.get(this._url);
  }

  getIngredient(id) {
    return this._http.get(this._url + id);
  }

  deleteIngredient(id) {
    return this._http.delete(this._url + "delete/" + id);
  }

  updateIngredient(ingredient: ingredient) {
    return this._http.put(this._url + "update/" + ingredient._id, ingredient);
  }
}
