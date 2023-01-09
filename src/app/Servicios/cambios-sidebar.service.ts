import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn:'root'})
export class CambiosSidebarService {

  @Output() messageEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

}