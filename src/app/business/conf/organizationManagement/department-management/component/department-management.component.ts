import {Component, OnDestroy, OnInit} from '@angular/core';
import {DepartmentManagementService} from "../service/department-management.service";
import {DeptMgmtInfoModalComponent} from "./dept-mgmt-info-modal/dept-mgmt-info-modal.component";
import {DeptMgmtElement} from "../model/dept-mgmt-data-model";

@Component({
    selector: 'app-department-management',
    templateUrl: './department-management.component.html',
    styleUrls: ['./department-management.component.scss']
})
export class DepartmentManagementComponent extends DepartmentManagementService implements OnInit, OnDestroy {
    /** 定义个windowHeight类型 */
    public windowHeight: number;

    public deltableFlag = false;

    editButton() {
        this.flag = "编辑";
        this.child.selectAll();
    }

    deleteItems() {
        this.flag = "删除";
        this.child.selectAll();
    }

    deleteButton() {
        this.flag = "删除";
        let tmp = [];
        tmp.push(this.chosenElement.id);
        this.commonUtilService.customConfirm("请确认要删除此项吗？",()=> {
            this.delItems(tmp);
        });
    }

    openEditModal() {
        this.flag = "编辑";
        this.showModal('编辑',this.chosenElement);
    }

    openAddModal() {
        let tmp = new DeptMgmtElement();
        tmp.parentId = this.chosenElement.id;
        tmp.parentName = this.chosenElement.deptName;
        this.showModal('新增',tmp);
    }

    /**
     * 新增、编辑的模态框
     * @param modalTitleFlag
     * @param element
     */
    showModal(modalTitleFlag, element:DeptMgmtElement) {
        /**打开模态框*/
        let modalConfig = {
            title: modalTitleFlag + "部门",
            content: DeptMgmtInfoModalComponent,
            onOk() {
            },
            onCancel() {
            },
            width: 500,
            footer: false,
            maskClosable: false,
            componentParams: {
                element: element,
                modalTitleName: modalTitleFlag,
                dropDownList: this.parentList
            }
        };
        this.subscription$ = this.modalService.open(modalConfig);
        this.subscription$.subscribe(result => {
            console.log(typeof result);
            if (typeof result==="object") {
                if (modalTitleFlag === "新增") {
                    this.addDeptInfo(result);
                } else if (modalTitleFlag === "编辑") {
                    this.editDeptInfo(result);
                }
            }
        });
    }

    ngOnInit() {
        this.windowHeight = window.innerHeight - 200;
    }

    /**
     * 目录树点击
     * @param value
     */
    menuClick(value) {
        if(value==="root") {
            this.deltableFlag=false;
        } else if(value==="leaf") {
            this.deltableFlag=true;
        } else if(value==="组织机构") {
            // this.editEnable = false;
            // this.getAllPartTable();
            this.chosenElement = new DeptMgmtElement();
            this.chosenUPElement = new DeptMgmtElement();
            // this.getOneDept();
            return;
        } else {
            // this.editEnable = true;
            // this.chosenElement = value;
            this.getOneDept(value.id);
            this.getPartTable(value.id);
        }
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
                this.chosenElement = array[0];
                this.openEditModal();
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
                this.chosenElement=data.data;
                switch(data.event.target.innerHTML) {
                    case '编辑':
                        this.openEditModal();
                        break;
                    case '删除':
                        this.deleteButton();
                        break;
                }
                break;
        }
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
