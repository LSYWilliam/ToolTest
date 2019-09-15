import {Component, OnDestroy, OnInit} from '@angular/core';
import {VisitorRegistrationService} from "../service/visitor-registration.service";
import * as moment from "moment";
import {VisitorEditModalComponent} from "./visitor-edit-modal/visitor-edit-modal.component";
import {VisitorRegistrationModel} from "../model/visitor-registration.model";
import {routerTransition} from "../../../../../animations/route-animations";

@Component({
    selector: 'app-visitor-registration',
    templateUrl: './visitor-registration.component.html',
    styleUrls: ['./visitor-registration.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})
export class VisitorRegistrationComponent extends VisitorRegistrationService implements OnInit, OnDestroy {

    addButton() {
        this.showModal("新增",null);
    }

    editButton() {
        this.operationFlag="编辑";
        this.child.selectData();
    }

    deleteButton() {
        this.operationFlag="删除";
        this.child.selectData();
    }

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
                this.showModal("编辑",value[0]);
                break;
            case "删除":
                this.commonUtilService.customConfirm("请确认要删除此项吗？",()=> {
                    let ids=[];
                    value.forEach(res=> {
                        ids.push(res.id);
                    });
                    this.delVisitor(ids);
                });
        }
    }

    showModal(modalTitleFlag,element:VisitorRegistrationModel) {

        /**打开模态框*/
        let modalConfig = {
            title          : modalTitleFlag+"访客",
            content        : VisitorEditModalComponent,
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
            if(result instanceof VisitorRegistrationModel) {
                if(modalTitleFlag==="新增") {
                    this.addVisitor(result);
                } else if(modalTitleFlag==="编辑") {
                    this.editVisitor(result);
                }
            }
        });
    }


    newArray = (len) => {
        const result = [];
        for (let i = 0; i < len; i++) {
            result.push(i);
        }
        return result;
    };
    _startValueChange = (value) => {
        this._startDate = value || this._startDate;
        if (this._startDate > this._endDate) {
            this._endDate = null;
        }
    };
    _endValueChange = (value) => {
        this._endDate = value || this._endDate;
        if (this._startDate > this._endDate) {
            this._startDate = null;
        }
    };
    _disabledStartDate = (startValue) => {
        if (!startValue || !this._endDate) {
            return false;
        }
        return moment(startValue).format("YYYY-MM-DD") > moment(this._endDate).format("YYYY-MM-DD");
    };
    _disabledEndDate = (endValue) => {
        if (!endValue || !this._startDate) {
            return false;
        }
        return moment(endValue).format("YYYY-MM-DD") < moment(this._startDate).format("YYYY-MM-DD");
    };

    get _isSameDay() {
        return this._startDate && this._endDate && moment(this._startDate).isSame(this._endDate, 'day');
    }

    get _endTime() {
        return {
            nzHideDisabledOptions: true,
        };
    }

    search() {
        if(!(this._startDate&&this._endDate)) {
            alert("请选择正确的起止日期！");
            return;
        }
        this.srcRequestArgs.body.startTime = moment(this._startDate).format("YYYY-MM-DD");
        this.srcRequestArgs.body.endTime = moment(this._endDate).format("YYYY-MM-DD");
        this.child.refreshData(true);
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
