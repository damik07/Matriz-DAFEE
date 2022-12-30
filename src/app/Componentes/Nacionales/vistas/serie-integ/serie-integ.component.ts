import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IntegracionService } from '../../../../Servicios/integracion.service';

@Component({
  selector: 'app-serie-integ',
  templateUrl: './serie-integ.component.html',
  styleUrls: ['./serie-integ.component.css']
})
export class SerieIntegComponent implements OnInit {

  dataInteg?:any[];
  cuentas:any[];

  constructor(private router:Router, private intService:IntegracionService) {
    this.dataInteg = this.intService.integracion; 
    this.cuentas = this.dataInteg.reduce((acc, item) => {
      const existingItem = acc.find(i => i.descripcion === item.descripcion);
          if (existingItem) {
          existingItem.descripcion;
        } else {
          acc.push({descripcion: item.descripcion});
        }
        return acc;
      }, []);
      
  
  }

  ngOnInit() {

  };

 


  
}