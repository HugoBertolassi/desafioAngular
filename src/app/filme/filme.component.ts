import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';




//dados mattable
export interface Movie {
  id_filme:string;
  movie: string;
  genero:string;
}
const ELEMENT_DATA: Movie[] = [
  {id_filme: '1', movie: 'Paulo Andre',genero:'terror'} ,
  {id_filme: '2', movie: 'Toy Store',genero:'terror'} 
];




@Component({
  selector: 'app-filme',
  templateUrl: './filme.component.html',
  styleUrls: ['./filme.component.scss']
})
export class FilmeComponent implements OnInit {

  constructor() { }
  titulo="Cadastre os filmes de sua preferência"
  ngOnInit(): void {
  }

  //Opcoes de genero
  generos: string[] = [
    'Terror', 'CComedia', 'Drama'
  ];
 //codigo mattable
 displayedColumns: string[] = ['movie','genero','botao'];
 dataSource = new MatTableDataSource(ELEMENT_DATA);

 applyFilter(event: Event) {
   const filterValue = (event.target as HTMLInputElement).value;
   this.dataSource.filter = filterValue.trim().toLowerCase();
   console.log("filter")
 }

  //codigo input
  textFieldFormControl = new FormControl('', [
    Validators.required
  ]);
}
