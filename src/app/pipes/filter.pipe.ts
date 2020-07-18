import { ZoneService } from 'src/app/services/zone.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {


  constructor(private svc: ZoneService){}


  /**
   * Método del pipe que modifica el array que se muestra en las listas de bares y tragos, para mostrar solo aquellos
   * que coinciden con lo escrito en el input buscador
   * @param {any} value todos los elementos del array a filtrar
   * @param {string} arg el string escrito en el input, que se compara con value
   * @param {boolean} defaultFilt indica si se está filtrando por nombre o por zona
   * @param {any} zones todas las zonas de la base de datos
   * @returns {Array.<any>} el array de tragos o bares que hacen coincidencia con lo escrito en el input
   */
  transform(value: any, arg: string, defaultFilt?:Boolean, zones?:any): any {

    const resultPosts = [];
    if(defaultFilt){
      for(const post of value){
        let name = '';
        let found = false;
        let i=0;
        while(!found && i<zones.length){
          if(zones[i]._id==post.location.zone){
            found = true;
            name = zones[i].name.toString();
            // console.log("aaaaahhhhhh"+ post.location.zone + " " + name)
            if(name.toLowerCase().indexOf(arg.toLowerCase())>-1){
              resultPosts.push(post)
            }
          }
         i=i+1;
       }
      }
    }
    else{
      for(const post of value){
        if(post.name.toLowerCase().indexOf(arg.toLowerCase())>-1){
          resultPosts.push(post)
        }
      }      
    }

    
    return resultPosts;
  }

}
