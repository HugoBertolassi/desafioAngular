import { FilmeInterface } from './../../interface/filme.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilmeService {

  private listaFilme:any;
  private url="http://localhost:3000/filme";
  loading: any;

  constructor(
    private httpClient:HttpClient
  ) { }

  get filmes(){
    return this.listaFilme
  }

  set filmes(filme:FilmeInterface){
    this.listaFilme.push(filme)
  }

  lerFilmes():Observable<FilmeInterface[]>{
    return this.httpClient.get<FilmeInterface[]>(this.url)
  }

  lerFilmesById(id:Number):Observable<FilmeInterface>{
    return this.httpClient.get<FilmeInterface>(`${this.url}/${id}`)
  }

  salvarFilme(objeto:FilmeInterface):Observable<FilmeInterface>{
    return this.httpClient.post<FilmeInterface>(this.url,objeto)
  }

  excluirFilme(id:Number):Observable<FilmeInterface>{
    return this.httpClient.delete<FilmeInterface>(`${this.url}/${id}`)
  }

  updateFilme(objeto:FilmeInterface):Observable<FilmeInterface>{
    let endpoint=objeto.id;
    console.log(`${this.url}/${endpoint}`,objeto)
    return this.httpClient.put<FilmeInterface>(`${this.url}/${endpoint}`,objeto)
  }
}
