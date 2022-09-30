import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeralService {
  private _loading =new BehaviorSubject<boolean>(false);
  public readonly loading=this._loading.asObservable()

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


  //loading
  showLoading(){
    this._loading.next(true)
  }
  hideLoading(){
    this._loading.next(false)
  }
}
