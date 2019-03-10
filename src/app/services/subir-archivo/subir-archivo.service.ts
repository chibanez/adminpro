import { Injectable } from '@angular/core';
import { XhrFactory } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  // Esta funcion es vanilla javascript porque en ese momento no habia subida
  // de archivos en angular. Verificar en el momento de aplicarlo realmente porque
  // seguramente va a haber algo armado.
  subirArchivo( archivo: File, tipo: string, id: string ) {

    // Otra forma de subir mas directo y facil
    // Hay qeu probar si funca
    // fileUpload(fileItem: File, tipo: string, id: string) {
    //   const url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;
    //   const formData: FormData = new FormData();
    //   formData.append('imagen', fileItem, fileItem.name);
    //   return this.http.put(url, formData, { reportProgress: true });
    //   }



    // Hago que la funcion devuelva una promesa
    return new Promise( (resolve, reject) => {

      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      formData.append( 'imagen', archivo, archivo.name) ;
      xhr.onreadystatechange = function () {
        // Estoy escuchando hasta que termine el proceso
        if ( xhr.readyState === 4 ) {
          if ( xhr.status === 200 ) {
            console.log('Imagen Subida');
            // Mando toda la respuesta que me devuelve el xhr
            resolve( JSON.parse(xhr.response) );
          } else {
            console.log('Fallo la subida');
            reject( xhr.response );
          }
        }
      };

      let url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;

      xhr.open('PUT', url, true);
      xhr.send( formData );

    });



  }

}
