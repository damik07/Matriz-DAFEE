import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from '../../../Servicios/sidebar.service';

@Component({
  selector: 'app-menu-nac',
  templateUrl: './menu-nac.component.html',
  styleUrls: ['./menu-nac.component.scss']
})
export class MenuNacComponent implements OnInit {

  menuItems?:any[];
  message:string;

  @Input() messageEvent: EventEmitter<string>;

  constructor(private router:Router, private sidebarService:SidebarService) {
    this.menuItems = this.sidebarService.menu;
    
      console.log(this.menuItems)
      this.messageEvent.subscribe(message => {
        this.message = message;
      });
     console.log(this.message)
    
  }
  ngOnInit() {
    
   
   
  }

  
  getIterable(): any[] {
    return 'item'[this.message];

  }

}