import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(private router: Router, public http: HttpClient) {
    this.cargarDeLocalStorage();
   }

  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarDeLocalStorage() {
    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }
  guardarLocalStorage( id: string, token: string, usuario: Usuario ) {
    localStorage.setItem( 'id', id );
    localStorage.setItem( 'token', token );
    localStorage.setItem( 'usuario', JSON.stringify(usuario) );

    this.usuario = usuario;
    this.token = token;
  }

  logout() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);

  }
  loginGoogle( token: string) {

    let url = URL_SERVICIOS + '/login/google';

    return this.http.post( url, {token: token} ).pipe(
      map( (resp: any) => {

        this.guardarLocalStorage( resp.id, resp.token, resp.usuario);

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

        this.guardarLocalStorage( resp.id, resp.token, resp.usuario);

        // Devuelvo a la interfaz un "login true"
        // Los datos los dejo guardados en la local storage
        return true;
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
    })
  );

  }
}
