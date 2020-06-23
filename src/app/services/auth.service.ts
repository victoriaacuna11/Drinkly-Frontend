import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  authToken: any;
  user: any;
  aux2: any;
  admin: Boolean = false;
  _url = 'https://drinklyapi.herokuapp.com/api/user/';

  constructor(private http: HttpClient) {}

  //Registra un usuario. Sencillo.
  registerUser(user) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    // return this.http.post("http://localhost:5000/api/user/register", user, {
    //   headers: headers,
    // });
    return this.http.post(this._url+'register', user, {
      headers: headers,
    })
  }

  //Se usa en el login, este lleva a la ruta de autenticación en el backend en donde se encuentra toda la lógica de comparar
  //las contraseñas encriptadas
  authenticateUser(user) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    // return this.http.post("http://localhost:5000/api/user/authenticate", user, {
    //   headers: headers,
    // });
    return this.http.post(this._url+'authenticate', user, {
      headers: headers,
    })
  }

  //esto me trae el perfil que saco de la ruta profile, que está protegida y solo se puede acceder con el token.
  getProfile() {
    let headers: HttpHeaders = new HttpHeaders();
    this.loadToken();
    headers = headers.append("Authorization", this.authToken);
    headers = headers.append("Content-Type", "application/json");
    // return this.http.get("http://localhost:5000/api/user/profile", {
    //   headers: headers,
    // });
    return this.http.get(this._url+'profile', {
      headers: headers,
    })
    
  }

  //esto me trae el valor que saco de la ruta isAdmin, que está protegida y solo se puede acceder con el token.
  getAdmin() {
    let headers: HttpHeaders = new HttpHeaders();
    this.loadToken();
    headers = headers.append("Authorization", this.authToken);
    headers = headers.append("Content-Type", "application/json");
    // return this.http.get("http://localhost:5000/api/user/isAdmin", {
    //   headers: headers,
    // });
    return this.http.get(this._url+'isAdmin', {
      headers: headers,
    })
  }

  //si el login fue exitoso, esta función guarda el usuario y su token en local storage
  storeData(token, expiresIn) {
    localStorage.setItem("id_token", token);
    localStorage.setItem("expiresIn", expiresIn);
    //localStorage.setItem("user", JSON.stringify(user));
    this.authToken = token;
    //this.user = user;
  }

  //Borra lo que hay en local storage y nuestras variables
  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  //Me da el token que está en local storage
  loadToken() {
    if (!this.authToken) {
      this.authToken = localStorage.getItem("id_token");
    }
    return this.authToken;
  }

  //Ver si está loggeado y su sesión no ha expirado
  loggedIn() {
    if (localStorage.id_token == undefined) {
      console.log("Hello");
      return false;
    } else {
      console.log("Goodbye");
      const helper = new JwtHelperService();
      console.log(helper.isTokenExpired(localStorage.id_token));
      return !helper.isTokenExpired(localStorage.id_token);
    }
  }

  //ver si es administrador
  isAdministrator() {
    this.getAdmin().subscribe(
      (isAdmin) => {
        this.aux2 = isAdmin;
        this.admin = this.aux2.isAdmin;
        console.log("entro admin: " + this.admin);
        return true;
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }
}
