import {
    Component, Input, OnChanges, Output, EventEmitter, SimpleChanges
} from '@angular/core';
import { NetWebModel } from './net-web.model';
import { VersionModel } from "./version.model";

/**
 * 网络概览-关注网络
 * @class NetWebComponent
 */
@Component({
    selector: 'app-net-web',
    templateUrl: './net-web.component.html',
    styleUrls: ['./net-web.component.scss']
})
export class NetWebComponent implements OnChanges {
    /** 组件输入 显示关注网络 or 固件版本 */
    @Input() public netVersionType: string;
    /** 组件输入 显示关注网络数据 实体类*/
    @Input() public netWebs: NetWebModel = new NetWebModel();
    /** 组件输入 显示固件版本数据 实体类*/
    @Input() public version: VersionModel = new VersionModel();
    /** 组件输出 网络ID数据 */
    @Output() public netWorkRoute = new EventEmitter();
    /** 组件输出 版本ID数据 */
    @Output() public explainRoute = new EventEmitter();

    constructor() {
    }
    /**监听组件表格内容是否改变的 生命周期函数*/
    ngOnChanges(changes: SimpleChanges): void {

    }
    /**点击关注网络事件*/
    netWorkDts(netId) {
        this.netWorkRoute.emit(netId);
    }
    /**点击版本说明事件*/
    versionExplain(id) {
        this.explainRoute.emit(id);
    }
}
