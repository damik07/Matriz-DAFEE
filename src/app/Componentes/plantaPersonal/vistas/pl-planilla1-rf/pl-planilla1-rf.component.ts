import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlantaDePersonalService } from '../../../../Servicios/planta-de-personal.service';

@Component({
  selector: 'app-pl-planilla1-rf',
  templateUrl: './pl-planilla1-rf.component.html',
  styleUrls: ['./pl-planilla1-rf.component.css']
})
export class PlPlanilla1RFComponent implements OnInit {
  dataPlanta?: any[];

  constructor(private router: Router, private plService: PlantaDePersonalService) {
    this.dataPlanta = this.plService.planta;
   }

  ngOnInit() {
  }

}