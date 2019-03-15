import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;

  imagenSubir: File;
  imagenTemp: File;

  constructor(private usuarioService: UsuarioService) {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit() {
  }

  guardar( usuario: Usuario ) {
    // Recibo un Usuario por mas que en el formulario no tengo todos sus campos
    // Se van a llenar los campos que si existen

    // Actualizo los datos del usuario del usuarioService
    this.usuario.nombre = usuario.nombre;

    if ( !this.usuario.google ) {
      this.usuario.email = usuario.email;
    }
    this.usuarioService.actualizarUsuario( this.usuario ).subscribe();
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

  cambiarImagen() {

    this.usuarioService.cambiarImagen( this.imagenSubir, this.usuario._id );

  }
}
