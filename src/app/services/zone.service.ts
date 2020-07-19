import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { zone } from '../models/zone';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  /**
   * Guarda el url de la api donde sacará la información.
   */
  _url = 'https://drinklyapi.herokuapp.com/api/zone/';
  // _url = 'http://localhost:5000/api/zone/';
  constructor(private _http: HttpClient) { }

  /**
   * Hace el request a la api para obtener las zonas de la DB.
   * @returns {any}
   */
  getZones():any {
    return this._http.get(this._url);
  }

  /**
   * Hace el request a la api para crear la zona.
   * @param {zone} zone - Zona que se va a crear.
   * @returns {any}
   */
  postZone(zone: zone):any{
    console.log(zone);
    return this._http.post(this._url+'add', zone);
  }

  /**
   * Hace el request a la api para eliminar la zona.
   * @param {String} id - id de la zona.
   * @returns {any}
   */
  deleteZone(id:String):any{
    console.log(id);
    return this._http.delete(this._url+'delete/'+id);
  }

  /**
   * Hace el request a la api para obtener los datos de la zona.
   * @param {String} id - id de la zona.
   * @returns {any}
   */
  getZone(id:String):any{
    console.log(this._url)
    return this._http.get(this._url+id);
  }

  /**
   * Hace el request a la api para actualizar la zona.
   * @param {zone} zone - Zona que se va a actualizar.
   * @returns {any}
   */
  updateZone(zone : zone):any{
    return this._http.put(this._url+'update/'+zone._id, zone);
  }


}
