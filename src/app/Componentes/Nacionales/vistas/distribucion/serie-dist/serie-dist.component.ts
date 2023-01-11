import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DistribucionService } from '../../../../../Servicios/distribucion.service';
import Chart from 'chart.js/auto'

@Component({
  selector: 'app-serie-dist',
  templateUrl: './serie-dist.component.html',
  styleUrls: ['./serie-dist.component.css']
})
export class SerieDistComponent implements OnInit {

  dataDist?:any[];
  cuentas:any[];
  suma:any[];

  constructor(private router:Router, private distService:DistribucionService) {
    this.dataDist = this.distService.distribucion; 
    this.cuentas = this.dataDist.reduce((acc, item) => {
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
  }

  filterGrafico(formData){
    const filtroFecha = this.dataDist.filter(dato => 
      dato.fecha >= formData.startDate1 && dato.fecha <= formData.endDate1);
    const filtroCuenta = filtroFecha.filter(dato =>
      dato.descripcion = formData.cuenta);



     let result = Object.entries(filtroCuenta.reduce((acc, item) => {
        let date = new Date(item.fecha);
        let mes = date.getMonth() + 1;
        let año = date.getFullYear();
      
        if (!acc[año]) {
          acc[año] = Array(12).fill(0);
        }
      
        acc[año][mes] += item.importe;
      
        return acc;
      }, {})).map(([año, meses]) => ({
        label: año,
        data: meses
      }));
      
      console.log(result);
      
      function getRandomColor() {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
      }

      let colors = new Map();

    // Inicializa el gráfico
    let chart = new Chart('chart-dist', {
    type: 'bar',
    data: {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',],
      datasets: result.map(item => {
        if (!colors.has(item.label)) {
          colors.set(item.label, getRandomColor());
        }
  
        return {
          label: item.label,
          data: item.data,
          backgroundColor: colors.get(item.label),
          borderColor: colors.get(item.label),
          borderWidth: 1
        };
      })
    
        
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: formData.cuenta
        }
      }
    },
    });


  
  }


}