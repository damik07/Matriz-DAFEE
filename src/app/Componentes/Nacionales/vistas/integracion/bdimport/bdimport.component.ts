import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-bdimport',
  templateUrl: './bdimport.component.html',
  styleUrls: ['./bdimport.component.css']
})
export class BDImportComponent implements OnInit {

  files?:any;
  data?:any;

  constructor() { }

  ngOnInit() {
  }

  dropped(event) {
    this.files = event.files;
    for (const droppedFile of event.files) {
      // Verificar que es un archivo
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          // Aquí puede acceder al archivo real
          console.log(droppedFile.relativePath, file);
          this.obtenerDatosExcel(file);
        });
      }
    }
  }

  obtenerDatosExcel(file) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      /* lee el archivo */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });

      /* grava la primera hoja */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];

      /* guarda la info - quita las primeras 4 filas por formato de exportación de archivo de la CFI */
      this.data = <any>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      this.data.split(0,4);
    };
    reader.readAsBinaryString(file);
  }

}