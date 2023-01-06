import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  collapsed = true;
  

  @Output() messageEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  
  sendMessage(item:string) {
    this.messageEvent.emit(item);
    
  }

  

}