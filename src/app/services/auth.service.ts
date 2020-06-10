import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: HttpClient) {}

  //Registra un usuario. Sencillo.
  registerUser(user) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    return this.http.post("http://localhost:5000/api/user/register", user, {
      headers: headers,
    });
  }

  //Se usa en el login, este lleva a la ruta de autenticación en el backend en donde se encuentra toda la lógica de comparar
  //las contraseñas encriptadas
  authenticateUser(user) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    return this.http.post("http://localhost:5000/api/user/authenticate", user, {
      headers: headers,
    });
  }

  //esto me trae el perfil que saco de la ruta profile, que está protegida y solo se puede acceder con el token.
  getProfile() {
    let headers: HttpHeaders = new HttpHeaders();
    this.loadToken();
    headers = headers.append("Authorization", this.authToken);
    headers = headers.append("Content-Type", "application/json");
    return this.http.get("http://localhost:5000/api/user/profile", {
      headers: headers,
    });
  }

  //si el login fue exitoso, esta función guarda el usuario y su token en local storage
  storeData(token, user) {
    localStorage.setItem("id_token", token);
    localStorage.setItem("user", JSON.stringify(user));
    this.authToken = token;
    this.user = user;
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

  isAdmin() {
    this.user = JSON.parse(localStorage.getItem("user"));
    console.log(this.user.isAdmin);
    if (this.user.isAdmin) {
      console.log("Puedes pasar administrador.");
      return true;
    } else {
      console.log("Debes ser administrador.");
      return false;
    }
  }
}
