import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SendMailService {

  /**
   * Guarda el url de la api donde sacará la información.
   */
  _url = 'https://drinklyapi.herokuapp.com/api/sendmail/';
  // _url = 'http://localhost:5000/api/sendmail/';

  constructor(
    private _http: HttpClient
    ) { 

    }

    /**
     * Hace el request a la API para enviar el email al usuario cuando postea una receta.
     * @param data - data del email que se le va a enviar al usuario.
     * @returns {any}
     */
    sendEmailUser(data: any):any{
      return this._http.post(this._url+'user', data);
    }

    /**
     * Hace el request a la API para enviar el email al administrador cuando se postea una receta.
     * @param data - data del email que se le va a enviar al administrador.
     * @returns {any}
     */
    postRecipe(data:any):any{
      return this._http.post(this._url+'recipe', data);
    }

    /**
     * Hace el request a la API para enviar el email al administrador cuando se postea un negocio/promoción.
     * @param data - data del email que se le va a enviar al administrador.
     * @returns {any}
     */
    postBusiness(data:any):any{
      return this._http.post(this._url + 'business', data);
    }

    /**
     * Hace el request a la API para enviar el email al usuario cuando postea su negocio/promoción.
     * @param data - data del email que se le va a enviar al usuario.
     * @returns {any}
     */
    sendEmailUserBusiness(data: any):any{
      return this._http.post(this._url + 'user/business', data);
    }
}
