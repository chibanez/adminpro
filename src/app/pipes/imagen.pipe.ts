import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {
    // img puede ser el nombre de la imagen o la ruta complea de la imagen de google
    let url = URL_SERVICIOS + '/img';

    if ( !img ) {
      return url + '/usuarios/xxx';
    }

    if ( img.indexOf('https') >= 0 ) {
      // Es una imagen de google, devuelvo la ruta tal cual esta
      return img;
    }

    switch ( tipo ) {
      case 'usuario':
        url +=  '/usuarios/' + img;
        break;
      case 'medico':
        url += '/medicos/' + img;
        break;
      case 'hospitales':
        url += '/hospitales/' + img;
        break;
      default:
        console.log('Tipo de imagen no existe');
        return url + '/usuarios/xxx';
    }
    return url;
  }

}
