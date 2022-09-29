import { UsuarioService } from 'src/app/service/usuario-service/usuario.service';
import { User } from 'src/app/interface/usuario.interface';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-editar-usuario-dialog',
  templateUrl: './editar-usuario-dialog.component.html',
  styleUrls: ['./editar-usuario-dialog.component.scss']
})
export class EditarUsuarioDialogComponent implements OnInit {
  public form!:FormGroup

  constructor(
    public formbuilder:FormBuilder,
    public dialogRef: MatDialogRef<EditarUsuarioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:User ,
    public userService:UsuarioService
    ) { }

  ngOnInit(): void {
    this.form=this.formbuilder.group({
      id:['',[Validators.required]],
      nome:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required,Validators.email]),
      telefone:new FormControl('',[Validators.required])
    })

    this.form.controls['id'].setValue(this.data.id);
    this.form.controls['nome'].setValue(this.data.name);
    this.form.controls['email'].setValue(this.data.email);
    this.form.controls['telefone'].setValue(this.data.telefone);
  }

  updateElement(){
    this.data.id=this.form.controls['id'].value;
    this.data.name=this.form.controls['nome'].value;
    this.data.email=this.form.controls['email'].value;
    this.data.telefone=this.form.controls['telefone'].value;
    //console.log(this.data)
    this.dialogRef.close(this.data);
    this.form.reset()

  }
  onNoClick(): void {
    this.dialogRef.close();
    this.form.reset()
  }
}
