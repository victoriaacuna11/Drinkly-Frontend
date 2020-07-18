import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private messageSource = new BehaviorSubject('');
  currentMsg = this.messageSource.asObservable();

  constructor() { }

  /**
   * Cambia el mensaje al cual los componentes del header, lista de bares y lista de tragos están suscritos. Este mensaje
   * es lo que se escribe en el input buscador, y se implementó de esta manera para que el filtro realizara los cambios
   * instantáneamente en ambos componentes cada vez que el mensaje cambia
   * @param {string} m el nuevo mensaje
   */
  changeMsg(m: string){
    this.messageSource.next(m)
  }
}
