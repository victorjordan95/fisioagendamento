import { AngularFireAuth } from 'angularfire2/auth';
import { NgForm } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { ModalDirective } from 'ngx-bootstrap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Consultorio } from '../Consultorio';

@Component({
    selector: 'app-modal-consultorios',
    templateUrl: './modal-consultorios.component.html',
    styleUrls: ['./modal-consultorios.component.scss'],
    providers: [AngularFireAuth]
})
export class ModalConsultoriosComponent implements OnInit {

    @ViewChild('createModal') createModal: ModalDirective;
    public consultorio: Consultorio;
    public isEditing = false;

    constructor(private toastr: ToastrService, private angularFire: AngularFireDatabase) { }

    ngOnInit() {
    }

    showModal(e?) {
        if (e) {
            this.consultorio = e;
            this.isEditing = true;
        } else {
            this.isEditing = false;
            this.consultorio = new Consultorio;
            const x = new Date();
            this.consultorio.id = `${x.getDate()}${x.getMonth() + 1}${x.getUTCFullYear()}` +
            `${x.getHours()}${x.getMinutes()}${x.getSeconds()}${x.getMilliseconds()}`;
        }
        this.createModal.show();
    }

    dismissModal() {
        this.createModal.hide();
    }

    onSubmit(form: NgForm) {
        this.angularFire.list(`consultorios/`).set(`${this.consultorio.id}`, form.value).then((t: any) => {
            this.createModal.hide();
            this.toastr.success('Consultório salvo com sucesso!', 'Sucesso!');
        });
        this.consultorio = new Consultorio;
    }

}
