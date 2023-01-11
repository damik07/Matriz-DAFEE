import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { DistribucionService } from '../../../../../Servicios/distribucion.service';

@Component({
  selector: 'app-comp-dist',
  templateUrl: './comp-dist.component.html',
  styleUrls: ['./comp-dist.component.css']
})
export class CompDistComponent implements OnInit {

  dataDist?:any[];
  sumary?:any[];
  total1:any;
  total2:any;

  constructor(private router:Router, private distService:DistribucionService) {
    this.dataDist = this.distService.distribucion;
   }

  ngOnInit() {
  }

  filterData1(formData){           
    // Filtrar los datos del servicio según el rango de fechas especificado en el formulario
    const datosFiltrados1 = this.dataDist.filter(dato => 
      dato.fecha >= formData.startDate1 && dato.fecha <= formData.endDate1);
    const datosFiltrados2 = this.dataDist.filter(dato =>
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
      
      
      this.sumary = datosFiltrados.reduce((acc, item) => {
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
      

      this.total1 = this.sumary.reduce((acc, item) => acc + item.importe1,0);
      this.total2 = this.sumary.reduce((acc, item) => acc + item.importe2,0);
    
  };

  


  name = 'Comparativo Distribucion.xlsx';
  exportToExcel(): void {
    let element = document.getElementById('comp-distribucion');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Hoja1');

    XLSX.writeFile(book, this.name);
  }

}