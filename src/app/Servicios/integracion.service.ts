import { Injectable } from '@angular/core';

@Injectable({
  providedIn:'root'})
export class IntegracionService {

  integracion?:any=[{
    "fecha": "01/10/2022",
    "codigo": "01",
    "descripcion": "IVA",
    "importe": "150"
  },
  {
    "fecha": "01/10/2022",
    "codigo": "02",
    "descripcion": "Ganancias",
    "importe": "350"
  },
  {
    "fecha": "01/11/2022",
    "codigo": "01",
    "descripcion": "IVA",
    "importe": "450"
  },
  {
    "fecha": "01/12/2022",
    "codigo": "01",
    "descripcion": "IVA",
    "importe": "550"
  }
]

}