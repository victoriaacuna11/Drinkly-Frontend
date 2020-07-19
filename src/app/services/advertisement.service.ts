import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { advertisement } from "../models/advertisement";

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {
  /**
   * url del backend
   */
  _url = "https://drinklyapi.herokuapp.com/api/adver/";
  // _url = "http://localhost:5000/api/adver/";


  constructor(private _http:HttpClient) { }
  /**
   * metodo que crea un advertisement
   * @param item advertisement a crear
   * @returns request post
   */
  createAd(item) {
    return this._http.post(this._url + "add/", item);
  }
/**
 * metodo que actualiza la foto de un advertisement
 * @param file foto
 * @param id id del ad a editar
 * @returns request put
 */
  updateAdPhoto(file, id) {
    return this._http.put(this._url + "update/photo/" + id, file);
  }
/**
 * metodo que trae todos los advertisements de la base de datos
 * @returns get de los advertisements
 */
  getAds() {
    return this._http.get(this._url);
  }
/**
 * Metodo que retorna un advertisement especifico de la base de datos
 * @param id id de advertisemetn especifico a traer
 * @returns get del advertisement especifico
 */
  getAd(id) {
    return this._http.get(this._url + id);
  }
/**
 * Metodo que borra un advertisement
 * @param id id del advertisement a borrar
 * @returns delete request del ad
 */
  deleteAd(id) {
    return this._http.delete(this._url + "delete/" + id);
  }
/**
 * Metodo que edita un advertisement
 * @param ad advertisemet a editar
 * @returns pu request del advertisement
 */
  updateAd(ad: advertisement) {
    return this._http.put(this._url + "update/" + ad._id, ad);
  }
}
