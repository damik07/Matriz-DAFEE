import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from '../../../Servicios/sidebar.service';

@Component({
  selector: 'app-menu-nac',
  templateUrl: './menu-nac.component.html',
  styleUrls: ['./menu-nac.component.scss']
})
export class MenuNacComponent implements OnInit {

  menuItems?:any[];

  constructor(private router:Router, private sidebarService:SidebarService) {
    this.menuItems = this.sidebarService.menu;
    
      console.log(this.menuItems)
    
  }
  ngOnInit() {
  }

}