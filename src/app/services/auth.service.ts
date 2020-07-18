import { Observable } from 'rxjs';
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
  // _url = 'http://localhost:5000/api/user/';

  constructor(private http: HttpClient) {}

  /**
   * Lleva a la ruta de registro en el backend para registrar a un nuevo usuario en la base de datos.
   * @param {any} user el usuario a ser registrado
   * @returns {Observable<Object>} La respuesta, que puede ser de éxito con el token y su tiempo de expiración, 
   * o de fracaso con un mensaje de error
   */
  registerUser(user: any):Observable<Object> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    return this.http.post(this._url+'register', user, {
      headers: headers,
    })
  }

  /**
   * Lleva a la ruta de autenticación en el backend, en donde verifica si el usuario está en la base de datos y la contraseña
   * es correcta. Se usa en el componente de login
   * @param {any} user el usuario a autenticar
   * @returns {Observable<Object>} La respuesta, que puede ser de éxito con el token y su tiempo de expiración, 
   * o de fracaso con un mensaje de error
   */
  authenticateUser(user: any): Observable<object> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    return this.http.post(this._url+'authenticate', user, {
      headers: headers,
    })
  }

  //esto me trae el perfil que saco de la ruta profile, que está protegida y solo se puede acceder con el token.

  /**
   * Lleva a la ruta profile en el backend, que me trae el perfil del usuario que está logueado. Esta ruta está protegida y 
   * solo traerá la información si se le pasa el token correcto
   * @returns {Observable<Object>} La respuesta, que es el usuario
   */
  getProfile(): Observable<object> {
    let headers: HttpHeaders = new HttpHeaders();
    this.loadToken();
    headers = headers.append("Authorization", this.authToken);
    headers = headers.append("Content-Type", "application/json");
    return this.http.get(this._url+'profile', {
      headers: headers,
    })   
  }


  /**
   * Lleva a la ruta del backend que me indica si un usuario es administrador, usado para los guards. Esta ruta está protegida y 
   * solo traerá la información si se le pasa el token correcto
   * @returns {Observable<Object>} La respuesta, que trae un true si es administrador y un false si no
   */
  getAdmin(): Observable<object> {
    let headers: HttpHeaders = new HttpHeaders();
    this.loadToken();
    headers = headers.append("Authorization", this.authToken);
    headers = headers.append("Content-Type", "application/json");
    return this.http.get(this._url+'isAdmin', {
      headers: headers,
    })
  }

  /**
   * Lleva a la ruta del backend que me proporciona la contraseña de un usuario. Esta ruta está protegida y 
   * solo traerá la información si se le pasa el token correcto
   * @returns {Observable<string>} La respuesta, que trae la contraseña encriptada del usuario
   */
  getPassword(): Observable<string>{
    let headers: HttpHeaders = new HttpHeaders();
    this.loadToken();
    headers = headers.append("Authorization", this.authToken);
    return this.http.get(this._url + 'updateP', {
      headers: headers, responseType: 'text'
    });
  }

  //si el login fue exitoso, esta función guarda el usuario y su token en local storage

  /**
   * Guarda el token y el tiempo de expiración de la sesión en local storage, una vez que el login o register fue exitoso
   * @param {string} token el token que se crea al registrarse/loguearse
   * @param {string} expiresIn el tiempo de expiración
   * @returns {void}
   */
  storeData(token: string, expiresIn: string): void {
    localStorage.setItem("id_token", token);
    localStorage.setItem("expiresIn", expiresIn);
    this.authToken = token;
  }

  /**
   * Borra lo que hay en local storage y las variables locales
   */
  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  /**
   * Recibo el token de local storage y lo asigno a la variable local
   * @returns {any} el token
   */
  loadToken(): any {
    if (!this.authToken) {
      this.authToken = localStorage.getItem("id_token");
    }
    return this.authToken;
  }

  /**
   * Revisa si un usuario está logueado y su sesión no ha expirado
   * @returns {boolean} true si está logueado, false si no
   */
  loggedIn(): boolean {
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

  /**
   * @ignore
   */
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
