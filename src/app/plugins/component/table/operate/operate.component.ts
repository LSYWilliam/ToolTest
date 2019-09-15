import {Component, EventEmitter, OnInit, Output} from '@angular/core';


/**
 * 操作组件组件
 * @class OperateComponent
 */
@Component({
    selector: 'app-operate',
    templateUrl: './operate.component.html',
    styleUrls: ['./operate.component.scss']
})
export class OperateComponent implements OnInit {
    public params: any;
    constructor() {
    }
    agInit(params: any): void {
        this.params = params;
    }
    ngOnInit() {

    }
}
