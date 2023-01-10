import { Component, DoCheck, EventEmitter, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CambiosSidebarService } from '../../Servicios/cambios-sidebar.service';
import { SidebarService } from '../../Servicios/sidebar.service';

@Component({
  selector: 'app-menu-nac',
  templateUrl: './menu-nac.component.html',
  styleUrls: ['./menu-nac.component.scss']
})
export class MenuNacComponent implements OnInit, DoCheck {

  menuItems?:any[];
  menuItems1?:any[];
  message:any;
 

  

  constructor(private router:Router, private sidebarService:SidebarService, private cambioSidebar:CambiosSidebarService) {
    this.menuItems1 = this.sidebarService.menu;
    
 
  }

  ngOnInit() {
    this.cambioSidebar.messageEvent.subscribe(data =>{
      this.message = data;
      
    });

  }

  ngDoCheck(){
    if (this.message) {
      this.menuItems1.forEach(dato => {
        if(dato.hasOwnProperty(this.message)){
          this.menuItems= dato[this.message];
        }
      })
    } 
      
  }
 


}