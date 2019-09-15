import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';

/**
 * @class EditComponent
 */
@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, ICellRendererAngularComp {

    public params: any;

    constructor(private router: Router) {

    }

    agInit(params: any): void {
        this.params = params;
    }

    public getRouter() {
    }

    refresh(): boolean {
        return false;
    }

    ngOnInit() {

    }
}
