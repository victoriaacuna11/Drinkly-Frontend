import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SendMailService {

  _url = 'https://drinklyapi.herokuapp.com/api/sendmail/';
  // _url = 'http://localhost:5000/api/sendmail/';

  constructor(
    private _http: HttpClient
    ) { 

    }

    sendEmailUser(data: any){
      return this._http.post(this._url+'user', data);
    }

    postRecipe(data:any){
      return this._http.post(this._url+'recipe', data);
    }
}
