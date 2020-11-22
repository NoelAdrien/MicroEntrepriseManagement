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

  public submitConnexionForm(): void {
    if (this.isConnexion) {
      this.connexion();
    } else {
      this.createNewUser();
    }

    this.closebutton.nativeElement.click();
  }

  private createNewUser(): void {
    this.authService.createNewUser(this.email, this.password).then(
      () => {
        // this.router.navigate(['/books']);
        console.log('création compte success')
      },
      (error) => {
        // this.errorMessage = error;
        console.log(`Erreur création compte : ${error}`);
      }
    );
  }

  private connexion(): void {
    this.authService.signInUser(this.email, this.password).then(
      () => {
        console.log('Connexion OK');
      },
      (error) => {
        console.log(`Erreur connexion : ${error}`);
      }
    );
  }
}
