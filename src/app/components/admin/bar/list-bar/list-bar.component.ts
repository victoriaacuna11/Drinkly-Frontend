import { Component, OnInit } from '@angular/core';
import { BarService } from 'src/app/services/bar.service';
import { Bar } from 'src/app/models/bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-bar',
  templateUrl: './list-bar.component.html',
  styleUrls: ['./list-bar.component.scss']
})
export class ListBarComponent implements OnInit {
  
  loading: Boolean = true;
  bars: Bar[];
  constructor(private service: BarService, private route: Router) { }

  ngOnInit() {
    this.getBars();
  }

  getBars(){
    this.service.getBars().subscribe((res:any) => {
      this.bars= [... res.data];
      this.loading=false;
    })
  }

  isAssociated(associate: Boolean){
    if(associate){
      return 'Socio';
    } else {
      return 'No socio';
    }
  }

  inhabilitate(bar: Bar){
    let newBar: Bar = bar;
    newBar.available=!bar.available;
    this.service.updateBar(newBar).subscribe(res => {
      this.getBars();
    })
  }

  delete(id){
    this.service.deleteBar(id).subscribe(res => {
      this.getBars();
    })
  }

  edit(id){
    this.route.navigate(['admin/bar/edit/', id]);
  }

  create(){
    this.route.navigate(["admin/bar/add"]);
  }
}