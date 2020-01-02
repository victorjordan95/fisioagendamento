import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'app-verificar-horario',
  templateUrl: './verificar-horario.component.html',
  styleUrls: ['./verificar-horario.component.scss']
})
export class VerificarHorarioComponent implements OnInit {
  @ViewChild('createModal') createModal: ModalDirective;
  @Input() events: any;
  private SCHEDULE_LIST = [
    '08:00', '08:15', '08:30', '08:45',
    '09:00', '09:15', '09:30', '09:45',
    '10:00', '10:15', '10:30', '10:45',
    '11:00', '11:15', '11:30', '11:45',
    '12:00', '12:15', '12:30', '12:45',
    '13:00', '13:15', '13:30', '13:45',
    '14:00', '14:15', '14:30', '14:45',
    '15:00', '15:15', '15:30', '15:45',
    '16:00', '16:15', '16:30', '16:45',
    '17:00', '17:15', '17:30', '17:45',
    '18:00', '18:15', '18:30', '18:45',
    '19:00', '19:15', '19:30', '19:45',
  ];
  public currentCheckingDate = new Date();
  public availableHour = [];

  constructor() { }

  ngOnInit() {
  }

  showModal(): void {
    this.createModal.show();
    this.getWeekSchedules().then(res => {
      this.getAvailableDays(res);
    });
  }

  public checkNewDate (e) {
    this.currentCheckingDate = e;
  }

  private async getWeekSchedules () {

    const weekSchedules = this.events.filter((schedule: any) => {
      const scheduleDate = moment(new Date(schedule.start));
      const oneDayAfter = moment(new Date().setDate(new Date().getDate() + 1));
      const nowDate = moment(this.currentCheckingDate);
      return moment(scheduleDate).isAfter(nowDate) && moment(scheduleDate).isBefore(oneDayAfter);
    });

    await Promise.resolve(weekSchedules);
    return weekSchedules.map((schedule: any) => schedule.startHour);
  }

  getAvailableDays(schedules: any) {
    this.availableHour = this.SCHEDULE_LIST.filter((hour) => !schedules.includes(hour));
  }

  dismissModal() {
    this.createModal.hide();
  }

}
