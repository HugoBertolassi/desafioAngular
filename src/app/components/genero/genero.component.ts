import { GeneroService } from './../../service/genero-service/genero.service';
import { GeneroInterface } from 'src/app/interface/genero.interface';
import { Component, OnInit,Input, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';


import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { EditarGeneroDialogComponent } from 'src/app/view/editar-genero-dialog/editar-genero-dialog.component';
import { GeralService } from 'src/app/service/geral-service/geral.service';


//dados mattable
// export interface Movie {
//   id_genero:string;
//   genero: string;
// }
// let ELEMENT_DATA: Movie[] = [
//   {id_genero: '1',genero:'Terror'} ,
//   {id_genero: '2',genero:'Drama'},
//   {id_genero: '3',genero:'Comedia'}
// ];


@Component({
  selector: 'app-genero',
  templateUrl: './genero.component.html',
  styleUrls: ['./genero.component.scss']
})
export class GeneroComponent implements OnInit {
  titulo="Cadastre os gêneros dos filmes";
  dataSource!:MatTableDataSource<GeneroInterface>;
  generos:GeneroInterface[]=[];
  indexTable:number=0;
  public formGenero!:FormGroup;
  loading=this.geralService.loading;

  constructor(
    private formBuilder:FormBuilder,
    private generoService:GeneroService,
    public dialog: MatDialog,
    private geralService:GeralService

  ) { }

  ngOnInit(): void {
    this.generoService.lerGeneros().subscribe({
      next:(generos:GeneroInterface[])=>{
        this.generos=generos;
        this.atualizaTable();
      },
      error:()=>{
        console.log("erro ao importar generos");
      }
    })

    this.formGenero=this.formBuilder.group({
      generoForm:new FormControl('',[Validators.required])
    })
  }


 //codigo mattable
 displayedColumns: string[] = ['genero','botao'];


 applyFilter(event: Event) {
   const filterValue = (event.target as HTMLInputElement).value;
   this.dataSource.filter = filterValue.trim().toLowerCase();
   if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
    }
 }
 @ViewChild(MatPaginator) paginator!: MatPaginator
 ngAfterViewInit() {
   this.dataSource.paginator = this.paginator;
 }
 atualizaTable(){
  this.dataSource = new MatTableDataSource(this.generos);//atualizar a tabelathis.dataSource = new MatTableDataSource(this.usuarios);//atualizar a tabela
  this.indexTable=this.generos.length;
  this.ngAfterViewInit()
}
//////////////////////////////////////////////
//funcao CRUD
salvarGenero(){
    this.geralService.showLoading()
    //const id=this.generos[(this.generos.length)-1].id+1;
    const id=this.nextID()
    const genero:GeneroInterface={
      id: id,
      genero:this.formGenero.controls['generoForm'].value,
    }

    this.generoService.salvargenero(genero).subscribe({
      next:()=> {//nao precisa pegar parametro poque o metodo ja faz isso

        this.ngOnInit()
        this.geralService.hideLoading()
      },
      error:()=>{
        console.log('falha')
        this.geralService.hideLoading()
      }
    })
}
editarGenero(id:number){
this.openDialog(id);
}


excluirGenero(id:number){
  this.geralService.showLoading()
  this.generoService.excluirgenero(id).subscribe({
    next:()=>{
      console.log("excluiu");
      this.ngOnInit();
      this.geralService.hideLoading()
    },
    error:()=>{
      console.log("erro ao excluir");
      this.geralService.hideLoading()
    }
  })
}

////Dialog
openDialog(id:number): void {
  let enterAnimationDuration="200ms";
  let exitAnimationDuration:"200ms"

 this.generoService.lerGenerosById(id).subscribe({ //pegar bolo
   next:(element:GeneroInterface)=>{
     //abir o dialog
     const dialogRef = this.dialog.open(EditarGeneroDialogComponent, {
       width: '30%',
       enterAnimationDuration,
       exitAnimationDuration,
       data:{id:element.id,genero:element.genero}
     });

     //receber fechamento do dialog
     dialogRef.afterClosed().subscribe(element => {
      if(element){//tratamento de erro de retrno do close sem dados
        this.geralService.showLoading()
        this.generoService.updategenero(element).subscribe({
          next:()=>{
             this.ngOnInit();
             this.geralService.hideLoading();
          },
          error:()=>{
             alert("Erro ao salvar genero")
             this.geralService.hideLoading();
          }
        })
      }
    })
  },
  error:()=>{
     console.log("erro ao editar genero");
  }
 })

}


nextID(){
  let maiorid=0

  for(let i=0;i<this.generos.length;i++){
    if(Number(this.generos[i].id)> maiorid){
      maiorid=Number(this.generos[i].id)
    }
  }
  maiorid++

  return (maiorid)
}

//codigo de gravacao em arquivo local// sera utilizado api en json
//////////////////////////////////////////////////////////////////////
 //codigo input
//  generoFormControl = new FormControl('', [
//     Validators.required
//   ]);

//   public editarGenero(id:string){
//     console.log(id)
//   }

//   public adicionarGenero(id_genero:string,_genero: string){
//     //let genero1=_genero as genero;
//     // this.generoFormControl.value;
//     let genero=this.generoFormControl.value as string;
//     console.log(this.generoFormControl.value)
//     let elemento:Movie={id_genero,genero}
//      ELEMENT_DATA.push(elemento);
//      console.log(ELEMENT_DATA)
//   }


}
