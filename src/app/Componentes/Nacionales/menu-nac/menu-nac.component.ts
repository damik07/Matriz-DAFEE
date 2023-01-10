import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CambiosSidebarService } from '../../../Servicios/cambios-sidebar.service';
import { SidebarService } from '../../../Servicios/sidebar.service';

@Component({
  selector: 'app-menu-nac',
  templateUrl: './menu-nac.component.html',
  styleUrls: ['./menu-nac.component.scss']
})
export class MenuNacComponent implements OnInit {

  menuItems?:any[];
  message:string;

  

  constructor(private router:Router, private sidebarService:SidebarService, private cambioSidebar:CambiosSidebarService) {
    this.menuItems = this.sidebarService.menu;
    
    console.log(this.menuItems)
      
   
    
  }
  ngOnInit() {
    this.cambioSidebar.messageEvent.subscribe(data =>{
      this.message = data;
    })
   
   
  }

 
  
  getIterable(): any[] {
    return 'item'[this.message];

  }

}