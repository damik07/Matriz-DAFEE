import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IntegracionService } from '../../../../Servicios/integracion.service';

@Component({
  selector: 'app-int-mens-real',
  templateUrl: './int-mens-real.component.html',
  styleUrls: ['./int-mens-real.component.css']
})
export class IntMensRealComponent implements OnInit {

  dataInteg?:any[];
  sumary?:any[];
  total1:any;
  total2:any;


  constructor(private router:Router, private intService:IntegracionService) {
    this.dataInteg = this.intService.integracion; 
  
  }

  ngOnInit() {
  }

  filterData1(formData){           
    // Filtrar los datos del servicio según el rango de fechas especificado en el formulario
    const datosFiltrados1 = this.dataInteg.filter(dato => 
      new Date(dato.fecha).getMonth() === new Date(formData.startDate1).getMonth()
    );
    const dfiltro1 = datosFiltrados1.filter(dato =>
      new Date(dato.fecha).getFullYear() === new Date(formData.startDate1).getFullYear()
    );
    const dfiltro2 = datosFiltrados1.filter(dato =>
      new Date(dato.fecha).getFullYear() === new Date(formData.startDate1).getFullYear() -1
    );

    const dFiltrado1 = dfiltro1.map(obj => ({
      ...obj,
      importe1: obj.importe,
      ...obj,
      importe2: 0
    }));
    
    const dfiltrado2 = dfiltro2.map(obj => ({
      ...obj,
      importe1: 0,
      ...obj,
      importe2: obj.importe
    }));

    const datosFiltrados = dFiltrado1.concat(dfiltrado2);


    console.log(datosFiltrados);





  }
}