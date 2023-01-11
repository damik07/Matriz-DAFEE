import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IntegracionService } from '../../../../Servicios/integracion.service';
import { IpcService } from '../../../../Servicios/ipc.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-int-mens-real',
  templateUrl: './int-mens-real.component.html',
  styleUrls: ['./int-mens-real.component.css']
})
export class IntMensRealComponent implements OnInit {

  dataInteg?:any[];
  dataIpc?:any[];
  sumary?:any[];
  ipc1?:any[];
  ipc2?:any[];
  total1: any;
  total2: any;

 


  constructor(private router:Router, private intService:IntegracionService, private ipcService:IpcService) {
    this.dataInteg = this.intService.integracion; 
    this.dataIpc = this.ipcService.ipc; //puede no ser necesario iniciar esta info
  
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


    const ipcf = this.ipcService.ipc.filter(dato => 
      new Date(dato.fecha).getMonth() === new Date(formData.startDate1).getMonth()
    );
    this.ipc1 = ipcf.filter(dato =>
      new Date(dato.fecha).getFullYear() === new Date(formData.startDate1).getFullYear()
    );
    this.ipc2 = ipcf.filter(dato =>
      new Date(dato.fecha).getFullYear() === new Date(formData.startDate1).getFullYear() -1
    );

    this.total1 = this.sumary.reduce((acc, item) => acc + item.importe1,0);
    this.total2 = this.sumary.reduce((acc, item) => acc + item.importe2,0);

    console.log(this.ipc1);



  }

  name = 'Integracion-real.xlsx';
    exportToExcel(): void {
      let element = document.getElementById('comp-int-real');
      const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

      const book: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(book, worksheet, 'Hoja1');

      XLSX.writeFile(book, this.name);
    };


}