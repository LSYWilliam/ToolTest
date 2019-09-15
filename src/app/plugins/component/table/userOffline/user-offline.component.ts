import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-offline',
  templateUrl: './user-offline.component.html',
  styleUrls: ['./user-offline.component.scss']
})
export class UserOfflineComponent implements OnInit {
    public params: any;

    constructor(private router: Router) {}

    agInit(params: any): void {
        this.params = params;
    }

    ngOnInit() {

    }
}
