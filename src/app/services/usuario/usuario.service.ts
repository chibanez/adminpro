import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[] = [];

  constructor(private router: Router, public http: HttpClient, private subirArchivoService: SubirArchivoService) {
    this.cargarDeLocalStorage();
   }

  renuevaToken() {
    let url = URL_SERVICIOS + '/login/renuevatoken';
    url += '?token=' + this.token;

    return this.http.get( url ).pipe(
      map( (resp: any) => {
        this.token = resp.token;
        // Aca grabo directamente en el LS de vago, tendria que estar centralizado
        localStorage.setItem( 'token', resp.token );
        return true;
      }),
      catchError( err => {
        swal('No se pudo renovar el token', 'No fue posible renovar el token', 'error');
        this.router.navigate(['/login']);
        return throwError(err);
        }
      )
    );

  }

  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarDeLocalStorage() {
    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }
  guardarLocalStorage( id: string, token: string, usuario: Usuario, menu: any ) {
    localStorage.setItem( 'id', id );
    localStorage.setItem( 'token', token );
    localStorage.setItem( 'usuario', JSON.stringify(usuario) );
    localStorage.setItem( 'menu', JSON.stringify(menu) );

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  logout() {
    this.usuario = null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);

  }
  loginGoogle( token: string) {

    let url = URL_SERVICIOS + '/login/google';

    return this.http.post( url, {token: token} ).pipe(
      map( (resp: any) => {
        console.log(resp.menu);
        this.guardarLocalStorage( resp.id, resp.token, resp.usuario, resp.menu);

        // Devuelvo a la interfaz un "login true"
        // Los datos los dejo guardados en la local storage
        return true;
      })
    );

  }


  login( usuario: Usuario, recordar: boolean = false ) {

    if ( recordar ) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS + '/login';
    return this.http.post( url, usuario ).pipe(
      map( (resp: any) => {
        console.log(resp.menu);
        this.guardarLocalStorage( resp.id, resp.token, resp.usuario, resp.menu );

        // Devuelvo a la interfaz un "login true"
        // Los datos los dejo guardados en la local storage
        return true;
      }),
      catchError( err => {
        swal('Login Incorrecto', err.error.mensaje, 'error');
        return throwError(err);
      })
    );
  }

  crearUsuario ( usuario: Usuario ) {

  let url = URL_SERVICIOS + '/usuario';

  return this.http.post( url, usuario ).pipe(
    map( (resp: any) => {
      // Aca mete el swal en en service a mi no me gusta
      // Prefiero ponerlo en la interface
      swal('Usuario creado', usuario.email, 'success');
      return resp.usuario;
    }),
    catchError( err => {
      swal(err.error.mensaje, err.error.errors.message, 'error');
      return throwError(err);
    })
  );

  }

  actualizarUsuario( usuario: Usuario ) {

    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    console.log(url);

    return this.http.put( url, usuario).pipe(
      map( (resp: any) => {
        // Guardo la info actualizada en localstorage
        // No me copa que lo haga aca, despues hay que ver que lo que haga aca
        // sea independiente de la aplicacion

        if ( usuario._id === this.usuario._id ) {
          // Solo actualizo la info del LocalStorage si estoy modificando
          // mi propio usuario
          let usuarioDB = resp.usuario;
          this.guardarLocalStorage(usuarioDB._id, this.token, usuarioDB, this.menu);
        }

        // Aca mete el swal en en service a mi no me gusta
        // Prefiero ponerlo en la interface
        swal('Usuario actualizado', usuario.nombre, 'success');
        return true;
      }),
      catchError( err => {
        swal(err.error.mensaje, err.error.errors.message, 'error');
        return throwError(err);
      })
    );

  }

  cambiarImagen( archivo: File, id: string ) {

    this.subirArchivoService.subirArchivo(archivo, 'usuarios', id)
          .then( (resp: any) => {
            this.usuario.img = resp.usuario.img;
            swal('Imagen actualizada', this.usuario.nombre, 'success');
            this.guardarLocalStorage(id, this.token, this.usuario, this.menu);

          }).catch( resp => {
            console.log('error', resp);
          });

  }

  cargarUsuarios( desde: number = 0 ) {

    let url = URL_SERVICIOS + '/usuario?desde=' + desde;

    return this.http.get( url );

  }

  buscarUsuarios ( termino: string ) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;

    return this.http.get( url ).pipe(
      // En este caso hago un map para que la respuesta sea solo la coleccion
      // de usuarios, es mas lindo
      map( (resp: any) => {
        return resp.usuarios;
      })
    );
  }

  borrarUsuario ( id: string ) {

    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;

    return this.http.delete( url );

  }
}
