import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { PlantaDePersonalService } from '../../../../Servicios/planta-de-personal.service';

@Component({
  selector: 'app-pl-comp-mens',
  templateUrl: './pl-comp-mens.component.html',
  styleUrls: ['./pl-comp-mens.component.css']
})
export class PlCompMensComponent implements OnInit {

  dataPlanta?:any[];
  permanente?:any[];
  total1:any;
  total2:any;
  
  
  constructor(private router:Router, private plService:PlantaDePersonalService) { 
    this.dataPlanta = this.plService.planta;
  }

  ngOnInit() {
  }

  filterData1(formData){ 
// Filtrar los datos del servicio según el rango de fechas especificado en el formulario
const datosFiltrados1 = this.dataPlanta.filter(dato => 
  dato.fecha >= formData.startDate1 && dato.fecha <= formData.endDate1);
const datosFiltrados2 = this.dataPlanta.filter(dato =>
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

  const datosFiltrados = dFiltrado1.concat(dfiltrado2);
  
  
  this.permanente = datosFiltrados.reduce((acc, item) => {
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
  

  this.total1 = this.permanente.reduce((acc, item) => acc + item.importe1,0);
  this.total2 = this.permanente.reduce((acc, item) => acc + item.importe2,0);

};

  name = 'Comparativo Integracion.xlsx';
    exportToExcel(): void {
      let element = document.getElementById('comp-pl-mens');
      const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

      const book: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(book, worksheet, 'Hoja1');

      XLSX.writeFile(book, this.name);
    }
  

}