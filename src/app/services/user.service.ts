import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { user } from "../models/user";

@Injectable({
  providedIn: "root",
})
export class UserService {
  // _url = "http://localhost:5000/api/user/";
  _url = "https://drinklyapi.herokuapp.com/api/user/";

  constructor(private _http: HttpClient) {}

  getUsers() {
    return this._http.get(this._url);
  }

  getUser(id) {
    return this._http.get(this._url + id);
  }

  deleteUser(id) {
    return this._http.delete(this._url + "delete/" + id);
  }

  updateUser(user: user) {
    return this._http.put(this._url + "update/" + user._id, user);
  }

  updatePassword(user: user){
    return this._http.put(this._url + "updateP/" + user._id, user);
  }
}
