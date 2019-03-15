import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { Hospital } from 'src/app/models/hospital.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http: HttpClient,
              private usuariosService: UsuarioService) { }


  cargarHospitales( desde: number = 0 ) {

    let url = URL_SERVICIOS + '/hospital?desde=' + desde;

    return this.http.get( url );

  }

  obtenerHospital( id: string ) {

    let url = URL_SERVICIOS + '/hospital/' + id;

    return this.http.get( url );

  }

  borrarHospital( id: string ) {

    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this.usuariosService.token;

    return this.http.delete( url );

  }

  crearHospital( nombre: string ) {

    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this.usuariosService.token;

    return this.http.post( url, { nombre } ).pipe(
      map( (resp: any) => {
        // Aca mete el swal en en service a mi no me gusta
        // Prefiero ponerlo en la interface
        swal('Hospital creado', nombre, 'success');
        return resp.hospital;
      })
    );

  }

  buscarHospitales ( termino: string ) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;

    return this.http.get( url ).pipe(
      // En este caso hago un map para que la respuesta sea solo la coleccion
      // de usuarios, es mas lindo
      map( (resp: any) => {
        return resp.hospitales;
      })
    );
  }

  actualizarHospital( hospital: Hospital ) {

    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this.usuariosService.token;

    console.log(url);

    return this.http.put( url, hospital).pipe(
      map( (resp: any) => {
        // Aca mete el swal en en service a mi no me gusta
        // Prefiero ponerlo en la interface
        swal('Hospital actualizado', hospital.nombre, 'success');
        return true;
      })
    );

  }
}
