import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from 'src/app/models/medico.model';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(private http: HttpClient,
              private usuariosService: UsuarioService) { }

  cargarMedicos( desde: number = 0 ) {
    let url = URL_SERVICIOS + '/medico?desde=' + desde;

    return this.http.get( url );
  }

  obtenerMedico( id: string ) {

    let url = URL_SERVICIOS + '/medico/' + id;

    return this.http.get( url );

  }

  borrarMedico( id: string ) {

    let url = URL_SERVICIOS + '/medico/' + id;
    url += '?token=' + this.usuariosService.token;

    return this.http.delete( url );

  }

  buscarMedicos ( termino: string ) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;

    return this.http.get( url ).pipe(
      // En este caso hago un map para que la respuesta sea solo la coleccion
      // de usuarios, es mas lindo
      map( (resp: any) => {
        return resp.medicos;
      })
    );
  }

  guardarMedico( medico: Medico ) {

    let url = URL_SERVICIOS + '/medico';

    if ( medico._id ) {
      // Actualizando
      url += '/' + medico._id;
      url += '?token=' + this.usuariosService.token;

      return this.http.put( url, medico ).pipe(
        map( (resp: any) => {
          swal('Medico actualizado', medico.nombre, 'success');
          return resp.medico;
        })
      );

    } else {
      // Creando
      url += '?token=' + this.usuariosService.token;

      return this.http.post( url, medico ).pipe(
        map( (resp: any) => {
          swal('Medico creado', medico.nombre, 'success');
          return resp.medico;
        })
      );
    }
  }

  cargarMedico( id: string ) {
    let url = URL_SERVICIOS + '/medico/' + id;

    return this.http.get( url ).pipe(
      map(
        (resp: any) => {
          return resp.medico;
        }
      )
    );
  }
}
