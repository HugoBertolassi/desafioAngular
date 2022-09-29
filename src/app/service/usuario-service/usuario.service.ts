import { User } from './../../interface/usuario.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private listaUsuario:any;
  private url="http://localhost:3000/usuario";
  loading: any;
  //private usuario:UsuarioInterface;

  constructor(private httpClient:HttpClient ) {
    this.listaUsuario=[]
  }

  get usuarios(){
    return this.listaUsuario
  }

  set usuarios(usuario:User){
    this.listaUsuario.push(usuario)
  }

  lerUsuarios():Observable<User[]>{
    return this.httpClient.get<User[]>(this.url)
  }

  lerUsuariosById(id:Number):Observable<User>{
    return this.httpClient.get<User>(`${this.url}/${id}`)
  }

  salvarUsuario(objeto:User):Observable<User>{
    return this.httpClient.post<User>(this.url,objeto)
  }

  excluirUsuario(id:Number):Observable<User>{
    return this.httpClient.delete<User>(`${this.url}/${id}`)
  }

  updateUsuario(objeto:User):Observable<User>{
    let endpoint=objeto.id;
    //console.log(`${this.url}/${endpoint}`,objeto)
    return this.httpClient.put<User>(`${this.url}/${endpoint}`,objeto)
  }

}




