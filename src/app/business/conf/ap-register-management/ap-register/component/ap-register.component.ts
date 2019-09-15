import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApRegisterService} from "../service/ap-register.service";
import {ApRegisterModalComponent} from "./ap-register-modal/ap-register-modal.component";
import {routerTransition} from "../../../../../animations/route-animations";

@Component({
    selector: 'app-ap-register',
    templateUrl: './ap-register.component.html',
    styleUrls: ['./ap-register.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})
export class ApRegisterComponent extends ApRegisterService implements OnInit, OnDestroy {
    /** 定义个windowHeight类型 */
    public windowHeight: number;

    editButton() {
        this.child.selectAll();
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
     * 初始化新增或编辑模态框
     * @param value
     */
    showModal(modalTitleFlag, element) {
        /**打开模态框*/
        let modalConfig = {
            title: element.apName,
            content: ApRegisterModalComponent,
            onOk() {
            },
            onCancel() {
            },
            footer: false,
            maskClosable: false,
            componentParams: {
                element: element,
                modalTitleName: modalTitleFlag,
                dropDownList: this.adapterDropDownList
            }
        };
        this.subscription$ = this.modalService.open(modalConfig);
        this.subscription$.subscribe(result => {
            if (typeof result  === "object") {
                this.saveAPAdapter(result);
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
