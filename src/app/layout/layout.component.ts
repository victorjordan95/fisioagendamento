import { SharedService } from './../shared/services/shared.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  providers: [SharedService]
})
export class LayoutComponent implements OnInit {

  maTheme: string = this.sharedService.maTheme;

  constructor(private sharedService: SharedService) {
    sharedService.maThemeSubject.subscribe((value) => {
      this.maTheme = value
    })
  }

  ngOnInit() {
  }

}
