import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

/**
 * @class ApInputComponent
 */
@Component({
    selector: 'app-ap-input',
    templateUrl: './apInput.component.html',
    styleUrls: ['./apInput.component.scss']
})
export class ApInputComponent implements OnInit, ICellRendererAngularComp {

    public params: any;

    constructor() {

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
