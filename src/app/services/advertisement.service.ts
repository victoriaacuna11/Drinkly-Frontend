import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { advertisement } from "../models/advertisement";

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {
  //_url = "https://drinklyapi.herokuapp.com/api/adver/";
  _url = "http://localhost:5000/api/adver/";


  constructor(private _http:HttpClient) { }
  
  createAd(item) {
    return this._http.post(this._url + "add/", item);
  }

  updateAdPhoto(file, id) {
    return this._http.put(this._url + "update/photo/" + id, file);
  }

  getAds() {
    return this._http.get(this._url);
  }

  getAd(id) {
    return this._http.get(this._url + id);
  }

  deleteAd(id) {
    return this._http.delete(this._url + "delete/" + id);
  }

  updateAd(ad: advertisement) {
    return this._http.put(this._url + "update/" + ad._id, ad);
  }
}
