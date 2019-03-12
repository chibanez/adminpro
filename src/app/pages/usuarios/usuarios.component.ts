import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import swal from 'sweetalert';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor( private usuariosService: UsuarioService,
              public modalUploadService: ModalUploadService ) { }

  ngOnInit() {
    this.cargarUsuarios();
    this.modalUploadService.notificacion.subscribe( resp => {
      this.cargarUsuarios();
    });
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuariosService.cargarUsuarios( this.desde ).subscribe(
      (resp: any) => {
        this.totalRegistros = resp.total;
        this.usuarios = resp.usuarios;
        this.cargando = false;
      }
    );
  }

  cambiarDesde ( valor: number ) {

    let desde = this.desde + valor;
    if ( desde >= this.totalRegistros ) {
      valor = 0;
    }
    if ( desde < 0 )  {
      valor = 0;
    }

    this.desde += valor;
    this.cargarUsuarios();

  }

  buscarUsuario( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarUsuarios();
    } else {
      this.cargando = true;
      this.usuariosService.buscarUsuarios( termino ).subscribe(
        (usuarios: Usuario[]) => {
          this.usuarios = usuarios;
          this.cargando = false;
        }
      );
    }

  }

  borrarUsuario ( usuario: Usuario ) {
    if ( usuario._id  === this.usuariosService.usuario._id ) {
      swal( 'No se puede borrar usuario', 'No se puede borrar a si mismo', 'error' );
      return;
    }

    // Se marcan errores pero funca bien. Es un mambo del typescript
    swal(
      {
        title: '¿Esta seguro?',
        text: 'Esta a punto de borrar a ' + usuario.nombre,
        icon: 'warning',
        buttons: true,
        dangerMode: true
      }
    ).then((borrar) => {
      if ( borrar ) {

        this.usuariosService.borrarUsuario( usuario._id ).subscribe(
          resp => {
            swal('Usuario Borrado', 'El usuario ha sido eliminado correctamente', 'success');
            this.cargarUsuarios();
          }
        );
      }
    });
  }

  guardarUsuario ( usuario: Usuario ) {
    this.usuariosService.actualizarUsuario( usuario ).subscribe();
  }

  mostrarModal( id: string ) {
    this.modalUploadService.mostrarModal('usuarios', id);
  }
}
