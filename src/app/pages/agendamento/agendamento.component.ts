import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { CriarEventoComponent } from './criar-evento/criar-evento.component';

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

    public user: string;
    public calendarOptions = {
        height: 'parent',
        fixedWeekCount: false,
        defaultDate: new Date(),
        defaultView: window.innerWidth > 768 ? 'basicDay' : 'agendaWeek',
        editable: true,
        locale: 'pt-BR',
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay,list'
        },
        buttonText: {
            prev: 'Anterior',
            next: 'Próximo',
            today: 'Hoje',
            month: 'Mês',
            week: 'Semana',
            day: 'Dia',
            list: 'Lista'
        },
        eventLimit: true,
        events: [],
        eventClick: (event, jsEvent, view) => {
            const clickedEvent = this.calendarOptions.events.filter(element => element.id === event.id);
            this.showModal(clickedEvent);
        },
        dayClick: function(date, jsEvent, view) {
            alert('Clicked on: ' + date.format());
        },
        timeFormat: 'HH:mm',
        eventOverlap: false,
        allDaySlot: true
    };

    constructor(private angularFire: AngularFireDatabase, private afAuth: AngularFireAuth, private toastr: ToastrService) {
    }

    ngOnInit() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.userId = user.uid;
                this.getEvents();
            }
        });
    }

    showModal(event?) {
        this.modalComponent.showModal(this.userId, event);
    }

    getEvents() {
        this.calendarIsLoaded = false;
        this.angularFire.list(`${this.userId}/agenda`).valueChanges().subscribe(
            events => {
                const eventos = events;
                this.calendarOptions.events = eventos;
                this.calendarIsLoaded = true;
            }
        );
    }

    updateSchedules(e) {
        this.toastr.success(`Evento "${e.title}" foi cadastrado com sucesso `, 'Sucesso!');
        this.getEvents();
    }

}
