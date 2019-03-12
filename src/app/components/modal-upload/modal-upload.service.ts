import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public tipo: string;
  public id: string;

  public oculto: string = 'oculto';

  // Esta es la respuesta que va a avisar a las pantallas que
  // utilicen el modal de que la imagen se subio exitosamente
  public notificacion = new EventEmitter<any>();

  constructor() {
  }

  ocultarModal() {
    this.oculto = 'oculto';
    this.tipo = null;
    this.id = null;
  }

  mostrarModal( tipo: string, id: string ) {
    this.tipo = tipo;
    this.id = id;
    this.oculto = '';
  }
}
