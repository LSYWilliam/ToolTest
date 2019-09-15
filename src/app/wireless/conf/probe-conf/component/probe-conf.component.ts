import {Component, OnDestroy, OnInit} from '@angular/core';
import {routerTransition} from "../../../../animations/route-animations";
import {ProbeConfService} from "../service/probe-conf.service";
import {StaticDataModel} from "../model/static-data.model";
import {ProbeConfModalComponent} from "./probe-conf-modal/probe-conf-modal.component";
import {ProbeConfOutModel} from "../../../../shared/component/probe-conf/model/probe-conf-out.model";
import {ConfirmModalComponent} from "../../../../shared/component/confirm-modal/confirm-modal.component";

/**
 * 无线-配置-探针管理模块
 * @class ProbeConfComponent
*/
@Component
({
    selector: 'app-probe-conf',
    templateUrl: './probe-conf.component.html',
    styleUrls: ['./probe-conf.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})

export class ProbeConfComponent extends ProbeConfService implements OnInit, OnDestroy{
    /** 定义个windowHeight类型 */
    public windowHeight: number;
    /** 探针全局设置的值 */
    private globalConf: ProbeConfOutModel;
    /** 静态数据的实体 */
    public staticDataModel : StaticDataModel = new StaticDataModel();

    public editButton() {
        this.child.selectAll();
    }
    /**
     * 获取全局设置和各AP的数据
     */
    private getData() {
        this.getRegisterInfo();
    }

    /**
     * 页面加载完成后执行的方法
     * @description
     *        第一次加载时不传入网络ID
     */
    ngOnInit() {
        this.windowHeight = window.innerHeight-440;
        this.getData();
    }

    /**
     * 下拉菜单点击事件
     * @description
     *       点击下拉菜单后，重新刷新数据，将新的网络ID传入
     */
    getNetWorkID(id) {
        this.netID = id;
        this.getData();
    }

    /** 获取全局配置数据事件 */
    getGlobalData(data: any) {
        this.globalConf = data;
    }

    /**
     * 修改全局属性，点击保存按钮事件
     * @description
     *       点击下拉菜单后，重新刷新数据，将新的网络ID传入
     */
    saveGlobalData() {
            this.showModalForConfirm('保存后，会覆盖所有AP探针配置，是否保存？');
    }

    /**
     * 选项事件
     * @param value
     */
    selectAllItems(value) {
        let array = [];
        for (let item of value) {
            array.push(item.data);
        }
        const len = array.length;
        if (len === 0) {
            this._message.create('error', "至少要选中一行，才能进行操作！");
            return;
        }
        if (len !== 1) {
            this._message.create('error', "只能选中一行，才能进行编辑！");
            return;
        }
        console.log(array[0]);
        this.showModalForComponent(array[0]);
    }

    /**
     * 双击表格后的事件
     * @description
     *       双击表格后，弹出模态框
     */
    cellClickEvent(data: any) {
        this.showModalForComponent(data.data);
    }

    /**
     * 打开是否保存的提示框
     * @param message string
     *              对话框提示信息
     */
    showModalForConfirm(message: string) {
        const modalConfig = {
            content        : ConfirmModalComponent,
            onOk() {},
            onCancel() {},
            footer         : false,
            maskClosable : false,
            componentParams: {
                name: message
            }
        };

        this.delSubscription$ = this.modalService.open(modalConfig);
        this.delSubscription$.subscribe(result => {
            if (result === 'onOk') {
                this.patchGlobalConf(this.globalConf);
            }
        });
    }

    /**
     * 打开modal框方法
     * @param data any
     *              表格中被点击的那一行数据
     */
    showModalForComponent(data: any) {
        const modalConfig = {
            title          : data['netName'] + '探针管理',
            content        : ProbeConfModalComponent,
            width: 600,
            onOk() {},
            onCancel() {},
            footer         : false,
            maskClosable : false,
            componentParams: {
                name: data
            }
        };

        this.subscription$ = this.modalService.open(modalConfig);
        this.subscription$.subscribe(result => {
            if (result === 'onOk') {
                this.getGlobalProbeConfValue();
            }
        });
    }

    ngOnDestroy(): void {
        if (this.subscription$ !== undefined) {
            this.subscription$.destroy();
        }
        if (this.delSubscription$ !== undefined) {
            this.delSubscription$.destroy();
        }
    }
}
