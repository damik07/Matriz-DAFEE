import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroPorRangoFecha'
})
export class FiltroPorRangoFechaPipe implements PipeTransform {

  transform(items: any[], dateRange: any): any {
    if (!items) {
      return [];
    }
    if (!dateRange || !dateRange.from || !dateRange.to) {
      return items;
    }

    return items.filter(item => {
      const date = new Date(item.date);
      return date >= dateRange.from && date <= dateRange.to;
    });
  }
}
