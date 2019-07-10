import { ModalPacientesComponent } from './modal-pacientes/modal-pacientes.component';
import { ToastrService } from 'ngx-toastr';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
    selector: 'app-pacientes',
    templateUrl: './pacientes.component.html',
    styleUrls: ['./pacientes.component.scss'],
    providers: [AngularFireAuth, AngularFireDatabase]
})
export class PacientesComponent implements OnInit {

    @ViewChild(ModalPacientesComponent) modalComponent: ModalPacientesComponent;
    public pacientes;
    public isLoaded = false;
    public filter = '';
    public page = 1;
    public key = 'nome';
    public reverse = false;

    constructor(private angularFire: AngularFireDatabase, private afAuth: AngularFireAuth, private toastr: ToastrService) {
    }

    ngOnInit() {
        this.getPacientes();
    }

    showModal(e?) {
        this.modalComponent.showModal(e);
    }

    getPacientes() {
        this.isLoaded = false;
        this.angularFire.list(`pacientes`).valueChanges().subscribe(
            data => {
                this.pacientes = data;
                this.isLoaded = true;
            }
        );
    }

    sort(key: string) {
        this.key = key;
        this.reverse = !this.reverse;
    }

}
