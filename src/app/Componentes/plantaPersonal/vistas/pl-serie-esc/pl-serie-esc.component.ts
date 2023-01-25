import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlantaDePersonalService } from '../../../../Servicios/planta-de-personal.service';
import Chart from 'chart.js/auto'

@Component({
  selector: 'app-pl-serie-esc',
  templateUrl: './pl-serie-esc.component.html',
  styleUrls: ['./pl-serie-esc.component.css']
})
export class PlSerieEscComponent implements OnInit {
  dataPlanta?:any[];
  escalafon:any[];
  suma:any[];
  

  constructor(private router:Router, private plService: PlantaDePersonalService) {
    this.dataPlanta = this.plService.planta; 
    this.escalafon = this.dataPlanta.reduce((acc, item) => {
      const existingItem = acc.find(i => i.escalafon === item.escalafon);
          if (existingItem) {
          existingItem.escalafon;
        } else {
          acc.push({escalafon: item.escalafon});
        }
        return acc;
      }, []);
      
  
  }

  ngOnInit() {

  };

  

  filterGrafico(formData){
    const filtroFecha = this.dataPlanta.filter(dato => 
      dato.fecha >= formData.startDate1 && dato.fecha <= formData.endDate1);
    const filtroEscalafon = filtroFecha.filter(dato =>
      dato.escalafon = formData.escalafon);



     let result = Object.entries(filtroEscalafon.reduce((acc, item) => {
        let date = new Date(item.fecha);
        let mes = date.getMonth() + 1;
        let año = date.getFullYear();
      
        if (!acc[año]) {
          acc[año] = Array(12).fill(0);
        }
      
        acc[año][mes] += item.cantidad;
      
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
    let chart = new Chart('chart', {
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
          text: formData.escalafon
        }
      }
    },
    });


  
  }


  
}