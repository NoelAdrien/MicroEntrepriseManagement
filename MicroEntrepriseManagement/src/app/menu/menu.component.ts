import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthentificationService } from '../shared/Services/authentification.service';
import { MenuModel } from './Models/menu-model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public menus: Array<MenuModel>;
  public title = "MicroEntrepriseManagement";

  public isAuthenticated: boolean;

  constructor(private authService: AuthentificationService) {
    this.menus = new Array<MenuModel>();
    this.initMenus();
  }

  ngOnInit(): void {
    firebase.default.auth().onAuthStateChanged(
      (user) => {
        if(user) {
          this.isAuthenticated = true;
        } else {
          this.isAuthenticated = false;
        }
      }
    );
  }

  public signout(): void {
    this.authService.signOutUser();
  }

  public initMenus(): void {
    this.menus = [
      new MenuModel('Dashboard', 'dashboard'),
      new MenuModel('Facturation', 'encaissement'),
      new MenuModel('TVA', 'tva'),
    ];
  }

}
