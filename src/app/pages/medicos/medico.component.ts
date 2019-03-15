import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { MedicoService, HospitalService } from 'src/app/services/service.index';
import { Medico } from 'src/app/models/medico.model';
import { EventEmitter } from 'protractor';
import { Router, ActivatedRoute } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  // Inicializo los campos en blanco porque como el formulario
  // tiene un ngmodel asi me pone el valor por defecto del select en ''
  // sino queda null y no muestra el 'Seleccione Hospital'
  medico: Medico = new Medico('', null, '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(
    private medicoService: MedicoService,
    public hospitalService: HospitalService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalUpload: ModalUploadService
  ) {

    this.activatedRoute.params.subscribe(
      params => {
        let id = params['id'];
        if ( id !== 'nuevo') {
          this.cargarMedico( id );
        }
      }
    );
   }

  ngOnInit() {
    this.hospitalService.cargarHospitales().subscribe(
      (resp: any) => {
        this.hospitales = resp.hospitales;
      }
    );

    this.modalUpload.notificacion.subscribe(
      resp => {
        this.medico.img = resp.medico.img;
      }
    );
  }

  cargarMedico( id: string ) {
    this.medicoService.cargarMedico( id ).subscribe(
      medico => {
        this.medico = medico;
        this.medico.hospital = medico.hospital._id;
        this.cambioHospital( this.medico.hospital );
      }
    );
  }
  guardarMedico( f: NgForm ) {
    if ( f.invalid ) {
      return;
    }

    this.medicoService.guardarMedico( this.medico ).subscribe(
      resp => {
        this.medico._id = resp._id;
        this.router.navigate(['/medico/' + resp._id]);
      }
    );
  }

  cambioHospital( id: string ) {
    this.hospitalService.obtenerHospital( id ).subscribe(
      (resp: any) => {
        this.hospital = resp.hospital;
      }
    );
    console.log(id);
  }

  cambiarFoto() {
    this.modalUpload.mostrarModal('medicos', this.medico._id);
  }
}
