import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bar } from '../models/bar';

@Injectable({
  providedIn: 'root'
})
export class BarService {

  // _url = "http://localhost:5000/api/bar/";
  /**
   * Guarda el url de la api donde sacará la información.
   */
  _url = 'https://drinklyapi.herokuapp.com/api/bar/'
  constructor(private _http: HttpClient) { }

  /**
   * Hace el request a la api para eliminar el bar.
   * @param {String} id - id del bar.
   * @returns {any}
   */
  deleteBar(id:String):any {
    return this._http.delete(this._url + "delete/" + id);
  }

  /**
   * Hace el request a la api para obtener los bares de la DB.
   * @returns {any}
   */
  getBars():any {
    return this._http.get(this._url);
  }

  /**
   * Hace el request a la api para obtener los datos de un bar.
   * @param {String} id - id del bar.
   * @returns {any}
   */
  getBar(id:String):any {
    return this._http.get(this._url + id);
  }

  /**
   * Hace el request a la api para crear el bar.
   * @param {Bar} bar - Bar que se va a crear.
   * @returns {any}
   */
  createBar(bar:Bar):any {
    return this._http.post(this._url+"add", bar);
  }

  /**
   * Hace el request a la api para actualizar el bar.
   * @param {Bar} bar - bar con los datos actualizados.
   * @returns {any}
   */
  updateBar(bar:Bar):any{
    console.log(bar);
    return this._http.put(this._url+'update/'+bar._id, bar);
  }

  

}
