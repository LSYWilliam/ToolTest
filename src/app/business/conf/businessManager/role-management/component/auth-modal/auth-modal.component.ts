import {
  Component, Input,  OnInit
} from '@angular/core';
import { NzModalSubject } from 'ng-zorro-antd';
/**
 * 编辑权限模块
 * @class AuthModalComponent
 */
@Component
({
    selector: 'app-auth-modal',
    templateUrl: './auth-modal.component.html',
    styleUrls: ['./auth-modal.component.scss'],
})

export class AuthModalComponent implements OnInit  {
    /**获取从父组件传递过来的编辑权限表格的头部数据*/
    @Input() public theadData: any;
    /**获取从父组件传递过来的编辑权限表格的具体内容数据*/
    @Input() public tbodyData: any;
    constructor(private subject: NzModalSubject) {
        this.subject.on('onDestory', () => {});
    }
    /**
     * 取消查询权限时，需要同时取消编辑权限
     * @param value
     * @param data
     * @private
     */
    _consoleSearch(value,data) {
        if(value===false) {
            data.editAuthority=false;
        } else if(value===true) {
            data.editAuthority=true;
        }
    }

    /**
     * 点击编辑权限时，需要同时获取查询权限
     * @param value
     * @param data
     * @private
     */
    _consoleEdit(value,data) {
        if(value===true) {
            data.searchAuthority=true;
        } else if(value===false) {
            data.searchAuthority=false;
        }
    }
    /**点击编辑权限模态框的确定按钮*/
    emitDataOutside() {
        this.subject.next(this.tbodyData);
        this.subject.destroy('onCancel');
    }
    /**点击编辑权限模态框的取消按钮*/
    handleCancel(e) {
        this.subject.destroy('onCancel');
    }
    /**页面初始化数据*/
    ngOnInit() {
    }
}
