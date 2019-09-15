import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

/**
 * @class ThresholdComponent
 */
@Component({
    selector: 'app-threshold',
    templateUrl: './threshold.component.html',
    styleUrls: ['./threshold.component.scss']
})
export class ThresholdComponent implements OnInit, ICellRendererAngularComp {

    public params: any;
    public isValue: boolean;

    agInit(params: any): void {
        this.params = params;
        if((typeof this.params.value==="object")) {
            this.isValue=false;
        } else {
            this.isValue=true;
        }
    }

    public getLiVal(event) {
        this.params.value.value = event;
    }

    refresh(): boolean {
        return false;
    }

    ngOnInit() {

    }
}
