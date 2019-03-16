import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from '../../services/service.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: File;

  constructor(public subirArchivoService: SubirArchivoService,
              public modalUploadService: ModalUploadService) { }

  ngOnInit() {
  }

  seleccionImagen( archivo: File ) {

    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }

    if ( archivo.type.indexOf('image') < 0 )  {
      swal('Solo Imagenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );

    // reader.onloadend = () => this.imagenTemp = reader.result.toString();

    console.log(event);
  }

  cerrarModal() {
    this.modalUploadService.ocultarModal();
    this.imagenTemp = null;
    this.imagenSubir = null;
  }

  subirImagen() {
    this.subirArchivoService.subirArchivo( this.imagenSubir, this.modalUploadService.tipo, this.modalUploadService.id)
    .then(
      resp => {

        // Devuelvo la info de la imagen que subi a traves
        // de la notificacion del service
        this.modalUploadService.notificacion.emit( resp );
        this.cerrarModal();

      }
    ).catch( err => {
      console.log('Error en la carga');
    });
  }
}
