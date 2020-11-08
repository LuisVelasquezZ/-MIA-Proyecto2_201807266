import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PaisService } from 'src/app/services/pais/pais.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  registroForm: FormGroup;
  selectedFile: File;
  fileName: string = "image.jpg";
  uniquefilename : String = "";
  fecha : string  = "";
  paises: any[] = [];
  usuario: any = { idUsuario: null, nombre: '', apellido: '', correo: '', pass: '', tipo: '', pais: '', foto: '' }
  constructor(private fb: FormBuilder, private usuarioService: UsuarioService,
    private router: Router, private paisService: PaisService) { }

  ngOnInit(): void {
    this.getPaises();
    this.registroForm = this.fb.group({
      nombre: new FormControl(this.usuario.nombre, Validators.required),
      apellido: new FormControl(this.usuario.apellido, Validators.required),
      correo: new FormControl(this.usuario.correo, Validators.required),
      pass: new FormControl(this.usuario.pass, Validators.required),
      pais: new FormControl(this.usuario.pais, Validators.required),
      foto: new FormControl(this.usuario.pais, Validators.required)
    });
  }

  agregarUsuario() {
    const md5 = new Md5();
    const usuarioNuevo = {
      nombre: this.registroForm.get('nombre').value,
      apellido: this.registroForm.get('apellido').value,
      correo: this.registroForm.get('correo').value,
      pass: md5.appendStr(this.registroForm.get('pass').value).end(),
      pais: this.registroForm.get('pais').value,
      foto:this.fecha.concat(this.fileName)
    }
    this.usuarioService.crearUsuario(usuarioNuevo).then(() => {
      if (this.fileName != "image.jpg") {
        this.usuarioService.subirarchivo(this.selectedFile, this.fecha);
      }
      this.router.navigate(['/login']);
    });
  }

  private getPaises() {
    this.paisService.getPaises().then((response: any) => {
      this.paises = response.map((course) => {
        return course;
      });
    });
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    this.fileName = this.selectedFile.name;
    let hora = Date.now();
    this.fecha = hora.toString();
    this.uniquefilename.concat(this.fecha,this.fileName) ;    
  }


}
