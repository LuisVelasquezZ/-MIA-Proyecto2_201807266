import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  usuario: any = { correo: '', pass: '' }
  usuarios: any[] = [];

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      correo: new FormControl(this.usuario.correo, [Validators.required, Validators.email]),
      pass: new FormControl(this.usuario.pass, Validators.required)
    });
  }

  autenticar() {
    const md5 = new Md5();
    const usuario = {
      correo: this.loginForm.get('correo').value,
      pass: md5.appendStr(this.loginForm.get('pass').value).end() 
    }    
    this.loginService.loginUsuario(usuario).then((response: any) => {
      this.usuarios = response.map((u) => {
        return u; 
      });
      if (this.usuarios.length >= 1) {
        this.usuario = this.usuarios[0];        
        if (this.usuario.tipo == "admin") {
          localStorage.setItem("usuario", JSON.stringify(this.usuario));
          console.log("admin");
          //this.router.navigate(['/administrador']);
        } else if (this.usuario.tipo == "user") {
          localStorage.setItem("usuario", JSON.stringify(this.usuario));
          console.log("user")
          //this.router.navigate(['/auxiliar']);
        }
      }
    });

  }

}
