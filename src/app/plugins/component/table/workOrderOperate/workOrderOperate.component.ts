import {Component} from '@angular/core';

/**
 * table表格的操作组件
 * @class WorkOrderOperateComponent
 */
@Component({
    templateUrl: './workOrderOperate.component.html',
    styleUrls: ['./workOrderOperate.component.scss']
})

export class WorkOrderOperateComponent {
    public params: any;
    public operateArr: any;
    /** 构造函数 */
    constructor() {
        this.operateArr = [];
    }
    agInit(params: any): void {
        for (let item in params.data) {
            if (!isNaN(Number(item))) {
                this.operateArr.push(item);
            }
        }
        this.params = params;
    }
}



