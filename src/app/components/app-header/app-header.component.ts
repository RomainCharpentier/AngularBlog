import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PROJECT_NAME } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  title = PROJECT_NAME;
  user: any;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  login(): void {
    this.authService.login();
  }

  logout(): void {
    this.authService.logout();
  }

}
