import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeralService {

  constructor() { }

  nextID(objects:Object[]){
    let maiorid=0
    console.log(objects.length)
    for(let i=0;i<objects.length;i++){
      if(Number(objects[i])> maiorid){
        maiorid=Number(objects[i])
      }
    }
    maiorid++
    console.log(maiorid)
    return (maiorid).toString()
  }
}
