import { Component, OnInit } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import * as XLSX from 'xlsx';
import { BDImportInteg } from '../../../../../Componentes/Nacionales/vistas/integracion/bdimport/bdimport-integ';

@Component({
  selector: 'app-bdimport',
  templateUrl: './bdimport.component.html',
  styleUrls: ['./bdimport.component.css']
})
export class BDImportComponent implements OnInit {

  public files: NgxFileDropEntry[] = [];
  data?:any[];

  constructor() { }

  ngOnInit() {
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      // Verificar que es un archivo
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          // Aquí puede acceder al archivo real
          console.log(droppedFile.relativePath, file);
          this.obtenerDatosExcel(file);

          /**
          // Podrías subirlo así:
          const formData = new FormData()
          formData.append('logo', file, relativePath)

          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })

          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          .subscribe(data => {
            // Logotipo desinfectado devuelto desde el backend
          })
          **/

        });
      } else {
        // Era un directorio (se agregan directorios vacíos, de lo contrario solo archivos)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event){
    console.log(event);
  }

  public fileLeave(event){
    console.log(event);
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

      /* guarda la info - quitada las primeras 4 filas por formato de exportación de archivo de la CFI */
      this.data = <any>(XLSX.utils.sheet_to_json(ws,{ header: ["codigo","descripcion","importe"],range: 4, rawNumbers:false }));
      console.log(this.data);
      
    };
    reader.readAsBinaryString(file);
  }

  guardarBD() {
    console.log("agregar función POST luego de crear el backend, en data está la información, falta agregar la fecha")
    
  }

}