import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-uploading-loader',
  templateUrl: './uploading-loader.component.html',
  styleUrls: ['./uploading-loader.component.scss']
})
export class UploadingLoaderComponent implements OnInit {
  /**
   * El texto que acompaña al loader.
   */
  @Input() text;
  constructor() { }

  ngOnInit() {
  }

}
