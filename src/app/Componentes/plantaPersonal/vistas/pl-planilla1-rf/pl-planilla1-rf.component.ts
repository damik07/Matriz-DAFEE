import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlantaDePersonalService } from '../../../../Servicios/planta-de-personal.service';

@Component({
  selector: 'app-pl-planilla1-rf',
  templateUrl: './pl-planilla1-rf.component.html',
  styleUrls: ['./pl-planilla1-rf.component.css']
})
export class PlPlanilla1RFComponent implements OnInit {
  dataPlanta?: any[];

  constructor(private router: Router, private plService: PlantaDePersonalService) {
    this.dataPlanta = this.plService.planta;
   }

  ngOnInit() {
  }

  filterData1(formData) {
    // Filtrar los datos del servicio según el rango de fechas especificado en el formulario
    const datosFiltrados1 = this.dataPlanta.filter(
      (dato) =>
        new Date(dato.fecha).getMonth() ===
        new Date(formData.startDate1).getMonth()
    );
    const dfiltro1 = datosFiltrados1.filter(
      (dato) =>
        new Date(dato.fecha).getFullYear() ===
        new Date(formData.startDate1).getFullYear()
    );



    //FIN DE FILTRO
  };


}