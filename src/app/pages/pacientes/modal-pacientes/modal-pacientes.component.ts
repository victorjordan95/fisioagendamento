import { AngularFireAuth } from 'angularfire2/auth';
import { NgForm } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { ModalDirective } from 'ngx-bootstrap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Paciente } from '../Paciente';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-modal-pacientes',
    templateUrl: './modal-pacientes.component.html',
    styleUrls: ['./modal-pacientes.component.scss'],
    providers: [AngularFireAuth]
})
export class ModalPacientesComponent implements OnInit {

    @ViewChild('createModal') createModal: ModalDirective;
    public paciente: Paciente;
    public isEditing = false;
    private DEFAULT_PASSWORD = 'novofisio';

    constructor(private afAuth: AngularFireAuth, private toastr: ToastrService, private angularFire: AngularFireDatabase) {
        this.paciente = new Paciente;
    }

    ngOnInit() {
    }

    showModal(e?) {
        if (e) {
            this.paciente = e;
            this.isEditing = true;
        } else {
            this.isEditing = false;
            const x = new Date();
            this.paciente.id = `${x.getDate()}${x.getMonth() + 1}${x.getUTCFullYear()}` +
            `${x.getHours()}${x.getMinutes()}${x.getSeconds()}${x.getMilliseconds()}`;
        }
        this.createModal.show();
    }

    dismissModal() {
        this.createModal.hide();
    }

    onSubmit(form: NgForm) {
        this.angularFire.list(`pacientes/`).set(`${this.paciente.id}`, form.value).then((t: any) => {
            this.createModal.hide();
            this.toastr.success('Paciente salvo com sucesso!', 'Sucesso!');
        });
    }

}
