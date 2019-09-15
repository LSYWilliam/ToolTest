import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

/**
 * @class StatusComponent
 */
@Component({
    selector: 'app-status',
    templateUrl: './status.component.html',
    styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit, ICellRendererAngularComp {

    public params: any;
    public statusList: any;

    constructor() {
        this.statusList = ['开启', '关闭'];
    }

    agInit(params: any): void {
        this.params = params;
    }

    public getMail(event) {
        this.params.value = event;
        this.params.data.isEmailDes = event;
        switch(this.params.data.isEmailDes) {
            case "开启" :
                this.params.data.isEmail=1;
                break;
            case "关闭" :
                this.params.data.isEmail=0;
                break;
        }
    }

    refresh(): boolean {
        return false;
    }

    ngOnInit() {

    }
}
