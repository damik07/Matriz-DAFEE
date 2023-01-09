import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CambiosSidebarService } from '../../Servicios/cambios-sidebar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  collapsed = true;
  
  constructor(private cambioSidebar:CambiosSidebarService) { }

  ngOnInit() {

  }

  sendMessage(item:string) {
    this.cambioSidebar.messageEvent.emit(item);
    
  }

  

}