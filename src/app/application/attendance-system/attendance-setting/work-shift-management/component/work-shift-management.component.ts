import {Component, OnDestroy, OnInit} from '@angular/core';
import {WorkShiftManagementService} from "../service/work-shift-management.service";
import {WorkShiftModalComponent} from "./work-shift-modal/work-shift-modal.component";
import {WorkShiftModel} from "../model/work-shift.model";
import {routerTransition} from "../../../../../animations/route-animations";

@Component({
    selector: 'app-work-shift-management',
    templateUrl: './work-shift-management.component.html',
    styleUrls: ['./work-shift-management.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})
export class WorkShiftManagementComponent extends WorkShiftManagementService implements OnInit, OnDestroy {

    /**
     * 表格数据增加按钮
     */
    addButton() {
        this.showModal("新增",null);
    }

    /**
     * 表格数据编辑按钮
     */
    editButton() {
        this.operationFlag="编辑";
        this.child.selectAll();
    }

    /**
     * 表格数据删除按钮
     */
    deleteButton() {
        this.operationFlag="删除";
        this.child.selectAll();
    }

    /**
     * 双击表格后的事件
     * @description
     *       双击表格后，弹出模态框
     */
    doubleClick(data: any) {
        this.operationFlag="编辑";
        this.getDataSelectedFromZorroTable([data]);
    }

    /**
     * 获取来自佐罗表格的数据
     * @param value
     */
    getDataSelectedFromZorroTable(value) {
        if(this.operationFlag==="编辑"&&value.length!==1) {
            this._message.create('error', "只能选择一个进行编辑！");
            return;
        }
        if(this.operationFlag==="删除"&&value.length<=0) {
            this._message.create('error', "请至少选择一个进行删除！");
            return;
        }
        switch(this.operationFlag) {
            case "编辑":
                this.showModal("编辑",value[0].data);
                break;
            case "删除":
                this.commonUtilService.customConfirm("请确认要删除此项吗？",()=> {
                    let ids=[];
                    value.forEach(res=> {
                        ids.push(res.data.id);
                    });
                    this.delWorkShift(ids);
                });
        }
    }

    /**
     * 初始化新增、编辑模态框
     */
    showModal(modalTitleFlag,element) {
        /**打开模态框*/
        let modalConfig = {
            title          : modalTitleFlag+"班次",
            content        : WorkShiftModalComponent,
            onOk() {},
            onCancel() {},
            footer         : false,
            maskClosable   : false,
            componentParams: {
                element: element,
                modalTitleName: modalTitleFlag
            }
        };
        this.subscription$ = this.modalService.open(modalConfig);
        this.subscription$.subscribe(result => {
            if(result instanceof WorkShiftModel) {
                if(modalTitleFlag === "新增") {
                    this.addWorkShift(result);
                } else if(modalTitleFlag === "编辑") {
                    this.editWorkShift(result);
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
