import {Injectable, SimpleChanges, ViewChild} from '@angular/core';
import {EmpMgmtDataModel} from "../model/emp-mgmt-data-model";
import {EmpMgmtHeadDataModel} from "../model/emp-mgmt-head-data-model";
import {HttpClientService} from "../../../../../shared/service/httpClient.service";
import {CommonUtilService} from "../../../../../shared/service/common-util.service";
import {NzMessageService, NzModalService, NzModalSubject} from "ng-zorro-antd";
import {RequestArgs} from "../../../../../shared/model/request-args";
import {DropDownsInterface} from "../../../../../shared/component/dropdown/model/dropdowns.model";
import {TableComponent} from "../../../../../plugins/component/table/table.component";
import {RegisterInfoModel} from "../../../business-information/model/register-info.model";
import {BusinessInfomationInterface} from "../../../business-information/model/business-infomation.interface";

@Injectable()
export class EmployeeManagementService {
    empMgmtHeadDataModel: EmpMgmtHeadDataModel = new EmpMgmtHeadDataModel();
    empMgmtDataModel: EmpMgmtDataModel = new EmpMgmtDataModel();
    dropDownList;
    empName = "";
    deptName = "";
    jobNumber = "";
    flag;
    @ViewChild(TableComponent) child: TableComponent;
    registerInfo: RegisterInfoModel = new RegisterInfoModel();

    /**订阅模态框*/
    subscription$: NzModalSubject;

    constructor(private http: HttpClientService, public modalService: NzModalService, public _message: NzMessageService,
                public commonUtilService: CommonUtilService) {
        this.getRegisterInfo();
        this.getTableList();
        this.getDropDownList();
    }

    getTableList() {
        let requestArgs = new RequestArgs();
        requestArgs.header = {'ticket': sessionStorage.getItem('ticket'), 'Content-Type': 'application/json'};
        requestArgs.url = "/employee/api/query/list";
        requestArgs.systemName = "wlanscope";
        requestArgs.body = {};
        if (this.deptName && this.deptName !== "全部") {
            Object.assign(requestArgs.body, {"deptName": this.deptName});
        }
        if (this.empName) {
            Object.assign(requestArgs.body, {"empName": this.empName});
        }
        if (this.jobNumber) {
            Object.assign(requestArgs.body, {"jobNumber": this.jobNumber});
        }
        this.http.httpGet(requestArgs).subscribe(res => {
            if (res.code === 0) {
                this.empMgmtDataModel.list = res.result;
            } else if (res.code === 9) {
                this.empMgmtDataModel.list = [];
            } else {
                this._message.info(res.msg);
            }
        });
    }

    /**
     * 商户详细信息查询
     */
    protected getRegisterInfo() {
        let requestArgs = new RequestArgs();
        requestArgs.url = "/api/v1/businesses/detail";
        requestArgs.systemName = "wlanscope";
        requestArgs.header = {'ticket': sessionStorage.getItem('ticket'), 'Content-Type': 'application/json;charset=UTF-8'};
        this.http.httpGet(requestArgs).subscribe(
            res => {
                if (res.code === 0) {
                    this.registerInfo.setData(<BusinessInfomationInterface> res.result);
                }
            }
        );
    }

    getDropDownList() {
        let requestArgs = new RequestArgs();
        requestArgs.header = {'ticket': sessionStorage.getItem('ticket'), 'Content-Type': 'application/json'};
        requestArgs.url = "/department/api/display/list";
        requestArgs.systemName = "wlanscope";
        this.http.httpGet(requestArgs).subscribe(res => {
            if (res.code === 0) {
                let tmp = [];
                tmp.push(<DropDownsInterface> {id: "", name: "全部"});
                for (let obj of res.result) {
                    tmp.push(<DropDownsInterface> {id: "" + obj['id'], name: obj['deptName']});
                }
                this.dropDownList = tmp;
            } else if (res.code === 9) {
                this.dropDownList = [];
            } else {
                this._message.info(res.msg);
            }
        });
    }

    queryTableList(deptName?, empName?, jobNumber?) {
        let requestArgs = new RequestArgs();
        requestArgs.header = {'ticket': sessionStorage.getItem('ticket'), 'Content-Type': 'application/json'};
        requestArgs.url = "/employee/api/query/list";
        requestArgs.systemName = "wlanscope";
        requestArgs.body = {};

        if (deptName && this.deptName !== "全部") {
            Object.assign(requestArgs.body, {"deptName": deptName});
        }
        if (empName) {
            Object.assign(requestArgs.body, {"empName": empName});
        }
        if (jobNumber) {
            Object.assign(requestArgs.body, {"jobNumber": jobNumber});
        }
        this.http.httpGet(requestArgs).subscribe(res => {
            if (res.code === 0) {
                this.empMgmtDataModel.list = res.result;
            } else if (res.code === 9) {
                this.empMgmtDataModel.list = [];
            } else {
                this.empMgmtDataModel.list = [];
                this._message.info(res.msg);
            }
        });
    }

    addItem(item) {
        let requestArgs = new RequestArgs();
        requestArgs.header = {'ticket': sessionStorage.getItem('ticket'), 'Content-Type': 'application/json'};
        requestArgs.url = "/employee/api/create_or_update";
        requestArgs.systemName = "wlanscope";
        requestArgs.body = {
            empName: item.empName,
            empSex: "" + item.empSex,
            empMobile: item.empMobile,
            empEmail: item.empEmail,
            empPosition: item.empPosition,
            businessId: item.businessId,
            deptIdList: item.deptIdList.join(","),
            jobNumber: item.jobNumber
        };
        this.http.httpPost(requestArgs).subscribe(res => {
            if (res.code === 0) {
                this.getTableList();
                if (this.subscription$) {
                    this.subscription$.destroy();
                }
            } else {
                this._message.info(res.msg);
            }
        });
    }

    editItem(item) {
        let requestArgs = new RequestArgs();
        requestArgs.header = {'ticket': sessionStorage.getItem('ticket'), 'Content-Type': 'application/json'};
        requestArgs.url = "/employee/api/create_or_update";
        requestArgs.systemName = "wlanscope";
        requestArgs.body = {
            id: item.id,
            empName: item.empName,
            empEmail: item.empEmail,
            empPosition: item.empPosition,
            empSex: item.empSex,
            empMobile: item.empMobile,
            businessId: item.businessId,
            deptIdList: item.deptIdList.join(","),
            jobNumber: item.jobNumber
        };
        this.http.httpPost(requestArgs).subscribe(res => {
            if (res.code === 0) {
                this.getTableList();
                if (this.subscription$) {
                    this.subscription$.destroy();
                }
            } else {
                this._message.info(res.msg);
            }
        });
    }

    delItems(ids) {
        let requestArgs = new RequestArgs();
        requestArgs.header = {'ticket': sessionStorage.getItem('ticket'), 'Content-Type': 'application/json'};
        // requestArgs.url = "/employee/api/delete/list";
        requestArgs.url = "/employee/api/updateDeleteFlag_list";
        requestArgs.systemName = "wlanscope";
        // requestArgs.body = {
        //     empIdList: ids
        // };
        requestArgs.body = ids;
        this.http.httpPost(requestArgs).subscribe(res => {
            if (res.code === 0) {
                this.getTableList();
                if (this.subscription$) {
                    this.subscription$.destroy();
                }
            } else {
                this._message.info(res.msg);
            }
        });
    }
}
