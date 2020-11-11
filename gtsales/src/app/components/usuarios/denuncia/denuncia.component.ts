import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-denuncia',
  templateUrl: './denuncia.component.html',
  styleUrls: ['./denuncia.component.css']
})
export class DenunciaComponent implements OnInit {
  denunciaForm: FormGroup;
  usuario: any = { idUsuario: '', pass: '' }
  cursoEdit: any = {};
  uri: string;

  constructor(private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.denunciaForm = this.fb.group({
      contenido: new FormControl('', Validators.required)
    });

    this.activatedRoute.params.subscribe(params => {
      this.uri = params["idproducto"];
    });
  }

  agregarDenuncia(){
    const denuncia = {
      contenido : this.denunciaForm.get('contenido').value,
      idproducto: this.uri,
      idusuario: JSON.parse(localStorage.getItem("usuario")).idusuario
    }
    this.loginService.agregarDenuncia(denuncia).then(()=>{
      this.router.navigate(['/usuarios/comprar']);
    });
  }

}
