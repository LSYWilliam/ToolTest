import {Component, OnDestroy, OnInit} from '@angular/core';
import {LogManagementService} from "../service/log-management.service";
import {LogManagementModalComponent} from "./log-management-modal/log-management-modal.component";
import {routerTransition} from "../../../../animations/route-animations";
import {ConfirmModalComponent} from "../../../../shared/component/confirm-modal/confirm-modal.component";

@Component({
    selector: 'app-log-management',
    templateUrl: './log-management.component.html',
    styleUrls: ['./log-management.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})
export class LogManagementComponent extends LogManagementService implements OnInit, OnDestroy {
    /** 定义个windowHeight类型 */
    public windowHeight: number;
    selectedValue = '1';

    addButton() {
        this.showModal("新增", null);
    }

    editButton() {
        this.child.selectAll();
    }

    delButton() {
        if (this.child.gridApi.getSelectedRows().length === 0) {
            this._message.warning('请选择需要删除的行');
        } else {
            this.showDelConfirm('确认删除这些数据？');
        }
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
        this.showModal("编辑", array[0]);
    }

    /**
     * 双击编辑
     * @param data
     */
    doubleClick(data: any) {
        this.showModal("编辑", data.data);
    }

    /**
     * 右击编辑
     * @param item
     */
    rightEventEdit() {
        this.child.selectAll();
    }

    /**
     * 初始化新增或编辑模态框
     * @param value
     */
    showModal(modalTitleFlag, element) {
        console.log(element);
        /**打开模态框*/
        let modalConfig = {
            title: modalTitleFlag + "日志接收配置",
            content: LogManagementModalComponent,
            onOk() {
            },
            onCancel() {
            },
            footer: false,
            maskClosable: false,
            componentParams: {
                element: element,
                modalTitleName: modalTitleFlag,
                dropDownNetList: this.dropDownNetList
            }
        };
        this.subscription$ = this.modalService.open(modalConfig);
        this.subscription$.subscribe(result => {
            if (typeof result  === "object") {
                console.log(result.id);
                if(result.id) {
                    this.editLogInfo(result);
                } else {
                    this.addLogInfo(result);
                }
            }
        });
    }

    /**
     * 是否删除
     * @param message
     * @description
     *      1、打开提示框
     *      2、判断是否为onOK
     *      3、删除
     * */
    showDelConfirm(message: string) {
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
                let data = [];
                for (let obj of this.child.gridApi.getSelectedRows()) {
                    data.push(obj['id']);
                }
                this.delLogNum(data);
            }
        });
    }

    ngOnInit() {
        this.windowHeight = window.innerHeight-170;
    }

    ngOnDestroy(): void {
        if (this.subscription$ !== undefined) {
            this.subscription$.destroy();
        }
    }
}
