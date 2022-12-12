import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IntegracionService } from '../../../../Servicios/integracion.service';

@Component({
  selector: 'app-comp-integ',
  templateUrl: './comp-integ.component.html',
  styleUrls: ['./comp-integ.component.css']
})
export class CompIntegComponent implements OnInit {

  dataInteg?:any[];

  constructor(private router:Router, private intService:IntegracionService) {
    this.dataInteg = this.intService.integracion;
    }

  ngOnInit() {
  }

}