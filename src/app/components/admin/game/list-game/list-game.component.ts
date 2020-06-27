import { Component, OnInit } from '@angular/core';
import { game } from 'src/app/models/game';
import { GameService } from 'src/app/services/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-game',
  templateUrl: './list-game.component.html',
  styleUrls: ['./list-game.component.scss']
})
export class ListGameComponent implements OnInit {

  games: game[];
  loading:Boolean=true;
  sidebar: Boolean;

  constructor(
    private service: GameService,
    private route: Router,
  ) { }

  ngOnInit() {
    this.getGames();
  }

  getGames(){
    this.service.getGames().subscribe((res:any) => {
      this.games = [...res.data];
      this.loading=false;
    })
  }

  delete(id) {
    this.service.deleteGame(id).subscribe((res) => {
      this.getGames();
    });
  }

  inhabilitate(item:game) {
    let newItem: game = item;
    newItem.available=!item.available;
    this.service.updateGame(newItem).subscribe(res => {
      this.getGames();
    })
  }


  edit(id) {
    this.route.navigate(["admin/game/edit/", id]);
  }

  create(){
    this.route.navigate(["admin/game/add"]);
  }

  getMessage($event){
    this.sidebar = $event;
  }

}
