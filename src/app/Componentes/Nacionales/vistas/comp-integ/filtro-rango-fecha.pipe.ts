import { Pipe, PipeTransform } from '@angular/core';
import { dateComparator } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-tools';

@Pipe({
  name: 'filtroRangoFecha'
})
export class FiltroRangoFechaPipe implements PipeTransform {

  transform(items: any[], value1: any, value2: any): any [] {
    if (!items) {
      return [];
    }
    if (!value1 || !value2) {
      return items;
    }

    //return items.filter(item => {
      //const itemDate = item.fecha;
      //return itemDate >= value1 && itemDate <= value2;
    //});

    const filteredItems = [];
    for (const item of items) {
      // Extrae la fecha del objeto - El error está en que items solo tre el valor de los filtros
      const itemDate = new Date(item);
      const value1a = new Date(Date.parse(value1));
      const value2a = new Date(Date.parse(value2));
      //const datef = itemDate.split('-');
      //const dateu = new Date(datef[0], datef[1], datef[2]);
      console.log(items);
      console.log(itemDate);
      console.log(value1a);
      console.log(filteredItems);
      if (itemDate >= value1a && itemDate <= value2a) {
        filteredItems.push(item);
      }
    }
    return filteredItems;
  }

    //return items.filter(singleItem =>
      //singleItem[field].some(dato => {
        //let fechaDato = new Date(dato.fecha);
        //let hoy = new Date();
        //let diferencia = Math.abs(hoy.getTime() - fechaDato.getTime());
        //let diasDiferencia = Math.ceil(diferencia / (1000 * 3600 * 24));
        //return fechaDato >= value1 && fechaDato <= value2;        
      //})
    //);
  //}
  

}