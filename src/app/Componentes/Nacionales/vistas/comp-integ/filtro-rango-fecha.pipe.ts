import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroRangoFecha'
})
export class FiltroRangoFechaPipe implements PipeTransform {

  transform(items: any[], field: string, value1: any, value2: any): any [] {
    if (!items) {
      return [];
    }
    if (!field || !value1 || !value2) {
      return items;
    }

    return items.filter(singleItem =>
      singleItem[field].some(dato => {
        let fechaDato = new Date(dato.fecha);
        //let hoy = new Date();
        //let diferencia = Math.abs(hoy.getTime() - fechaDato.getTime());
        //let diasDiferencia = Math.ceil(diferencia / (1000 * 3600 * 24));
        return fechaDato >= value1 && fechaDato <= value2;
      })
    );
  }
  

}