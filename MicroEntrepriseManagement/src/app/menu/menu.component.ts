import { Component, OnInit } from '@angular/core';
import { MenuModel } from './Models/menu-model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public menus: Array<MenuModel>;
  public title = "MicroEntrepriseManagement";

  constructor() {
    this.menus = new Array<MenuModel>();
    this.initMenus();
  }

  ngOnInit(): void {
  }

  public initMenus(): void {
    this.menus = [
      new MenuModel('Dashboard', 'dashboard'),
      new MenuModel('Facturation', 'encaissement'),
      new MenuModel('TVA', 'tva'),
    ];
  }

}
