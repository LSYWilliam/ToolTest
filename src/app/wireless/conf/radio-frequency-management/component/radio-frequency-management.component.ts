import {Component, OnInit, ViewChild} from '@angular/core';
import {routerTransition} from "../../../../animations/route-animations";
import {RadioFrequencyManagementService} from "../service/radio-frequency-management.service";
import {StaticDataModel} from "../model/static-data.model";
import {RadioFreqModalComponent} from "./radio-freq-modal/radio-freq-modal.component";
import {ConfirmModalComponent} from "../../../../shared/component/confirm-modal/confirm-modal.component";
import {TableComponent} from "../../../../plugins/component/table/table.component";

/**
 * 无线-配置-射频管理 模块
 * @class RadioFrequencyManagementComponent
*/
@Component
({
    selector: 'app-radio-frequency-management',
    templateUrl: './radio-frequency-management.component.html',
    styleUrls: ['./radio-frequency-management.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})

export class RadioFrequencyManagementComponent extends RadioFrequencyManagementService implements OnInit  {
    /** 定义个windowHeight类型 */
    public windowHeight: number;
    /** 全局配置的数据 */
    private globalConf: any;
    /** 静态数据模型 */
    public staticDataModel: StaticDataModel = new StaticDataModel();
    /** 表格组件 */
    @ViewChild(TableComponent) childTable: TableComponent;

    /**
     * 网络列表下拉条事件
     * @param id string
     *          下拉列表选择后的ID
     */
    getDropDown(id) {
        this.netID = id;
        // super.getGlobalValue();
        super.getApTable();
    }

    editButton() {
        this.childTable.selectAll();
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
        this.showModalForComponent(array[0]['apName'], array[0]);
    }

    /**
     * 获取全局属性的事件
     * @param data any
     *          全局属性
     */
    getGlobalConf(data) {
        this.globalConf = data;
    }

    /** 全局属性修改后，点击保存按钮的事件 */
    saveGlobalData() {
        /** 判断用户是否对全局属性进行修改 */
        if (this.radioFrequencyModel.globalConf.equalArgs(this.globalConf)) {
            this._message.create('warning', `配置未修改，无须保存`, {nzDuration: 5000});
        } else {
            this.showModalForConfirm('保存后，会覆盖所有AP射频配置，是否保存？');
        }
    }

    /** 双击表格的事件
     * @param value any
     *          双击表格行的数据
     */
    cellClickEvent(value) {
        this.showModalForComponent(value.data['apName'], value.data);
    }

    /**
     * 打开单个AP配置的模态框
     * @param apName string
     *              AP的名称
     * @param data  any
     *              整行数据
     */
    showModalForComponent(apName:string, data: any) {
        const modalConfig = {
            title          : apName + '射频管理',
            content        : RadioFreqModalComponent,
            onOk() {},
            onCancel() {},
            footer         : false,
            maskClosable : false,
            componentParams: {
                name: data
            }
        };

        const subscription$ = this.modalService.open(modalConfig);
        subscription$.subscribe(result => {
            let tmp = result.split('|');
            if (tmp.length === 2) {
                super.getApTable();
                // let updateData = JSON.parse(tmp[1]);
                // let rowData = data;
                // rowData['apRateThreshold'] = updateData['apRateThreshold'];
                // rowData['rssiThreshold'] = updateData['fieldsStrengthThreshold'];
                // rowData['config2gChannel'] = updateData['config2gChannel'];
                // // rowData['config2gPowerDbm'] = updateData['config2gPowerDbm'] * 10;
                //
                // if (updateData['config2gPowerDbm'] === '未开启') {
                //     rowData['config2gPowerDbm'] = "未开启";
                // } else {
                //     rowData['config2gPowerDbm'] = updateData['config2gPowerDbm'] * 10;
                // }
                //
                // rowData['config5gChannel'] = updateData['config5gChannel'];
                // // rowData['config5gPowerDbm'] = updateData['config5gPowerDbm'] * 10;
                //
                // if (updateData['config5gPowerDbm'] === '未开启') {
                //     rowData['config5gPowerDbm'] = "未开启";
                // } else {
                //     rowData['config5gPowerDbm'] = updateData['config5gPowerDbm'] * 10;
                // }
                // this.childTable.editRow(rowData);
            }
        })
    }

    /**
     * 打开是否删除的提示框
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

        const subscription$ = this.modalService.open(modalConfig);
        subscription$.subscribe(result => {
            if (result === 'onOk') {
                this.spinStatus = true;
                this.saveGlobalConf(this.globalConf);
            }
        })
    }
    /**
     * 初始化方法
     * @description
     *       1、获取全网配置数据
     *       2、获取各AP配置数据
     */
    ngOnInit() {
        this.windowHeight = window.innerHeight-230;
        // super.getGlobalValue();
        super.getApTable();
    }
}
