import { Component, OnInit, Input } from '@angular/core';
import {Bar} from './../../models/bar';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() barOrDrink: object[];

  constructor() { }

  ngOnInit() {
  }

}
