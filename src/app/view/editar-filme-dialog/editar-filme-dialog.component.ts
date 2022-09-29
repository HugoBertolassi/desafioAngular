import { GeneroService } from './../../service/genero-service/genero.service';
import { FilmeGenero } from './../../components/filme/filme.component';
import { FilmeService } from './../../service/filme-service/filme.service';
import { FilmeInterface } from './../../interface/filme.interface';
import { AfterContentInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GeneroInterface } from 'src/app/interface/genero.interface';


@Component({
  selector: 'app-editar-filme-dialog',
  templateUrl: './editar-filme-dialog.component.html',
  styleUrls: ['./editar-filme-dialog.component.scss']
})
export class EditarFilmeDialogComponent implements OnInit{
  public form!:FormGroup
  genda!:GeneroInterface[];

  constructor(
    public formbuilder:FormBuilder,
    public dialogRef: MatDialogRef<EditarFilmeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:FilmeGenero,
    public filmeService:FilmeService,
    private generoService:GeneroService,
    ) {
     }

  ngOnInit(): void {
    console.log(this.data)
    this.form=this.formbuilder.group({
      id: new FormControl('',[Validators.required]),
      filme:new FormControl('',[Validators.required]),
      genderSelect: new FormControl('',[Validators.required])
    })

    this.generoService.lerGeneros().subscribe({
      next:(objects:GeneroInterface[])=>{
        this.genda=objects;
        console.log(this.genda)
      },
      error:()=>{
        console.log('Erro ao listar filme')
      }
    })


    this.form.controls['id'].setValue(this.data.id);
    this.form.controls['filme'].setValue(this.data.nome);
    this.form.controls['genderSelect'].setValue(this.data.id_genero);
  }

  updateElement(){
    console.log("dialogUpdate")
    this.data.id=this.form.controls['id'].value;
    this.data.nome=this.form.controls['filme'].value;
    this.data.id_genero=this.form.controls['genderSelect'].value;
    //this.dialogRef.close();
    this.dialogRef.close(this.data);
    this.form.reset()
  }
  onNoClick(): void {
    this.dialogRef.close();
    this.form.reset()
  }
}
