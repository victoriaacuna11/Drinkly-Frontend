import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-required-field',
  templateUrl: './required-field.component.html',
  styleUrls: ['./required-field.component.scss']
})
export class RequiredFieldComponent implements OnInit {
  /**
   * Lo que mostrará cuando se detecte que el campo no pasó las validaciones.
   */
  @Input() text: String;
  constructor() { }

  ngOnInit() {
  }

}
