import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ingredient } from "../models/ingredient";

@Injectable({
  providedIn: "root",
})
export class IngredientService {
  /**
   * Guarda el url de la api donde sacará la información.
   */
  _url = "https://drinklyapi.herokuapp.com/api/ingredient/"
  // _url = "http://localhost:5000/api/ingredient/";
  
  constructor(private _http: HttpClient) {}

  /**
   * Hace el request a la api para crear el ingrediente.
   * @param {ingredient} ingredient - ingrediente que se va a crear.
   * @returns {any}
   */
  createIngredient(item:ingredient):any {
    return this._http.post(this._url + "add/", item);
  }

  /**
   * @ignore
   */
  updateIngredientPhoto(file, id) {
    return this._http.put(this._url + "update/photo/" + id, file);
  }

  /**
   * Hace el request a la api para obtener los ingredientes de la DB.
   * @returns {any}
   */ 
  getIngredients():any {
    return this._http.get(this._url);
  }

  /**
   * Hace el request a la api para obtener los datos de un ingrediente.
   * @param {String} id - id del ingrediente.
   * @returns {any}
   */
  getIngredient(id:String):any {
    return this._http.get(this._url + id);
  }

  /**
   * Hace el request a la api para eliminar el ingrediente.
   * @param {String} id - id del ingrediente.
   * @returns {any}
   */
  deleteIngredient(id:String):any {
    return this._http.delete(this._url + "delete/" + id);
  }

  /**
   * Hace el request a la api para actualizar el ingredient.
   * @param {ingredient} ingredient - ingrediente con los datos actualizados.
   * @returns {any}
   */
  updateIngredient(ingredient: ingredient):any {
    return this._http.put(this._url + "update/" + ingredient._id, ingredient);
  }
}
