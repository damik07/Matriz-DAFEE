import { Injectable } from '@angular/core';

@Injectable({
  providedIn:'root'})
export class IntegracionService {

  integracion?:any=[{
    "fecha": "2022-10-01",
    "codigo": "01",
    "descripcion": "IVA",
    "importe": "150"
  },
  {
    "fecha": "2022-10-01",
    "codigo": "02",
    "descripcion": "Ganancias",
    "importe": "350"
  },
  {
    "fecha": "2022-11-01",
    "codigo": "01",
    "descripcion": "IVA",
    "importe": "450"
  },
  {
    "fecha": "2022-12-01",
    "codigo": "01",
    "descripcion": "IVA",
    "importe": "550"
  }
]

}