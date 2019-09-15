import { Component, OnInit } from '@angular/core';
import {ApplicationStoreService} from "../service/application-store.service";

@Component({
  selector: 'app-application-store',
  templateUrl: './application-store.component.html',
  styleUrls: ['./application-store.component.scss']
})
export class ApplicationStoreComponent extends ApplicationStoreService implements OnInit {

  ngOnInit() {
  }

}
