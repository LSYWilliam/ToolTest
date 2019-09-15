import {Component, OnDestroy, OnInit} from '@angular/core';
import {EmployeeManagementService} from "../service/employee-management.service";
import {EmpMgmtModalComponent} from "./emp-mgmt-modal/emp-mgmt-modal.component";
import {EmpMgmtElement} from "../model/emp-mgmt-data-model";

@Component({
    selector: 'app-employee-management',
    templateUrl: './employee-management.component.html',
    styleUrls: ['./employee-management.component.scss']
})
export class EmployeeManagementComponent extends EmployeeManagementService implements OnInit, OnDestroy {
    /** 定义个windowHeight类型 */
    public windowHeight: number;

    openEditModal(item) {
        this.showModal('编辑', item);
    }

    addButton() {
        this.showModal('新增', new EmpMgmtElement());
    }

    editButton() {
        this.flag = "编辑";
        this.child.selectAll();
    }

    delButton() {
        this.flag = "删除";
        this.child.selectAll();
    }

    /**
     * 新增、编辑的模态框
     * @param modalTitleFlag
     * @param element
     */
    showModal(modalTitleFlag, element) {
        /**打开模态框*/
        let modalConfig = {
            title: modalTitleFlag + "员工",
            content: EmpMgmtModalComponent,
            onOk() {
            },
            onCancel() {
            },
            width: 530,
            footer: false,
            maskClosable: false,
            componentParams: {
                // dropDownList: this.dropDownList,
                element: element,
                modalTitleName: modalTitleFlag
            }
        };
        this.subscription$ = this.modalService.open(modalConfig);
        this.subscription$.subscribe(result => {
            if (typeof result==="object") {
                if (modalTitleFlag === "新增") {
                    this.addItem(result);
                } else if (modalTitleFlag === "编辑") {
                    this.editItem(result);
                }
            }
        });
    }

    getDropDown(value) {
        this.deptName = value;
    }

    search(value) {
        this.deptName = value.deptName;
        this.empName = value.empName;
        this.jobNumber = value.jobNumber;
        this.queryTableList(value.deptName, value.empName, value.jobNumber);
    }

    /**
     * 选项事件
     * @param value
     */
    selectAllItems(value) {
        let array = [];
        let ids = [];
        for (let item of value) {
            array.push(item.data);
            ids.push(item.data.id);
        }

        const len = array.length;
        if (len === 0) {
            this._message.create('error', "至少要选中一行，才能进行操作！");
            return;
        }
        switch (this.flag) {
            case '删除':
                this.commonUtilService.customConfirm("请确认要删除此项吗？",()=> {
                    this.delItems(ids);
                });
                break;
            case '编辑':
                if (len !== 1) {
                    this._message.create('error', "只能选中一行，才能进行编辑！");
                    return;
                }
                this.openEditModal(array[0]);
                break;
        }
    }

    /**
     * 获取表格元素数量
     * @param value
     */
    getDowLength(value) {
        // this.userTotal = value;
    }

    /**
     * 双击编辑
     * @param data
     */
    doubleClick(data: any) {
        // this.showModal("编辑", data.data);
    }

    /**
     * 单元格点击事件
     * @param value
     */
    cellClickEvent(data) {
        switch(data.colDef.field) {
            case 'operation' :
                console.log(data.event.target.innerHTML);
                switch(data.event.target.innerHTML) {
                    case '编辑':
                        console.log(data.data);
                        this.openEditModal(data.data);
                        break;
                    case '删除':
                        this.delButton();
                        break;
                }
                break;
        }
    }

    ngOnInit() {
        this.windowHeight = window.innerHeight - 200;
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
