import { Component, Inject, OnInit } from '@angular/core';
import { AppComponent} from '../../app.component';
import { SideMenuState } from '../../side-menu-state';
@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {
  //isMenuExpanded: boolean = false;
  //isCollapsed: boolean[] = [false, false];

  constructor(public sideMenuState: SideMenuState) { }

  ngOnInit() {
    this.sideMenuState.isMenuExpanded = true;
  }
}
