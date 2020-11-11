import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { ProductoService } from 'src/app/services/producto/producto.service';

@Component({
  selector: 'app-denunciadas',
  templateUrl: './denunciadas.component.html',
  styleUrls: ['./denunciadas.component.css']
})
export class DenunciadasComponent implements OnInit {

  denuncias:any[] = [];
  constructor(
    private loginService: LoginService,
    private productoService: ProductoService
  ) { }

  ngOnInit(): void {
    this.getDenuncias();
  }

  getDenuncias(){
    this.loginService.getDenuncias().then((response:any) =>{
      this.denuncias = response.map((ptod) => {
        return ptod;
      })
    })
  }

  bloquear(denun){
    const produ = {
      idproducto :denun.idproducto
    }
    const denu = {
      iddenuncia: denun.iddenuncia
    }
    this.productoService.bloquearProd(produ).then(()=> {
      this.loginService.editardenuncia(denu).then(()=> {
        this.getDenuncias();
      });
    });
  }

  revisar(denun) {
    const denu = {
      iddenuncia: denun.iddenuncia
    }
    this.loginService.editardenuncia(denu).then(()=> {
      this.getDenuncias();
    });
  }

}
