import {Component, OnDestroy, OnInit} from '@angular/core';
import {DeptBasicInfoManagementService} from "../service/dept-basic-info-management.service";
import {DeptBasicInfoModalComponent} from "./dept-basic-info-modal/dept-basic-info-modal.component";
import {StaffBasicInfoModel} from "../../staff-basic-info-management/model/staff-basic-info.model";
import {DeptBasicInfoModel} from "../model/dept-basic-info.model";
import {routerTransition} from "../../../../../animations/route-animations";

@Component({
    selector: 'app-dept-basic-info-management',
    templateUrl: './dept-basic-info-management.component.html',
    styleUrls: ['./dept-basic-info-management.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})
export class DeptBasicInfoManagementComponent extends DeptBasicInfoManagementService implements OnInit, OnDestroy {

    editEnable = false;
    /**
     * 增加按钮点击事件
     */
    addButton() {
        this.chosenElement = this.chosenElement || new DeptBasicInfoModel();
        this.getPartCode(this.chosenElement.partCode).subscribe(res=> {
            if(res.code===0) {
                this.element.parentPartCode=this.chosenElement.partCode;
                this.element.parentPartName=this.chosenElement.partName;
                this.element.partName = "";
                this.element.partLeader = "";
                if(!this.editEnable) {
                    this.element = new DeptBasicInfoModel();
                }
                this.showModal("新增",this.element);
            }
        });
    }

    /**
     * 删除按钮点击事件
     */
    deleteButton() {
        if((""+this.chosenElement.isDelect)==="0"||this.chosenElement.isDelect===null) {
            this.commonUtilService.customConfirm("请确认要删除此项吗？",()=> {
                this.delDeptInfo(this.chosenElement);
            });
        } else {
            this._message.error("包含子项不可删除！");
        }

    }

    /**
     * 编辑按钮点击事件
     */
    editButton() {
        /**进行值拷贝*/
        this.element.partCode = this.chosenElement.partCode;
        this.element.partName = this.chosenElement.partName;
        this.element.partLeader = this.chosenElement.partLeader;
        this.element.parentPartName = this.chosenElement.parentPartName;
        this.element.parentPartCode = this.chosenElement.parentPartCode;
        this.showModal("编辑",this.element);
    }

    /**
     * 目录树点击
     * @param value
     */
    menuClick(value) {
        if(value==="组织机构") {
            this.editEnable = false;
            this.getAllPartTable();
            this.chosenElement = new DeptBasicInfoModel();
            return;
        } else {
            this.editEnable = true;
            this.chosenElement = value;
            this.getPartTable();
        }
    }

    /**
     * 搜索框输入
     * @param value
     */
    searchClick(value) {
    }

    /**
     * 新增、编辑的模态框
     * @param modalTitleFlag
     * @param element
     */
    showModal(modalTitleFlag,element) {
        /**打开模态框*/
        let modalConfig = {
            title          : modalTitleFlag+"部门",
            content        : DeptBasicInfoModalComponent,
            onOk() {},
            onCancel() {},
            width          : 500,
            footer         : false,
            maskClosable   : false,
            componentParams: {
                dropDownList: this.dropDownParentDeptList,
                element: element,
                modalTitleName: modalTitleFlag
            }
        };
        this.subscription$ = this.modalService.open(modalConfig);
        this.subscription$.subscribe(result => {
            if(result instanceof DeptBasicInfoModel) {
                if(modalTitleFlag==="新增") {
                    this.addDeptInfo(result);
                } else if(modalTitleFlag==="编辑") {
                    this.editDeptInfo(result);
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
