import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IntegracionService } from '../../../../Servicios/integracion.service';

@Component({
  selector: 'app-comp-integ',
  templateUrl: './comp-integ.component.html',
  styleUrls: ['./comp-integ.component.css']
})
export class CompIntegComponent implements OnInit {

  dataInteg?:any[];
  datosFiltrados?:any[];
  filtroFechas:Date;
  

  constructor(private router:Router, private intService:IntegracionService) {
    this.dataInteg = this.intService.integracion;
    }

  ngOnInit() {

    
  }

  filterData1(){     
    console.log(this.filterData1)
    // Filtrar los datos del servicio según el rango de fechas especificado en el formulario
  this.datosFiltrados = this.dataInteg.filter(dato => dato.fecha >= this.filterData1.arguments && dato.fecha <= this.filterData1.arguments);  
  }

}