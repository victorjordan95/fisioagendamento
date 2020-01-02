import { AngularFireAuth } from 'angularfire2/auth';
import { NgForm } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { ModalDirective } from 'ngx-bootstrap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Medico } from '../Medico';

@Component({
    selector: 'app-modal-medicos',
    templateUrl: './modal-medicos.component.html',
    styleUrls: ['./modal-medicos.component.scss'],
    providers: [AngularFireAuth]
})
export class ModalMedicosComponent implements OnInit {

    @ViewChild('createModal') createModal: ModalDirective;
    public medico: Medico;
    public isEditing = false;
    private DEFAULT_PASSWORD = 'novofisio';

    constructor(private afAuth: AngularFireAuth, private toastr: ToastrService, private angularFire: AngularFireDatabase) {
        this.medico = new Medico;
    }

    ngOnInit() {
    }

    showModal(e?: Medico) {
        if (e) {
            this.medico = e;
            this.isEditing = true;
            this.medico.dataNascimento = new Date(e.dataNascimento);
        } else {
            this.isEditing = false;
            const x = new Date();
            this.medico.id = `${x.getDate()}${x.getMonth() + 1}${x.getUTCFullYear()}` +
            `${x.getHours()}${x.getMinutes()}${x.getSeconds()}${x.getMilliseconds()}`;
        }
        this.createModal.show();
    }

    dismissModal() {
        this.createModal.hide();
    }

    onSubmit(form: NgForm) {
        form.value.dataNascimento = form.value.dataNascimento.toLocaleDateString();
        if (this.isEditing) {
            this.angularFire.list(`medicos/`).set(`${this.medico.id}`,
                {...form.value, 'agenda': {...this.medico.agenda}}
            )
                .then((t: any) => {
                this.createModal.hide();
                this.toastr.success('Médico editado com sucesso!', 'Sucesso!');
            });
        } else {
            this.afAuth.auth.createUserWithEmailAndPassword(
                form.controls.email.value,
                this.DEFAULT_PASSWORD
            ).then((ok: any) => {
                this.medico.id = ok.user.uid;
                form.value.id = ok.user.uid;
                this.angularFire.list(`medicos/`).set(`${this.medico.id}`, form.value).then((t: any) => {
                    this.createModal.hide();
                    this.toastr.success('Médico cadastrado com sucesso!', 'Sucesso!');
                });
            }).catch(err => {
                if (err.code === 'auth/email-already-in-use') {
                    this.toastr.error('Este e-mail já foi utilizado, use outro, por favor!', 'Erro!');
                }
            });
        }
    }

}
