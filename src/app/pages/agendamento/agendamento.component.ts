import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { CriarEventoComponent } from './criar-evento/criar-evento.component';
import { Medico } from '../medicos/Medico';

@Component({
    selector: 'app-agendamento',
    templateUrl: './agendamento.component.html',
    styleUrls: ['./agendamento.component.scss'],
    providers: [AngularFireDatabase, AngularFireAuth],
    encapsulation: ViewEncapsulation.None
})
export class AgendamentoComponent implements OnInit {
    @ViewChild(CriarEventoComponent) modalComponent: CriarEventoComponent;

    public calendarIsLoaded = false;
    public userId: string;

    public medicos: Medico[];
    public selectedMedico: any;
    public selectedMedicoId: string;

    public user: string;
    public calendarOptions: any = {
        allDayText: 'Dia todo',
        height: 'parent',
        slotLabelFormat: 'h:mm',
        slotLabel: true,
        fixedWeekCount: false,
        defaultDate: new Date(),
        defaultView: window.innerWidth > 768 ? 'month' : 'list',
        displayEventTime: true,
        editable: true,
        locale: 'pt-BR',
        nowIndicator: true,
        eventLimit: true,
        events: [],
        eventClick: (event, jsEvent, view) => {
            const clickedEvent = this.calendarOptions.events.filter(element => element.id === event.id);
            this.showModal(clickedEvent);
        },
        dayClick: function (date, jsEvent, view) {
            alert('Clicked on: ' + date.format());
        },
        timeFormat: 'HH:mm',
        eventOverlap: false,
        allDaySlot: true
    };

    constructor(private angularFire: AngularFireDatabase, private afAuth: AngularFireAuth, private toastr: ToastrService) {
        if (window.innerWidth > 768) {
            this.calendarOptions.header = {
                left: 'prev,next today',
                center: 'title',
                right: 'month, agendaWeek, agendaDay, list'
            };
            this.calendarOptions.buttonText = {
                prev: 'Anterior',
                next: 'Próximo',
                today: 'Hoje',
                month: 'Mês',
                week: 'Semana',
                day: 'Dia',
                list: 'Lista'
            };
        } else {
            this.calendarOptions.header = {
                left: 'prev,next today',
                center: 'title',
                right: 'listMonth, listWeek, list'
            };
            this.calendarOptions.buttonText = {
                prev: 'Anterior',
                next: 'Próximo',
                today: 'Hoje',
                listMonth: 'Mês',
                listWeek: 'Semana',
                list: 'Dia',
            };
        }
    }

    ngOnInit() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.userId = user.uid;
                this.getMedicos();
            }
        });
    }

    showModal(event?: any) {
        this.modalComponent.showModal(this.selectedMedicoId, event);
    }


    updateConsultorio(e: any) {
        this.selectedMedicoId = e;
        this.getEvents(e);
    }

    updateSchedules(e: any) {
        this.toastr.success(`Evento "${e.title}" foi cadastrado com sucesso `, 'Sucesso!');
        this.getEvents(this.selectedMedico.id);
    }


    getEvents(medico: string) {
        this.calendarIsLoaded = false;
        this.angularFire.list(`medicos/${medico}/agenda`).valueChanges().subscribe(
            events => {
                const eventos = events;
                this.calendarOptions.events = eventos;
                this.calendarIsLoaded = true;
            }
        );
    }

    getMedicos() {
        this.angularFire.list(`medicos`).valueChanges().subscribe(
            (medicos: Medico[]) => {
                this.medicos = medicos;
                this.selectedMedico = this.medicos[0];
                this.selectedMedicoId = this.selectedMedico.id;
                this.getEvents(this.selectedMedico.id);
            }
        );
    }
}
