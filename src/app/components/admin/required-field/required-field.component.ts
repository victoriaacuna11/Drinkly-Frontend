import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-required-field',
  templateUrl: './required-field.component.html',
  styleUrls: ['./required-field.component.scss']
})
export class RequiredFieldComponent implements OnInit {
  @Input() text: String;
  constructor() { }

  ngOnInit() {
  }

}
