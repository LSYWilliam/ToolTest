import {Component, OnInit} from '@angular/core';
import {VersionModel} from "../model/version.model";

/**
 * table效果组件
 * @class FirmwareStatusComponent
 */
@Component({
    selector: 'app-firmware-status',
    templateUrl: './firmware-status.component.html',
    styleUrls: ['./firmware-status.component.scss']
})
export class FirmwareStatusComponent implements OnInit {
    // public params: VersionModel = new VersionModel();
    public params: any;
    // public show: boolean;

    constructor() {
    }
    agInit(params: any): void {
        // let data: VersionModel = <VersionModel> params.value;
        // if (data === null ||
        //     data === {}) {
        //     this.show = false;
        //     this.params = data;
        // } else {
        //     this.show = true;
        //     this.params.versionStatusName = data.versionStatusName;
        // }
        if (params.value === null ||
            params.value === {} ||
            params.value === [] ||
            params.value === '') {
            this.params = null;
        } else {
            this.params = params.value;
        }
    }
    ngOnInit() {

    }
}
