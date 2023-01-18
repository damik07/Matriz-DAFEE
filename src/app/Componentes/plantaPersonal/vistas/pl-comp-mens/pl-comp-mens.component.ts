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
  total1Per:any;
  total2Per:any;
  temporario?:any[];
  total1Tem:any;
  total2Tem:any;
  suplente?:any[];
  total1Sup:any;
  total2Sup:any;
  
  
  constructor(private router:Router, private plService:PlantaDePersonalService) { 
    this.dataPlanta = this.plService.planta;
  }

  ngOnInit() {
  }

  filterData1(formData) {
    // Filtrar los datos del servicio según el rango de fechas especificado en el formulario
    const datosFiltrados1 = this.dataPlanta.filter(dato =>
      new Date(dato.fecha).getMonth() === new Date(formData.startDate1).getMonth()
    );
    const dfiltro1 = datosFiltrados1.filter(dato =>
      new Date(dato.fecha).getFullYear() === new Date(formData.startDate1).getFullYear()
    );

    const datosFiltrados2 = this.dataPlanta.filter(dato =>
      new Date(dato.fecha).getMonth() === new Date(formData.endDate1).getMonth()
    );
    const dfiltro2 = datosFiltrados2.filter(dato =>
      new Date(dato.fecha).getFullYear() === new Date(formData.endDate1).getFullYear()
    );

    const dFiltrado1 = dfiltro1.map(obj => ({
      ...obj,
      cantidad1: obj.cantidad,
      ...obj,
      cantidad2: 0
    }));

    const dfiltrado2 = dfiltro2.map(obj => ({
      ...obj,
      cantidad1: 0,
      ...obj,
      cantidad2: obj.cantidad
    }));

    const datosFiltrados = dFiltrado1.concat(dfiltrado2);

    // Filtro para personal permanente quitando el personal de las empresas que no consolidan
    const plantaPer = datosFiltrados.filter(e => e.tipo_planta === 'Permanente' && e.tipo_organismo !== 'Empresas 2');
    this.permanente = plantaPer.reduce((acc, item) => {

      const existingItem = acc.find(i => i.escalafon === item.escalafon);
      if (existingItem) {
        existingItem.cantidad += item.cantidad;
        existingItem.cantidad1 += item.cantidad1;
        existingItem.cantidad2 += item.cantidad2;
      } else {
        acc.push({ escalafon: item.escalafon, cantidad: item.cantidad, cantidad1: item.cantidad1, cantidad2: item.cantidad2 });
      }
      return acc;
    }, []);

    this.total1Per = this.permanente.reduce((acc, item) => acc + item.cantidad1, 0);
    this.total2Per = this.permanente.reduce((acc, item) => acc + item.cantidad2, 0);

    // Filtro para personal temporario quitando el personal de las empresas que no consolidan
    const plantaTem = datosFiltrados.filter(e => e.tipo_planta === 'Temporario' && e.tipo_organismo !== 'Empresas 2');
    this.temporario = plantaTem.reduce((acc, item) => {

      const existingItem = acc.find(i => i.escalafon === item.escalafon);
      if (existingItem) {
        existingItem.cantidad += item.cantidad;
        existingItem.cantidad1 += item.cantidad1;
        existingItem.cantidad2 += item.cantidad2;
      } else {
        acc.push({ escalafon: item.escalafon, cantidad: item.cantidad, cantidad1: item.cantidad1, cantidad2: item.cantidad2 });
      }
      return acc;
    }, []);

    this.total1Tem = this.permanente.reduce((acc, item) => acc + item.cantidad1, 0);
    this.total2Tem = this.permanente.reduce((acc, item) => acc + item.cantidad2, 0);

    // Filtro para personal suplente quitando el personal de las empresas que no consolidan
    const plantaSup = datosFiltrados.filter(e => e.tipo_planta === 'Suplente' && e.tipo_organismo !== 'Empresas 2');
    this.suplente = plantaSup.reduce((acc, item) => {

      const existingItem = acc.find(i => i.escalafon === item.escalafon);
      if (existingItem) {
        existingItem.cantidad += item.cantidad;
        existingItem.cantidad1 += item.cantidad1;
        existingItem.cantidad2 += item.cantidad2;
      } else {
        acc.push({ escalafon: item.escalafon, cantidad: item.cantidad, cantidad1: item.cantidad1, cantidad2: item.cantidad2 });
      }
      return acc;
    }, []);

    this.total1Sup = this.permanente.reduce((acc, item) => acc + item.cantidad1, 0);
    this.total2Sup = this.permanente.reduce((acc, item) => acc + item.cantidad2, 0);

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