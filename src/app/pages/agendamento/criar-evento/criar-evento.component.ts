import { ToastrService } from 'ngx-toastr';
import { Agendamento } from './../agendamento';
import { Component, OnInit, ViewChild, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { EventEmitter } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';

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

    private consultorioId: string;
    private canSave: boolean;

    constructor(private angularFire: AngularFireDatabase, private toastr: ToastrService) {
        this.canSave = true;
        this.agendamento = new Agendamento;
    }

    ngOnInit() {
    }

    showModal(consultorioId: string, event?: any): void {
        this.consultorioId = consultorioId;
        if (event) {
            this.isNew = false;
            this.agendamento = event[0];
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
        form.value.repeatEvent = this.agendamento.repeatEvent;
        form.value.start = `${this.agendamento.startDate}T${this.agendamento.startHour}`;
        form.value.end = `${this.agendamento.startDate}T${this.agendamento.endHour}`;
        form.value.endDate = form.value.startDate;
        form.value.allDay = false;

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
            debugger;
            this.angularFire
                .list(`consultorios/${this.consultorioId}/agenda`).set(`${this.agendamento.id}`, event)
                .then((t: any) => {
                    this.modalAgendamento.emit(event);
                    this.createModal.hide();
                });
        } else {
            this.toastr.error(`Ops! Aparentemente já existe um evento neste horário!`, 'Conflito de Horário!');
        }

    }

    enableEdit() {
        this.isViewMode = false;
    }

}
