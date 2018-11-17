import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class SharedService {

    // Theming
    maTheme: string;
    maThemeSubject: Subject<string> = new Subject<string>();

    // Sidebar visibility
    public sidebarVisible;
    sidebarVisibilitySubject: Subject<boolean> = new Subject<boolean>()

    constructor() {
        // Hidden the sidebar by default
        this.sidebarVisible = false;

        // Set default theme as green
        this.maTheme = 'red';
    }


    toggleSidebarVisibilty() {
        this.sidebarVisible = !this.sidebarVisible;
        this.sidebarVisibilitySubject.next(this.sidebarVisible);
    }

    setTheme(color) {
        this.maTheme = color;
        this.maThemeSubject.next(this.maTheme);
    }


}