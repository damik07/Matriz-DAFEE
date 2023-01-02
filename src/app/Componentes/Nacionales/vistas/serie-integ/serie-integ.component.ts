import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IntegracionService } from '../../../../Servicios/integracion.service';
import Chart from 'chart.js/auto'

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

  filterGrafico(formData){
    const filtroFecha = this.dataInteg.filter(dato => 
      dato.fecha >= formData.startDate1 && dato.fecha <= formData.endDate1);
    const filtroCuenta = filtroFecha.filter(dato =>
      dato.descripcion = formData.cuenta);

    
    
    console.log(filtroCuenta);


    // Inicializa el gráfico
    let chart = new Chart('chart', {
    type: 'bar',
    data: {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
      datasets: [
        {
          label: 'Año 2020',
          data: [100, 200, 300, 400, 500, 600],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        },
        {
          label: 'Año 2021',
          data: [200, 400, 600, 800, 1000, 1200],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }
      ]
    },
    //options: {    scales: {      yAxes: [{        ticks: {          beginAtZero: true        }      }]    }  }
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Chart.js Bar Chart'
        }
      }
    },
    });


  
  }


  
}