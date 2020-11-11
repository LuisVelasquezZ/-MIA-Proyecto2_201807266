import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { PaisService } from 'src/app/services/pais/pais.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  usuario: any
  perfilForm: FormGroup;
  rutaimg: string = "";
  selectedFile: File;
  fileName: string = "";
  uniquefilename: String = "";
  fecha: string = "";
  paises: any[] = [];
  paisnot: string = "";
  passnot: string = "";
  usuarios: any[] = [];
  //usuario: any = { idUsuario: null, nombre: '', apellido: '', correo: '', pass: '', tipo: '', pais: '', foto: '' }
  constructor(private fb: FormBuilder, private usuarioService: UsuarioService,
    private router: Router, private paisService: PaisService, private loginService: LoginService) { }


  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      correo: new FormControl('', Validators.required),
      pass: new FormControl('', Validators.required),
      pais: new FormControl('', Validators.required),
      foto: new FormControl('', Validators.required),
      creditos: new FormControl('', Validators.required)
    });
    this.usuarioService.getUsuario(JSON.parse(localStorage.getItem("usuario")).idusuario).then((response: any) => {
      //console.log(response);
      this.usuario = response[0];
      this.fileName = this.usuario.foto;
      this.rutaimg = 'http://192.168.1.8:3000/' + this.usuario.foto;
      this.getPaises();
      this.perfilForm = this.fb.group({
        nombre: new FormControl(this.usuario.nombre, Validators.required),
        apellido: new FormControl(this.usuario.apellido, Validators.required),
        correo: new FormControl(this.usuario.correo, Validators.required),
        pass: new FormControl('', Validators.required),
        pais: new FormControl('', Validators.required).setValue(this.usuario.pais),
        foto: new FormControl('', Validators.required),
        creditos: new FormControl(this.usuario.creditos, Validators.required)
      });
    })
    //this.usuario = JSON.parse(localStorage.getItem("usuario"));

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
    this.uniquefilename.concat(this.fecha, this.fileName);
  }

  editarUsuario() {
    const md5 = new Md5();
    if (this.perfilForm.get('pais').value == null) {
      this.paisnot = this.usuario.pais;
    } else {
      this.paisnot = this.perfilForm.get('pais').value;
    }
    if (this.perfilForm.get('pass').value == "") {
      this.passnot = this.usuario.pass;
    } else {
      this.passnot = md5.appendStr(this.perfilForm.get('pass').value).end().toString();
    }
    const usuarioNuevo = {
      idusuario: this.usuario.idusuario,
      nombre: this.perfilForm.get('nombre').value,
      apellido: this.perfilForm.get('apellido').value,
      correo: this.perfilForm.get('correo').value,
      pass: this.passnot,
      pais: this.paisnot,
      foto: this.fecha.concat(this.fileName)
    }
    this.usuarioService.actualizarUsuario(usuarioNuevo).then(() => {
      if (this.fileName != this.usuario.foto) {
        this.usuarioService.subirarchivo(this.selectedFile, this.fecha);
      }
      this.loginService.loginUsuario(usuarioNuevo).then((response: any) => {
        this.usuarios = response.map((u) => {
          return u;
        });
        if (this.usuarios.length >= 1) {
          this.usuario = this.usuarios[0];
          localStorage.setItem("usuario", JSON.stringify(this.usuario));
          this.router.navigate(['/usuarios']);
        }
      });

    });
  }

}
