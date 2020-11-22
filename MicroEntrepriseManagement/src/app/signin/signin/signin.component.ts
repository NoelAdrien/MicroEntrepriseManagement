import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthentificationService } from 'src/app/shared/Services/authentification.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  @ViewChild('closeButton') closebutton;

  public isConnexion: boolean = true;
  public email: string;
  public password: string;

  constructor(private authService: AuthentificationService) { }

  ngOnInit(): void {
  }

  public changeFormType(): void {
    this.isConnexion = !this.isConnexion;
  }

  public submitForm(): void {
    console.log(this.email);
    if (this.isConnexion) {
      this.authService.signInUser(this.email, this.password);
      this.closebutton.nativeElement.click();
      return;
    }

    this.authService.createNewUser(this.email, this.password);
    this.closebutton.nativeElement.click();
  }
}
