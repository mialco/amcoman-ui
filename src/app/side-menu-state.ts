import { Injectable, OnInit } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SideMenuState implements OnInit {

    isCollapsed: Array<boolean> = [false, false];
    isMenuExpanded: boolean = false;

    ngOnInit(): void {
        this.isMenuExpanded = true;
    }
}

