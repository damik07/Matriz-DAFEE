import { Pipe, PipeTransform } from '@angular/core';

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

    return items.filter(item => {
      const itemDate = new Date(item.fecha);
      return itemDate >= new Date(value1) && itemDate <= new Date(value2);
    });

    //return items.filter(singleItem =>
      //singleItem[field].some(dato => {
        //let fechaDato = new Date(dato.fecha);
        //let hoy = new Date();
        //let diferencia = Math.abs(hoy.getTime() - fechaDato.getTime());
        //let diasDiferencia = Math.ceil(diferencia / (1000 * 3600 * 24));
        //return fechaDato >= value1 && fechaDato <= value2;        
      //})
    //);
  }
  

}