import { ToastrService } from 'ngx-toastr';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Paciente } from '../pacientes/Paciente';
import { ActivatedRoute } from '@angular/router';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

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
    public consultas: any[] = [];

    public filter = '';
    public page = 1;
    public key = 'nome';
    public reverse = true;

    ref: AngularFireStorageReference;
    task: AngularFireUploadTask;
    uploadState: Observable<string>;
    uploadProgress: Observable<number>;
    downloadURL: Observable<string>;
    uploadPercent: any;
    imgUploaded: any;

    constructor(
        private angularFire: AngularFireDatabase,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        private afStorage: AngularFireStorage
        ) {
        this.isLoaded = false;
        this.route.params.subscribe(params => this.userId = params['id']);
    }

    upload(event) {
        this.ref = this.afStorage.ref(`/upload/patient/${this.userId}`);
        this.task = this.ref.put(event.target.files[0]);
        this.uploadPercent = this.task.percentageChanges();

        this.task.snapshotChanges().pipe(
            finalize(() => {
              this.downloadURL = this.ref.getDownloadURL();
              this.downloadURL.subscribe(url => {
                this.imgUploaded = url;
                const data = {...this.paciente, fotoPerfil: url};
                this.angularFire.list(`pacientes/`).set(`${this.userId}`, data).then((t: any) => {
                    this.toastr.success('Foto atualizada com sucesso!', 'Sucesso!');
                });
              });
            })
          )
        .subscribe();

    }

    ngOnInit() {
        this.getPaciente(this.userId);
    }

    getPaciente(id: string | number) {
        this.isLoaded = false;
        this.angularFire.object(`pacientes/${id}`).valueChanges().subscribe(
            (paciente: any) => {
                this.paciente = paciente;
                this.getConsultas(id);
            }
        );
    }

    getConsultas(id: string | number) {
        this.angularFire.object(`pacientes/${id}/consultas`).valueChanges().subscribe(
            (consultas: any) => {
                for (const consulta in consultas) {
                    if (consulta) {
                        this.consultas.push(consultas[consulta])
                    }
                }
                this.isLoaded = true;
            }
        );
    }

    sort(key: string) {
        this.key = key;
        this.reverse = !this.reverse;
    }


}
