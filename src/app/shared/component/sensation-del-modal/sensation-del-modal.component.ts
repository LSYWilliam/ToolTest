import {Component, Input, OnInit} from '@angular/core';
import {NzModalSubject} from "ng-zorro-antd";

/**
 * 删除模态框模块
 * @class ConfirmModalComponent
 */
@Component
({
    selector: 'app-sensation-del-modal',
    templateUrl: './sensation-del-modal.component.html',
    styleUrls: ['./sensation-del-modal.component.scss'],
})

export class SensationDelModalComponent implements OnInit  {
    public text: string;

    constructor(private subject: NzModalSubject) {}

    /**点击删除模态框确定按钮*/
    handleOk() {
        if (this.text === undefined || this.text === null) {
            this.subject.next("data|");
        } else {
            this.subject.next("data|" + this.text);
        }

        this.subject.destroy('onOk' );
    }

    /**点击删除模态框取消按钮*/
    handleCancel(e) {
        this.subject.destroy('onCancel');
    }

    ngOnInit() {}
}
