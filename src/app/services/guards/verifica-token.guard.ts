import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  canActivate(): Promise<boolean> | boolean {

    console.log('Inicio Verifica Token Guard');

    let token = this.usuarioService.token;

    // Leo la info del token
    // Normalmente el token esta codificado en base64 asi que puedo leerla sin problemas
    let payload = JSON.parse( atob(token.split('.')[1]) );

    let expirado = this.expirado(payload.exp);
    if ( expirado ) {
      // Token expirado. Falla el canActivate y el usuario no puede entrar a la pagina
      this.router.navigate(['/login']);
      return false;
    }

    return this.verificaRenueva( payload.exp );
  }


  verificaRenueva( fechaExp: number ): Promise<boolean> {

    return new Promise( (resolve, reject) => {
      let tokenExp = new Date(fechaExp * 1000);
      // Ojo que aca usamos la fecha del cliente. Para mas seguridad habria que traer la fecha del servidor
      let ahora = new Date();

      // Incremento la fecha actual en 1 hora
      ahora.setTime( ahora.getTime() + (1 * 60 * 60 * 1000));

      // Voy a comparar para saber si dentro de una hora el token ya expiro.
      if ( tokenExp.getTime() > ahora.getTime() ) {
        // Dentro de una hora sigue vivo asi que no hago nada
        resolve(true);
      } else {
        // Si es asi lo renuevo
        this.usuarioService.renuevaToken().subscribe(
          resp => {
            console.log('Token Renovado!!');
            resolve(true);
          },
          err => {
            this.router.navigate(['/login']);
            reject(false);
          }
        );
      }

    });
  }

  expirado( fechaExp: number ) {
    // Obtengo la fecha actual en segundos
    // La fecha del token viene en segundos, no milisegundos
    let ahora = new Date().getTime() / 1000;

    if ( fechaExp < ahora ) {
      // Ya expiro el token
      return true;
    } else {
      // Token vigente
      return false;
    }
  }

}
