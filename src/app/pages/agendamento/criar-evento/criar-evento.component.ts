import { ToastrService } from 'ngx-toastr';
import { Agendamento } from './../agendamento';
import { Component, OnInit, ViewChild, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { EventEmitter } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import * as moment from 'moment';
import { Paciente } from '../../pacientes/Paciente';

@Component({
    selector: 'app-criar-evento',
    templateUrl: './criar-evento.component.html',
    styleUrls: ['./criar-evento.component.scss'],
})
export class CriarEventoComponent implements OnInit {
    @ViewChild('createModal') createModal: ModalDirective;
    @Output() modalAgendamento = new EventEmitter();
    @Input() events;

    public isViewMode: boolean;
    public isNew: boolean;
    public newVar: any;

    public agendamento: Agendamento;
    public dias = [
        { id: 0, label: 'Domingo' },
        { id: 1, label: 'Segunda-feira' },
        { id: 2, label: 'Terça-feira' },
        { id: 3, label: 'Quarta-feira' },
        { id: 4, label: 'Quinta-feira' },
        { id: 5, label: 'Sexta-feira' },
        { id: 6, label: 'Sábado' },
    ];

    public tiposConsulta = [
        { id: 0, label: 'Consulta'},
        { id: 1, label: 'Retorno'}
    ]

    public pacientes: Paciente[];

    private medicoId: string;
    public valorConsulta: number;
    public valorRetorno: number;
    private canSave: boolean;
    public pacienteId: string;

    constructor(private angularFire: AngularFireDatabase, private toastr: ToastrService) {
        this.canSave = true;
        this.agendamento = new Agendamento;
    }

    ngOnInit() {
        this.getPacientes();
    }

    showModal(medicoId: string, event?: any, valorConsulta?: number, valorRetorno?: number): void {
        this.medicoId = medicoId;
        this.valorConsulta = valorConsulta;
        this.valorRetorno = valorRetorno;
        if (event) {
            this.pacienteId = event[0].pacienteId;
            this.isNew = false;
            this.agendamento = event[0];
            this.agendamento.startDate = new Date(event[0].startDate);
            event[0].end === undefined ? this.agendamento.end = event.start : this.agendamento.end = event[0].end;
            this.isViewMode = true;
        } else {
            this.isNew = true;
            this.agendamento.allDay = true;
            this.agendamento.repeatEvent = false;
            const x = new Date();
            this.agendamento.id = `${x.getDate()}${x.getMonth() + 1}${x.getUTCFullYear()}` +
                `${x.getHours()}${x.getMinutes()}${x.getSeconds()}${x.getMilliseconds()}`;
            this.isViewMode = false;
        }
        if (this.agendamento.dow) {
            const date = new Date();
            this.agendamento.start = `${date.getFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}T${this.agendamento.start}`;
            this.agendamento.end = `${date.getFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}T${this.agendamento.end}`;
        }
        this.createModal.show();
    }

    dismissModal() {
        this.createModal.hide();
    }

    changeRepeatEvent(e) {
        this.agendamento.repeatEvent = e;
    }

    onSubmit(form: NgForm) {
        const date = form.value.startDate.toISOString().split('T');
        form.value.repeatEvent = this.agendamento.repeatEvent;
        form.value.startDate = form.value.startDate.toISOString();

        form.value.start = `${date[0]}T${this.agendamento.startHour}`;
        form.value.end = `${date[0]}T${this.agendamento.endHour}`;
        form.value.endDate = form.value.startDate;

        form.value.allDay = false;

        form.value.medico = this.medicoId;

        if (this.agendamento.repeatEvent) {
            form.value.start = this.agendamento.startHour;
            form.value.end = this.agendamento.endHour;
            form.value.startRecur = form.value.startDate;
        }

        this._checkDateAndSave(form.value);
    }

    _checkDateAndSave(event: Agendamento) {
        this.canSave = true;
        const currentDay = this.events.filter((el: Agendamento) => el.startDate === event.startDate);

        if (!currentDay.length) {
            this.canSave = true;
        } else {
            currentDay.forEach((el: Agendamento) => {
                if ((event.startHour >= el.startHour && event.endHour >= el.startHour) && (event.startHour >= el.endHour) ||
                    (event.startHour <= el.startHour && event.endHour <= el.startHour) && (event.startHour <= el.endHour) ||
                    el.id === event.id) {
                    return;
                } else {
                    this.canSave = false;
                }
            });
        }

        if (this.canSave) {
            const consulta = {
                data: event.startDate,
                horaInicio: event.startHour,
                horaTermino: event.endHour,
                medico: event.medico,
                valor: event.tipoConsulta === 'Consulta' ? this.valorConsulta : this.valorRetorno,
                status: 'AGENDADO',
                tipoConsulta: event.tipoConsulta
            };

            this.angularFire
                .list(`medicos/${this.medicoId}/agenda`).set(`${this.agendamento.id}`, event)
                .then((t: any) => {
                    this.modalAgendamento.emit(event);
                    this.createModal.hide();

                    this.angularFire.list(`pacientes/${event.pacienteId}/consultas`).set(`${this.agendamento.id}`, consulta);

                });
        } else {
            this.toastr.error(`Ops! Aparentemente já existe um agendamento neste horário!`, 'Conflito de Horário!');
        }

    }

    enableEdit() {
        this.isViewMode = false;
    }

    getPacientes(): void {
        this.angularFire.list(`pacientes`).valueChanges().subscribe(
            (pacientes: Paciente[]) => this.pacientes = pacientes
        );
    }

}
