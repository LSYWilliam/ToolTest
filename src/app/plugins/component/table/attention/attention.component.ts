import {Component, EventEmitter, OnInit, Output} from '@angular/core';


/**
 * 操作组件组件
 * @class OperateComponent
 */
@Component({
    selector: 'app-operate',
    templateUrl: './attention.component.html',
    styleUrls: ['./attention.component.scss']
})
export class AttentionComponent implements OnInit {
    public params: any;
    constructor() {
    }
    agInit(params: any): void {
        this.params = params;
    }
    ngOnInit() {

    }
}
