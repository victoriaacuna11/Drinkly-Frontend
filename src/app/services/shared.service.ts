import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private messageSource = new BehaviorSubject('');
  currentMsg = this.messageSource.asObservable();

  constructor() { }

  changeMsg(m: string){
    this.messageSource.next(m)
  }
}
