import {Component, OnDestroy, OnInit} from '@angular/core';
import {StaffBasicInfoManagementService} from "../service/staff-basic-info-management.service";
import {StaffBasicInfoModalComponent} from "./staff-basic-info-modal/staff-basic-info-modal.component";
import {StaffBasicInfoModel} from "../model/staff-basic-info.model";
import {routerTransition} from "../../../../../animations/route-animations";

@Component({
    selector: 'app-staff-basic-info-management',
    templateUrl: './staff-basic-info-management.component.html',
    styleUrls: ['./staff-basic-info-management.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})
export class StaffBasicInfoManagementComponent extends StaffBasicInfoManagementService implements OnInit, OnDestroy {

    /**
     * 数据表格新增功能按钮
     */
    addButton() {
        this.showModal("新增", null);
    }

    /**
     * 数据表格编辑功能按钮
     */
    editButton() {
        this.operationFlag = "编辑";
        this.child.selectData();
    }

    /**
     * 数据表格删除功能按钮
     */
    deleteButton() {
        this.operationFlag = "删除";
        this.child.selectData();
    }

    /**
     * 数据表格下载功能按钮
     */
    loadButton() {
        this.DownLoadDataFile();
    }

    /**
     * 获取来自佐罗表格的被选数据
     * @param value
     */
    getDataSelectedFromZorroTable(value) {
        if (this.operationFlag === "编辑" && value.length !== 1) {
            this._message.create('error', "只能选择一个进行编辑！");
            return;
        }
        if(this.operationFlag === "删除" && value.length<=0) {
            this._message.create('error', "请至少选择一个进行删除！");
            return;
        }
        switch (this.operationFlag) {
            case "编辑":
                this.showModal("编辑", value[0]);
                break;
            case "删除":
                this.commonUtilService.customConfirm("请确认要删除此项吗？", () => {
                    let ids = [];
                    value.forEach(res => {
                        ids.push(res.usrId);
                    });
                    this.delStaff(ids);
                });
        }
        if (this.operationFlag === "编辑") {

        }
        if (this.operationFlag === "删除") {

        }
    }

    /**
     * 初始化新增或编辑模态框
     * @param value
     */
    showModal(modalTitleFlag, element) {
        /**打开模态框*/
        let modalConfig = {
            title: modalTitleFlag + "员工",
            content: StaffBasicInfoModalComponent,
            onOk() {
            },
            onCancel() {
            },
            footer: false,
            maskClosable: false,
            componentParams: {
                element: element,
                modalTitleName: modalTitleFlag
            }
        };
        this.subscription$ = this.modalService.open(modalConfig);
        this.subscription$.subscribe(result => {
            if (result instanceof StaffBasicInfoModel) {
                if (modalTitleFlag === "新增") {
                    this.addStaff(result);
                } else if (modalTitleFlag === "编辑") {
                    this.editStaff(result);
                }
            }
        });
    }

    ngOnInit() {
    }

    ngOnDestroy(): void {
        if (this.subscription$ !== undefined) {
            this.subscription$.destroy();
        }
        if(this.commonUtilService.subscription$ !== undefined) {
            this.commonUtilService.subscription$.destroy();
        }
    }
}
