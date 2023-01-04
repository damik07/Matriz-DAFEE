import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IntegracionService } from '../../../../Servicios/integracion.service';

@Component({
  selector: 'app-int-mens-real',
  templateUrl: './int-mens-real.component.html',
  styleUrls: ['./int-mens-real.component.css']
})
export class IntMensRealComponent implements OnInit {

  dataInteg?:any[];


  constructor(private router:Router, private intService:IntegracionService) {
    this.dataInteg = this.intService.integracion; 
  
  }

  ngOnInit() {
  }

}