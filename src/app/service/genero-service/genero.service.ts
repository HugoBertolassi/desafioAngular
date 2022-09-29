import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneroInterface } from 'src/app/interface/genero.interface';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {
  private listaGenero:any;
  private url="http://localhost:3000/genero";
  loading: any;

  constructor(
    private httpClient:HttpClient
  ) { }

  get Generos(){
    return this.listaGenero
  }

  set Generos(genero:GeneroInterface){
    this.listaGenero.push(genero)
  }

  lerGeneros():Observable<GeneroInterface[]>{
    return this.httpClient.get<GeneroInterface[]>(this.url)
  }

  lerGenerosById(id:Number):Observable<GeneroInterface>{
    return this.httpClient.get<GeneroInterface>(`${this.url}/${id}`)
  }

  salvargenero(objeto:GeneroInterface):Observable<GeneroInterface>{
    return this.httpClient.post<GeneroInterface>(this.url,objeto)
  }

  excluirgenero(id:Number):Observable<GeneroInterface>{
    return this.httpClient.delete<GeneroInterface>(`${this.url}/${id}`)
  }

  updategenero(objeto:GeneroInterface):Observable<GeneroInterface>{
    let endpoint=objeto.id;
    console.log(`${this.url}/${endpoint}`,objeto)
    return this.httpClient.put<GeneroInterface>(`${this.url}/${endpoint}`,objeto)
  }
}
