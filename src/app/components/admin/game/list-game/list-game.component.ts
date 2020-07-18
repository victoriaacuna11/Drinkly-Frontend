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

  /**
   * Juegos que se encuentran en la DB.
   */
  games: game[];
  /**
   * Loader (maneja si la información ya se trajo o no de la DB)
   */
  loading:Boolean=true;
  /**
   * Boolean que maneja el responsive del sidebar.
   */
  sidebar: Boolean;

  constructor(
    private service: GameService,
    private route: Router,
  ) { }

  ngOnInit() {
    this.getGames();
  }

  /**
   * Trae los juegos que se encuentran en la DB.
   * @returns {void}
   */
  getGames(): void{
    this.service.getGames().subscribe((res:any) => {
      this.games = [...res.data];
      this.loading=false;
    })
  }

  /**
   * @ignore
   */
  delete(id) {
    this.service.deleteGame(id).subscribe((res) => {
      this.getGames();
    });
  }

  /**
   * Inhabilita/Habilita un juego.
   * @param {game} item -game que se va a deshabilitar.
   * @returns {void}
   */
  inhabilitate(item:game):void {
    let newItem: game = item;
    newItem.available=!item.available;
    this.service.updateGame(newItem).subscribe(res => {
      this.getGames();
    })
  }

  /**
   * Navega a la ruta donde se puede editar un juego específico.
   * @param {any} id - id del juego que se editará.
   * @returns {void}
   */
  edit(id:any):void {
    this.route.navigate(["admin/game/edit/", id]);
  }

  /**
   * @ignore
   */
  create():void{
    this.route.navigate(["admin/game/add"]);
  }

  getMessage($event){
    if(screen.width>640){
      this.sidebar = $event;
    }
  }

  /**
   * Navega al home de admin.
   * @returns {void}
   */
  goBack():void{
    this.route.navigate(["admin"]);
  }

}
