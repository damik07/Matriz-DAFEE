import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn:'root'})
export class CambiosSidebarService {

  @Output() messageEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

}