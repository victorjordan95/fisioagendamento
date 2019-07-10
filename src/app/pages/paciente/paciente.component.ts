import { ToastrService } from 'ngx-toastr';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Paciente } from '../pacientes/Paciente';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-paciente',
    templateUrl: './paciente.component.html',
    styleUrls: ['./paciente.component.scss'],
    providers: [AngularFireAuth, AngularFireDatabase]
})
export class PacienteComponent implements OnInit {
    public paciente: Paciente[];
    public isLoaded: boolean;
    public userId: string;

    constructor(
        private angularFire: AngularFireDatabase, 
        private route: ActivatedRoute,
        private toastr: ToastrService
        ) {
        this.isLoaded = false;
        this.route.params.subscribe(params => this.userId = params['id']);
    }

    ngOnInit() {
        this.getPaciente(this.userId);
    }

    getPaciente(id: string | number) {
        this.isLoaded = false;
        this.angularFire.object(`pacientes/${id}`).valueChanges().subscribe(
            (paciente: Paciente[]) => {
                this.paciente = paciente;
                this.isLoaded = true;
            }
        );
    }

}
