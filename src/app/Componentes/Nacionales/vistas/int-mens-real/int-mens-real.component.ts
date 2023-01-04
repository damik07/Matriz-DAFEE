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


  constructor(private router:Router, private intService:IntegracionService) {
    this.dataInteg = this.intService.integracion; 
  
  }

  ngOnInit() {
  }

  filterData1(formData){           
    // Filtrar los datos del servicio según el rango de fechas especificado en el formulario
    const datosFiltrados1 = this.dataInteg.filter(dato => 
      dato.fecha >= formData.startDate1 && dato.fecha <= formData.endDate1);
    }
}