import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import { MedicoService } from 'src/app/services/service.index';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  totalRegistros: number = 0;
  cargando: boolean = true;
  desde: number = 0;

  constructor(public modalUploadService: ModalUploadService,
             public medicoService: MedicoService ) { }

  ngOnInit() {
    this.cargarMedicos();

    // Esta notificacion me avisa que se actualizo la imagen asi cargo nuevamente los datos
    this.modalUploadService.notificacion.subscribe( resp => {
      this.cargarMedicos();
    });
  }

  cargarMedicos() {
    this.cargando = true;
    this.medicoService.cargarMedicos( this.desde ).subscribe(
      (resp: any) => {
        this.totalRegistros = resp.total;
        this.medicos = resp.medicos;
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
    this.cargarMedicos();

  }

  buscarMedicos( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarMedicos();
    } else {
      this.cargando = true;
      this.medicoService.buscarMedicos( termino ).subscribe(
        (medicos: Medico[]) => {
          this.medicos = medicos;
          this.cargando = false;
        }
      );
    }

  }
  mostrarModal( id: string ) {
    this.modalUploadService.mostrarModal('medicos', id);
  }

  borrarMedico( medico: Medico ) {

    swal(
      {
        title: '¿Esta seguro?',
        text: 'Esta a punto de borrar al medico ' + medico.nombre,
        icon: 'warning',
        buttons: ['Cancelar', 'Aceptar'],
        dangerMode: true
      }
    ).then((borrar) => {
      if ( borrar ) {

        this.medicoService.borrarMedico( medico._id ).subscribe(
          resp => {
            swal('Medico Borrado', 'El medico ha sido eliminado correctamente', 'success');
            this.cargarMedicos();
          }
        );
      }
    });
  }
}
