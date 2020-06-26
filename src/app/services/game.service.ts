import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { game } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  // _url='http://localhost:5000/api/game/';
  _url = 'https://drinklyapi.herokuapp.com/api/game/';

  constructor(
    private _http: HttpClient
  ) { }

  getGames() {
    return this._http.get(this._url);
  }

  postGame(item: game){
    return this._http.post(this._url+'add', item);
  }

  deleteGame(id){
    console.log(id);
    return this._http.delete(this._url+'delete/'+id);
  }

  getGame(id){
    return this._http.get(this._url+id);
  }

  updateGame(item : game){
    return this._http.put(this._url+'update/'+item._id, item);
  }
}
