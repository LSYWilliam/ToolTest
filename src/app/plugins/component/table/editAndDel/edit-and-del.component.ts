import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-offline',
  templateUrl: './edit-and-del.component.html',
  styleUrls: ['./edit-and-del.component.scss']
})
export class EditAndDelComponent implements OnInit {
    public params: any;

    constructor(private router: Router) {}

    agInit(params: any): void {
        this.params = params;
    }

    ngOnInit() {

    }
}
