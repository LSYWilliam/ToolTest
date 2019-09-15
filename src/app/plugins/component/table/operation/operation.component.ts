import {Component, OnInit} from '@angular/core';


/**
 * table效果组件
 * @class TableComponent
 */
@Component({
    selector: 'app-operation',
    templateUrl: './operation.component.html',
    styleUrls: ['./operation.component.scss']
})
export class OperationComponent implements OnInit {
    public params: any;
    private data: any;

    constructor() {
    }
    agInit(params: any): void {
        this.params = params.data.operation;
    }
    ngOnInit() {
    }
}
