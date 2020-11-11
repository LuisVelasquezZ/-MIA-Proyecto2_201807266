import { Component, OnInit } from '@angular/core';
import { ReporteService } from 'src/app/services/reporte/reporte.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  bitacoras:any[] = [];
  rep1:any[] = [];
  rep4a:any[] = [];
  rep4b:any[] = [];
  rep5:any[] = [];
  rep6:any[] = [];
  rep7:any[] = [];

  constructor(private reportesService: ReporteService) { }

  ngOnInit(): void {
    this.getBitacora();
    this.getRep1();
    this.getRep4a();
    this.getRep4b();
    this.getRep5();
    this.getRep6();
    this.getRep7();
  }

  getBitacora(){
    this.reportesService.getBitacora().then((response:any) =>{
      this.bitacoras = response.map((ptod) => {
        return ptod;
      })
    })
  }

  getRep1(){
    this.reportesService.getrep1().then((response:any) =>{
      this.rep1 = response.map((ptod) => {
        return ptod;
      })
    })
  }

  getRep4a(){
    this.reportesService.getrep4a().then((response:any) =>{
      this.rep4a = response.map((ptod) => {
        return ptod;
      })
    })
  }

  getRep4b(){
    this.reportesService.getrep4b().then((response:any) =>{
      this.rep4b = response.map((ptod) => {
        return ptod;
      })
    })
  }

  getRep5(){
    this.reportesService.getrep5().then((response:any) =>{
      this.rep5 = response.map((ptod) => {
        return ptod;
      })
    })
  }

  getRep6(){
    this.reportesService.getrep6().then((response:any) =>{
      this.rep6 = response.map((ptod) => {
        return ptod;
      })
    })
  }

  getRep7(){
    this.reportesService.getrep7().then((response:any) =>{
      this.rep7 = response.map((ptod) => {
        return ptod;
      })
    })
  }
}
