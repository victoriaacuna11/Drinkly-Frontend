import { SharedService } from './../../services/shared.service';

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() hasSearchBar : Boolean;
  @Input() searchBarContent : String;
  @Output() filt = new EventEmitter<string>();
  @Input() arr: any[];
  touched = false;
  filterPost= '';
  

  constructor(private data: SharedService) { }

  ngOnInit() {
    this.data.currentMsg.subscribe(m => this.filterPost=m)
  }

  makeChange(){
    this.touched=true;
    this.data.changeMsg((<HTMLInputElement>document.getElementById("search")).value) 
   }

   showDrop(){
     this.touched = !this.touched;
   }

  //  getSearchValue(){
  //    return (<HTMLInputElement>document.getElementById("search")).value;
  //  }

   newMessage(i){
     console.log(i)
     this.data.changeMsg(i)
     this.touched=false;
   }

   pressEnter(){
    this.touched=false;
    (<HTMLInputElement>document.getElementById("search")).blur();
    
   }

  //  search(i){
  //    this.filt.emit(i)
  //  }

}
