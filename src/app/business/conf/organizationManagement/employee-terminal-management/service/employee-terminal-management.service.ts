import {Injectable, ViewChild} from '@angular/core';
import {NzMessageService, NzModalService, NzModalSubject} from "ng-zorro-antd";
import {HttpClientService} from "../../../../../shared/service/httpClient.service";
import {CommonUtilService} from "../../../../../shared/service/common-util.service";
import {EmpTerminalMgmtDataModel} from "../model/emp-terminal-mgmt-data-model";
import {EmpTerminalMgmtHeadDataModel} from "../model/emp-terminal-mgmt-head-data-model";
import {DropDownsInterface} from "../../../../../shared/component/dropdown/model/dropdowns.model";
import {RequestArgs} from "../../../../../shared/model/request-args";
import {TableComponent} from "../../../../../plugins/component/table/table.component";

@Injectable()
export class EmployeeTerminalManagementService {
    empTerminalMgmtHeadDataModel: EmpTerminalMgmtHeadDataModel = new EmpTerminalMgmtHeadDataModel();
    empTerminalMgmtDataModel: EmpTerminalMgmtDataModel = new EmpTerminalMgmtDataModel();
    dropDownList;
    empName="";
    mac="";
    number="";
    flag;
    @ViewChild(TableComponent) child: TableComponent;

    deptDropDownList: Array<DropDownsInterface>;
    empDropDownList: Array<DropDownsInterface>;

    /**订阅模态框*/
    subscription$: NzModalSubject;

    constructor(private http: HttpClientService, public modalService: NzModalService, public _message: NzMessageService,
                public commonUtilService: CommonUtilService) {
        this.getTableList();
        this.getEmpDropDownList();
        this.getDeptDropDownList();
    }

    getTableList() {
        let requestArgs = new RequestArgs();
        requestArgs.header = {'ticket': sessionStorage.getItem('ticket'), 'Content-Type': 'application/json'};
        requestArgs.url = "/employee_terminal/api/find/list";
        requestArgs.systemName = "wlanscope";
        this.http.httpGet(requestArgs).subscribe(res => {
            if (res.code === 0) {
                this.empTerminalMgmtDataModel.list = res.result;
            } else if (res.code === 9) {
                this.empTerminalMgmtDataModel.list = [];
            } else {
                this._message.info(res.msg);
            }
        });
    }

    queryTableList(empName?, mac?, number?) {
        console.log(empName);
        let requestArgs = new RequestArgs();
        requestArgs.header = {'ticket': sessionStorage.getItem('ticket'), 'Content-Type': 'application/json'};
        requestArgs.url = "/employee_terminal/api/find/list";
        requestArgs.systemName = "wlanscope";
        requestArgs.body = {};
        if (empName) {
            Object.assign(requestArgs.body,{"empName":empName});
        }
        if (mac) {
            Object.assign(requestArgs.body,{"mac":mac});
        }
        if (number) {
            Object.assign(requestArgs.body,{"number":number});
        }
        this.http.httpGet(requestArgs).subscribe(res => {
            if (res.code === 0) {
                this.empTerminalMgmtDataModel.list = res.result;
            } else if (res.code === 9) {
                this.empTerminalMgmtDataModel.list = [];
            } else {
                this._message.info(res.msg);
            }
        });
    }

    addItem(item) {
        let requestArgs = new RequestArgs();
        requestArgs.header = {'ticket': sessionStorage.getItem('ticket'), 'Content-Type': 'application/json'};
        requestArgs.url = "/employee_terminal/api/save_or_update";
        requestArgs.systemName = "wlanscope";
        requestArgs.body = {
            macAddr: item.macAddr,
            equipmentNumber: item.equipmentNumber,
            equipmentType: item.equipmentType,
            empId: item.empId,
            deptId: item.deptId
        };
        this.http.httpPost(requestArgs).subscribe(res => {
            if (res.code === 0) {
                this._message.info(res.msg);
                this.getTableList();
                if(this.subscription$) {
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
        requestArgs.url = "/employee_terminal/api/save_or_update";
        requestArgs.systemName = "wlanscope";
        requestArgs.body = {
            id: item.id,
            macAddr: item.macAddr,
            equipmentNumber: item.equipmentNumber,
            equipmentType: item.equipmentType,
            empId: item.empId,
            deptId: item.deptId
        };
        this.http.httpPost(requestArgs).subscribe(res => {
            if (res.code === 0) {
                this._message.info(res.msg);
                this.getTableList();
                if(this.subscription$) {
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
        requestArgs.url = "/employee_terminal/api/delete/list";
        requestArgs.systemName = "wlanscope";
        requestArgs.body = ids;
        this.http.httpDelete(requestArgs).subscribe(res => {
            if (res.code === 0) {
                this._message.info(res.msg);
                this.getTableList();
            } else {
                this._message.info(res.msg);
            }
        });
    }

    getDeptDropDownList() {
        let requestArgs = new RequestArgs();
        requestArgs.header = {'ticket': sessionStorage.getItem('ticket'), 'Content-Type': 'application/json'};
        requestArgs.url = "/department/api/display/list";
        requestArgs.systemName = "wlanscope";
        this.http.httpGet(requestArgs).subscribe(res => {
            if (res.code === 0) {
                let tmp = [];
                for (let obj of res.result) {
                    tmp.push(<DropDownsInterface> {id: obj['id'], name: obj['deptName']});
                }
                this.deptDropDownList = tmp;
            } else if (res.code === 9) {
                this.deptDropDownList = [];
            } else {
                this._message.info(res.msg);
            }
        });
    }

    getEmpDropDownList() {
        let requestArgs = new RequestArgs();
        requestArgs.header = {'ticket': sessionStorage.getItem('ticket'), 'Content-Type': 'application/json'};
        requestArgs.url = "/employee/api/query/list";
        requestArgs.systemName = "wlanscope";
        this.http.httpGet(requestArgs).subscribe(res => {
            if (res.code === 0) {
                let tmp = [];
                for (let obj of res.result) {
                    tmp.push(<DropDownsInterface> {id: obj['id'], name: obj['empName']});
                }
                this.empDropDownList = tmp;
            } else if (res.code === 9) {
                this.empDropDownList = [];
            } else {
                this._message.info(res.msg);
            }
        });
    }
}
