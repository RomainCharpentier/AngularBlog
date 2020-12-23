import { Component, OnInit } from '@angular/core';
import { PROJECT_NAME } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  title = PROJECT_NAME;
  user: any;

  constructor() { }

  ngOnInit(): void {
  }

  logout(): void {

  }

}
