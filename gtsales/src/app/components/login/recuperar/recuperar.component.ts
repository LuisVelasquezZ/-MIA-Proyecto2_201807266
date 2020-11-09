import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.css']
})
export class RecuperarComponent implements OnInit {
  recuperarcForm: FormGroup;
  usuario: any = { idUsuario: '', pass: '' }
  cursoEdit: any = {};
  uri: string;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.recuperarcForm = this.fb.group({
      pass: new FormControl('', Validators.required)
    });

    this.activatedRoute.params.subscribe(params => {
      this.uri = params["idUsuario"];
    });
  }

  recuperarUsuario() {
    const md5 = new Md5();
    const usuarioNuevo = {
      pass: md5.appendStr(this.recuperarcForm.get('pass').value).end(),
      idusuario: this.uri
    }
    this.loginService.passusuario(usuarioNuevo).then((response: any) => {
      this.router.navigate(['/login']);
    });
  }

}
