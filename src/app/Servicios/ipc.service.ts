import { Injectable } from '@angular/core';

@Injectable({
  providedIn:'root'})
export class IpcService {

  ipc?:any=[{
    "fecha": "2022-11-01",
    "concepto": "IPC Indec",
    "valor": 560.757205

  },
  {
    "fecha": "2023-11-01",
    "concepto": "IPC Indec",
    "valor": 1079.2787

  }
  ]

}