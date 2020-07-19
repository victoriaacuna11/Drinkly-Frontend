import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { drink } from "../models/drink";

@Injectable({
  providedIn: "root",
})
export class DrinkService {
  // _url = "http://localhost:5000/api/drink/";
  /**
   * url del backend
   */
   _url = 'https://drinklyapi.herokuapp.com/api/drink/';
  constructor(private _http: HttpClient) { }

  /**
   * metodo para crear un trago en la base de datos
   * @param file trago a crear
   * @returns post request del trago
   */
  createDrink(file) {
    return this._http.post(this._url + "add/", file);
  }
/**
 * Metodo que actualiza la foto de un trago
 * @param file foto
 * @param id id del trago
 * @returns reuest put de la imagen
 */
  updateDrinkPhoto(file, id) {
    return this._http.put(this._url + "update/photo/" + id, file);
  }
/**
 * metodo get donde trae todos los tragos de la base de datos
 * @returns los drinks con un request get
 */
  getDrinks() {
    return this._http.get(this._url);
  }
/**
 * metodo que trae un trago especifico de la base de datos
 * @param id id del trago a traer
 * @returns un trago
 */
  getDrink(id) {
    return this._http.get(this._url +id);
  }
/**
 * Metodo que borra un trago de la base de datos
 * @param id id del trago a borrar
 * @returns un request delete del trago
 */
  deleteDrink(id) {
    return this._http.delete(this._url + "delete/" + id);
  }
/**
 * Metodo que actualiza un trago
 * @param drink trago que se actualizara
 * @returns request put del trago
 */
  updateDrink(drink: drink) {
    return this._http.put(this._url + "update/" + drink._id, drink);
  }
/**
 * Trae tragos filtrados de la base de datos segun un array de ingredientes
 * @param filter id de los tragos separados por comas
 * @returns lista de tragos filtrados
 */
  filteredDrink(filter){
    return this._http.get(this._url+"filter_drink/"+filter);
  }
}
