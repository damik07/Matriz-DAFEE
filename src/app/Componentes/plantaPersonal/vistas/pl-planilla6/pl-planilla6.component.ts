import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlantaDePersonalService } from '../../../../Servicios/planta-de-personal.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-pl-planilla6',
  templateUrl: './pl-planilla6.component.html',
  styleUrls: ['./pl-planilla6.component.css']
})
export class PlPlanilla6Component implements OnInit {
  dataPlanta?: any[];
  permanente?: any[];
  total1Per: any;
  total2Per: any;
  temporario?: any[];
  total1Tem: any;
  total2Tem: any;
  suplente?: any[];
  total1Sup: any;
  total2Sup: any;
  headers = ['Planta Permanente', 'Planta Temporaria', 'Planta Suplente'];

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

    const datosFiltrados2 = this.dataPlanta.filter(
      (dato) =>
        new Date(dato.fecha).getMonth() ===
        new Date(formData.startDate1).getMonth()
    );
    const dfiltro2 = datosFiltrados2.filter(
      (dato) =>
        new Date(dato.fecha).getFullYear() ===
        new Date(formData.startDate1).getFullYear() - 1
    );

    const dFiltrado1 = dfiltro1.map((obj) => ({
      ...obj,
      cantidad1: obj.cantidad,
      ...obj,
      cantidad2: 0,
    }));

    const dfiltrado2 = dfiltro2.map((obj) => ({
      ...obj,
      cantidad1: 0,
      ...obj,
      cantidad2: obj.cantidad,
    }));

    const datosFiltrados = dFiltrado1.concat(dfiltrado2);

    // Filtro para personal permanente quitando el personal de las empresas que no consolidan
    const plantaPer = datosFiltrados.filter(
      (e) => e.tipo_planta === 'Permanente' && e.tipo_organismo !== 'Empresas 2'
    );
    this.permanente = plantaPer.reduce((acc, item) => {
      const existingItem = acc.find((i) => i.descripcion === item.descripcion);
      if (existingItem) {
        existingItem.cantidad += item.cantidad;
        existingItem.cantidad1 += item.cantidad1;
        existingItem.cantidad2 += item.cantidad2;
      } else {
        acc.push({
          DA: item.DA,
          descripcion: item.descripcion,
          cantidad: item.cantidad,
          cantidad1: item.cantidad1,
          cantidad2: item.cantidad2,
        });
      }
      return acc;
    }, []);

    this.total1Per = this.permanente.reduce(
      (acc, item) => acc + item.cantidad1,
      0
    );
    this.total2Per = this.permanente.reduce(
      (acc, item) => acc + item.cantidad2,
      0
    );

    // Filtro para personal temporario quitando el personal de las empresas que no consolidan
    const plantaTem = datosFiltrados.filter(
      (e) => e.tipo_planta === 'Temporario' && e.tipo_organismo !== 'Empresas 2'
    );
    this.temporario = plantaTem.reduce((acc, item) => {
      const existingItem = acc.find((i) => i.descripcion === item.descripcion);
      if (existingItem) {
        existingItem.cantidad += item.cantidad;
        existingItem.cantidad1 += item.cantidad1;
        existingItem.cantidad2 += item.cantidad2;
      } else {
        acc.push({
          DA: item.DA,
          descripcion: item.descripcion,
          cantidad: item.cantidad,
          cantidad1: item.cantidad1,
          cantidad2: item.cantidad2,
        });
      }
      return acc;
    }, []);

    this.total1Tem = this.temporario.reduce(
      (acc, item) => acc + item.cantidad1,
      0
    );
    this.total2Tem = this.temporario.reduce(
      (acc, item) => acc + item.cantidad2,
      0
    );

    // Filtro para personal suplente quitando el personal de las empresas que no consolidan
    const plantaSup = datosFiltrados.filter(
      (e) => e.tipo_planta === 'Suplente' && e.tipo_organismo !== 'Empresas 2'
    );
    this.suplente = plantaSup.reduce((acc, item) => {
      const existingItem = acc.find((i) => i.descripcion === item.descripcion);
      if (existingItem) {
        existingItem.cantidad += item.cantidad;
        existingItem.cantidad1 += item.cantidad1;
        existingItem.cantidad2 += item.cantidad2;
      } else {
        acc.push({
          DA: item.DA,
          descripcion: item.descripcion,
          cantidad: item.cantidad,
          cantidad1: item.cantidad1,
          cantidad2: item.cantidad2,
        });
      }
      return acc;
    }, []);

    this.total1Sup = this.suplente.reduce(
      (acc, item) => acc + item.cantidad1,
      0
    );
    this.total2Sup = this.suplente.reduce(
      (acc, item) => acc + item.cantidad2,
      0
    );
  }

  multiTable(): void {
    /* creación de función que agrega fila */
    function create_gap_rows(ws, nrows) {
      var ref = XLSX.utils.decode_range(ws['!ref']); // busca rango original
      ref.e.r += nrows; // agrega una fila al final
      ws['!ref'] = XLSX.utils.encode_range(ref); // reasigna fila
    }

    /* primera tabla */
    const ws = XLSX.utils.aoa_to_sheet([[this.headers[0]]]);
    XLSX.utils.sheet_add_dom(ws, document.getElementById('table1'), {
      origin: -1,
    });
    create_gap_rows(ws, 1); // espacio de una fila después de la primera tabla

    /* segunda tabla */
    XLSX.utils.sheet_add_aoa(ws, [[this.headers[1]]], { origin: -1 });
    XLSX.utils.sheet_add_dom(ws, document.getElementById('table2'), {
      origin: -1,
    });
    create_gap_rows(ws, 2); // espacio de dos filas después de la segunda tabla

    /* tercera tabla */
    XLSX.utils.sheet_add_aoa(ws, [[this.headers[2]]], { origin: -1 });
    XLSX.utils.sheet_add_dom(ws, document.getElementById('table3'), {
      origin: -1,
    });

    /* creación del libro y exportación */
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Hoja1');
    XLSX.writeFile(wb, 'Comparativo Planta de Personal por DA.xlsx');
  }
}