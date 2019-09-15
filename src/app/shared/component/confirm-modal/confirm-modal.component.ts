import {Component, Input, OnInit} from '@angular/core';
import {NzModalSubject} from "ng-zorro-antd";

/**
 * 删除模态框模块
 * @class ConfirmModalComponent
 */
@Component
({
    selector: 'app-confirm-modal',
    templateUrl: './confirm-modal.component.html',
    styleUrls: ['./confirm-modal.component.scss'],
})

export class ConfirmModalComponent implements OnInit  {
    /**删除模态框标题*/
    public info: string;
    /**渲染删除模态框时i，初始化模态框的数据*/
    @Input()
    set name(value: string) {
        this.info = value;
    }
    constructor(private subject: NzModalSubject) {}
    /**点击删除模态框确定按钮*/
    handleOk() {
        this.subject.destroy('onOk');
    }
    /**点击删除模态框取消按钮*/
    handleCancel(e) {
        this.subject.destroy('onCancel');
    }
    ngOnInit() {}
}
