import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sumByConcepto'
})
export class SumByConceptoPipe implements PipeTransform {

  transform(items: any[], property: string): any {
    if (!items) {
      return 0;
    }
    if (!property) {
      return 0;
    }

    // Calcula la suma de los valores de la propiedad especificada del array - problema: diseñado para array simple, no array de objetos
    return Array.isArray(items)
      ? items.reduce((sum, item) => sum + item[property], 0)
      : 0;
  }
}