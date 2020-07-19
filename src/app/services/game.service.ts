import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { game } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  // _url='http://localhost:5000/api/game/';
  /**
   * Guarda el url de la api donde sacará la información.
   */
  _url = 'https://drinklyapi.herokuapp.com/api/game/';

  constructor(
    private _http: HttpClient
  ) { }

  /**
   * Hace el request a la api para obtener los juegos de la DB.
   * @returns {any}
   */
  getGames():any {
    return this._http.get(this._url);
  }

  /**
   * 
   * @ignore
   */
  postGame(item: game):any{
    return this._http.post(this._url+'add', item);
  }

  /**
   * Hace el request a la api para eliminar el juego.
   * @param {String} id - id del juego.
   * @returns {any}
   */
  deleteGame(id:String):any{
    console.log(id);
    return this._http.delete(this._url+'delete/'+id);
  }

  /**
   * Hace el request a la api para obtener los datos de un juego.
   * @param {String} id - id del juego.
   * @returns {any}
   */
  getGame(id:String):any{
    return this._http.get(this._url+id);
  }

  /**
   * Hace el request a la api para actualizar el juego.
   * @param {game} game - jueho con los datos actualizados.
   * @returns {any}
   */
  updateGame(item : game):any{
    return this._http.put(this._url+'update/'+item._id, item);
  }
}
