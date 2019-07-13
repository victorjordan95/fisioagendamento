import { AngularFireAuth } from 'angularfire2/auth';
import { NgForm } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { ModalDirective } from 'ngx-bootstrap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Paciente } from '../Paciente';
import { ToastrService } from 'ngx-toastr';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

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

    ref: AngularFireStorageReference;
    task: AngularFireUploadTask;
    uploadState: Observable<string>;
    uploadProgress: Observable<number>;
    downloadURL: Observable<string>;
    uploadPercent: any;
    imgUploaded: any;

    constructor(
        private toastr: ToastrService,
        private angularFire: AngularFireDatabase,
        private afStorage: AngularFireStorage) {
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

    upload(event) {

        // const id = Math.random().toString(36).substring(2);

        // this.storage.upload(path, file);
        this.ref = this.afStorage.ref(`/upload/patient/${this.paciente.id}`);
        this.task = this.ref.put(event.target.files[0]);
        this.uploadPercent = this.task.percentageChanges();

        this.task.snapshotChanges().pipe(
            finalize(() => {
              this.downloadURL = this.ref.getDownloadURL();
              this.downloadURL.subscribe(url => {
                this.paciente.fotoPerfil = url;
              });
            })
          )
        .subscribe();

    }

    onSubmit(form: NgForm) {
        form.value.fotoPerfil = this.paciente.fotoPerfil;
        this.angularFire.list(`pacientes/`).set(`${this.paciente.id}`, form.value).then((t: any) => {
            this.createModal.hide();
            this.toastr.success('Paciente salvo com sucesso!', 'Sucesso!');
        });
    }

}
