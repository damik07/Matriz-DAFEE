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
  sumary?:any[];
    

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
        importe1: obj.importe,
        ...obj,
        importe2: 0
      }));
      
      const dfiltrado2 = datosFiltrados2.map(obj => ({
        ...obj,
        importe1: 0,
        ...obj,
        importe2: obj.importe
      }));

      this.datosFiltrados = dFiltrado1.concat(dfiltrado2);
      console.log(this.datosFiltrados);
      
      this.sumary = this.datosFiltrados.reduce((acc, item) => {
        const existingItem = acc.find(i => i.descripcion === item.descripcion);
            if (existingItem) {
            existingItem.importe += item.importe;
            existingItem.importe1 += item.importe1;
            existingItem.importe2 += item.importe2;
          } else {
            acc.push({descripcion: item.descripcion, importe: item.importe, importe1: item.importe1, importe2: item.importe2});
          }
          return acc;
        }, []);
      console.log(this.sumary);
    
  }

  


}