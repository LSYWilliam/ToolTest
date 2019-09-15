import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {NzMessageService, NzModalSubject} from 'ng-zorro-antd';
import * as ClipboardJS from 'clipboard';
/**
 * 重置密码模态框模块
 * @class PasswordResetModalComponent
 */
@Component
({
    selector: 'app-password-reset-modal',
    templateUrl: './password-reset-modal.component.html',
    styleUrls: ['./password-reset-modal.component.scss'],
})

export class PasswordResetModalComponent implements OnInit,OnDestroy {
    /**用于初始化重置密码模态框数据*/
    @Input() public userPasswordItems: any;
    /**剪切板*/
    public clipboard: any;
    constructor(private subject: NzModalSubject,public _nzMessage: NzMessageService) {
        this.subject.on('onDestory', () => {
        });
    }
    /**模态框取消按钮*/
    handleCancel(e) {
        this.subject.destroy('onCancel');
    }
    /**剪切板功能*/
    initClipboard() {
        this.clipboard = new ClipboardJS('.copy2Clipboard', {
            target: function(trigger) {
                /**具体的密码值藏在trigger.previousElementSibling.children[0].value里*/
                return trigger.previousElementSibling;
        }});
        this.clipboard.on('success', e => {
            this._nzMessage.info('该密码已经复制到剪切板里面了!');
            e.clearSelection();
        });
    }
    /**取消订阅*/
    ngOnDestroy() {
        this.clipboard.destroy();
    }
    /**
     * 页面初始化数据*/
    ngOnInit() {
        this.initClipboard();
    }

}
