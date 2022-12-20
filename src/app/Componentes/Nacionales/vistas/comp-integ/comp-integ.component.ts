import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IntegracionService } from '../../../../Servicios/integracion.service';


@Component({
  selector: 'app-comp-integ',
  templateUrl: './comp-integ.component.html',
  styleUrls: ['./comp-integ.component.css'],
  
})

export class CompIntegComponent implements OnInit {

  dataInteg?:any[];
  datosFiltrados?:any[];
  item:any;
    

  constructor(private router:Router, private intService:IntegracionService) {
    this.dataInteg = this.intService.integracion;
    }

  ngOnInit() {
        
  }

  filterData1(formData){           
    // Filtrar los datos del servicio según el rango de fechas especificado en el formulario
    const datosFiltrados1 = this.dataInteg.filter(dato => 
      dato.fecha >= formData.startDate1 && dato.fecha <= formData.endDate1);
    const datosFiltrados2 = this.dataInteg.filter(dato =>
      dato.fecha >= formData.startDate2 && dato.fecha <= formData.endDate2);
      
      const dFiltrado1 = datosFiltrados1.map(obj => ({
        ...obj,
        filtro: "filtro1"
      }));
      
      const dfiltrado2 = datosFiltrados2.map(obj => ({
        ...obj,
        filtro: "filtro2"
      }));


      this.datosFiltrados = datosFiltrados1.concat(datosFiltrados2);
      console.log(this.datosFiltrados);
      console.log(this.dataInteg);
    
  }

  


}