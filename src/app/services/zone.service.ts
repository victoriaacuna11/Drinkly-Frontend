import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { zone } from '../models/zone';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  _url = 'https://drinklyapi.herokuapp.com/api/zone';
  // _url = 'http://localhost:5000/api/zone/';
  constructor(private _http: HttpClient) { }

  getZones() {
    return this._http.get(this._url);
  }

  postZone(zone: zone){
    console.log(zone);
    return this._http.post(this._url+'add', zone);
  }

  deleteZone(id){
    console.log(id);
    return this._http.delete(this._url+'delete/'+id);
  }

  getZone(id){
    // console.log(id);
    return this._http.get(this._url+id);
  }

  updateZone(zone : zone){
    return this._http.put(this._url+'update/'+zone._id, zone);
  }


}
