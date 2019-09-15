import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VersionModel } from "../model/version.model";

/**
 * table效果组件 -- 更新
 * @class
 */
@Component({
    selector: 'app-firmware',
    templateUrl: './firmware.component.html',
    styleUrls: ['./firmware.component.scss']
})
export class FirmwareComponent implements OnInit {
    // public params: VersionModel = new VersionModel();
    public params: any;
    // public show: boolean;

    constructor(private router: Router) {}

    agInit(params: any): void {
        // let data: VersionModel = <VersionModel> params.value;
        // if (data === null ||
        //     data === {}) {
        //     this.show = false;
        //     this.params = data;
        // } else {
        //     this.show = true;
        //     this.params.typeName = data.typeName;
        //     this.params.deviceName = data.deviceName;
        //     this.params.version = data.version;
        // }
        this.params = params;
        // if (params.value === null ||
        //     params.value === {} ||
        //     params.value === [] ||
        //     params.value === '') {
        //     this.params = null;
        // } else {
        //     this.params = params.value;
        // }
    }

    ngOnInit() {

    }
}
