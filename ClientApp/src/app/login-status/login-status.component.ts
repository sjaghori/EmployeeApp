import { Component, OnInit, OnDestroy } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit, OnDestroy {


  public isLogged = false;
  public userName: string;
  public userEmail: string;

  private jwtHelperService: JwtHelperService = new JwtHelperService();
  private authSubscription: Subscription;

  constructor(private oAuthService: OAuthService, ) {}

  ngOnInit(): void {
    this.authSubscription = this.oAuthService.events.subscribe(_ => this.updateStatus());
    this.updateStatus();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  private updateStatus() {
    this.isLogged = this.oAuthService.hasValidAccessToken();

    if (this.isLogged) {
      const token = this.oAuthService.getAccessToken();
      const decodedToken = this.jwtHelperService.decodeToken(token);
      this.userName = decodedToken.name;
      this.userEmail = decodedToken.email;
    } else {
      this.userName = null;
      this.userEmail = null;
    }
  }

  public logIn() {
    this.oAuthService.initImplicitFlow();
  }

  public logOut() {
    this.oAuthService.logOut();
  }

}
