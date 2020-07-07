import { ZoneService } from 'src/app/services/zone.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {


  constructor(private svc: ZoneService){

  }

  transform(value: any, arg: string, defaultFilt?:Boolean, zones?:Function): any {
    console.log(arg)
    console.log(zones)
    console.log(value)
    console.log("es filtro por default: "+defaultFilt)

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
            console.log("aaaaahhhhhh"+ post.location.zone + " " + name)
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
