import {Injectable, ViewChild} from '@angular/core';
import {RequestArgs} from "../../../../../shared/model/request-args";
import {NzMessageService, NzModalService, NzModalSubject} from "ng-zorro-antd";
import {HttpClientService} from "../../../../../shared/service/httpClient.service";
import {CommonUtilService} from "../../../../../shared/service/common-util.service";
import {DropDownsInterface} from "../../../../../shared/component/dropdown/model/dropdowns.model";
import {DeptMgmtDataModel, DeptMgmtElement} from "../model/dept-mgmt-data-model";
import {DeptMgmtHeadDataModel} from "../model/dept-mgmt-head-data-model";
import {BusinessInfomationInterface} from "../../../business-information/model/business-infomation.interface";
import {RegisterInfoModel} from "../../../business-information/model/register-info.model";
import {TableComponent} from "../../../../../plugins/component/table/table.component";

@Injectable()
export class DepartmentManagementService {
    deptMgmtHeadDataModel: DeptMgmtHeadDataModel = new DeptMgmtHeadDataModel();
    deptMgmtDataModel: DeptMgmtDataModel = new DeptMgmtDataModel();
    dataMenu;
    dataRoot;
    deptListData;
    chosenElement = new DeptMgmtElement();
    chosenUPElement = new DeptMgmtElement();
    registerInfo: RegisterInfoModel = new RegisterInfoModel();
    parentList;
    flag;
    @ViewChild(TableComponent) child: TableComponent;

    /**订阅模态框*/
    subscription$: NzModalSubject;
    requestArgs: RequestArgs = new RequestArgs();

    constructor(private http: HttpClientService, public modalService: NzModalService, public _message: NzMessageService,
                public commonUtilService: CommonUtilService) {
        this.requestArgs.systemName = 'wlanscope';
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket'), 'Content-Type': 'application/json;charset=UTF-8'};

        this.getDropTreeData();
        // this.getDeptListData();
        this.getRegisterInfo();
        this.deptMgmtDataModel.list = [];
        this.getParentList();
    }

    /**
     * 商户详细信息查询
     */
    protected getRegisterInfo() {
        this.requestArgs.url = "/api/v1/businesses/detail";
        this.requestArgs.systemName = "wlanscope";
        this.http.httpGet(this.requestArgs).subscribe(
            res => {
                if (res.code === 0) {
                    this.registerInfo.setData(<BusinessInfomationInterface> res.result);
                    this.requestArgs.url = "/api/v1/ap_info/" + this.registerInfo.businessId + "/list";
                    this.http.httpGet(this.requestArgs).subscribe(
                        res2 => {
                            if (res2.code === 0) {
                                this.registerInfo.apNum = res2.pagination['totalElements'];
                            } else if (res2.code === 9) {
                                if (res2.result.length === 0) {
                                }
                                this.registerInfo.apNum = res2.pagination['totalElements'];
                            }
                        }
                    );
                }
            }
        );
    }

    /**
     * 获取下拉树数据
     */
    getDropTreeData(id?) {
        this.requestArgs.url = "/department/api/query/childList";
        this.requestArgs.systemName = "wlanscope";
        this.requestArgs.body = {
        };
        this.http.httpGet(this.requestArgs).subscribe(res => {
            if (res.code === 0) {
                this.dataMenu = res.result.children.length?res.result.children:[];
                this.dataRoot = res.result;
                if(this.dataMenu.length>0) {
                    if (!id) {
                        this.getOneDept(res.result.id);
                        this.getPartTable(res.result.id);
                    } else {
                        this.getOneDept(id);
                        this.getPartTable(id);
                    }
                }
            } else if (res.code === 9) {
                this.dataMenu = [];
            } else {
                this._message.info(res.msg);
            }
        });
    }

    getPartTable(id) {
        this.requestArgs.url = "/department/api/get/one_child_list";
        this.requestArgs.systemName = "wlanscope";
        this.requestArgs.body = {
            id: id
        };
        this.http.httpGet(this.requestArgs).subscribe(res => {
            if (res.code === 0 || res.code === 9) {
                this.deptMgmtDataModel.list = res.result.length?res.result:[];
                if (this.subscription$) {
                    this.subscription$.destroy();
                }
            } else {
                this._message.info(res.msg);
            }
        });
    }

    getOneDept(id?) {
        this.requestArgs.url = "/department/api/query/one";
        this.requestArgs.systemName = "wlanscope";
        this.requestArgs.body = {
            id: id
        };
        this.http.httpGet(this.requestArgs).subscribe(res => {
            if (res.code === 0) {
                this.chosenElement = res.result;
                this.chosenUPElement = res.result;
            } else {
                this._message.info(res.msg);
            }
        });
    }

    addDeptInfo(item) {
        this.requestArgs.url = "/department/api/create_or_update";
        this.requestArgs.systemName = "wlanscope";
        this.requestArgs.body = {
            deptName: item.deptName,
            parentId: item.parentId,
            parentName: item.parentName,
            managerName: item.managerName,
            deptCode: item.deptCode
        };
        this.http.httpPost(this.requestArgs).subscribe(res => {
            if (res.code === 0 || res.code === 9) {
                if (this.subscription$) {
                    this.subscription$.destroy();
                }
                this.chosenElement = res.result;
                this.getDropTreeData(item.parentId);
                this.getParentList();
            } else {
                this._message.info(res.msg);
            }
        });
    }

    editDeptInfo(item) {
        this.requestArgs.url = "/department/api/create_or_update";
        this.requestArgs.systemName = "wlanscope";
        this.requestArgs.body = {
            id: item.id,
            deptName: item.deptName,
            parentId: item.parentId,
            managerName: item.managerName,
            deptCode: item.deptCode
        };
        this.http.httpPost(this.requestArgs).subscribe(res => {
            if (res.code === 0 || res.code === 9) {
                if (this.subscription$) {
                    this.subscription$.destroy();
                }
                this.chosenElement = res.result;
                this.getDropTreeData(item.parentId);
                this.getParentList();
            } else {
                this._message.info(res.msg);
            }
        });
    }

    delItems(ids) {
        let requestArgs = new RequestArgs();
        requestArgs.header = {'ticket': sessionStorage.getItem('ticket'), 'Content-Type': 'application/json'};
        // requestArgs.url = "/department/api/delete/dept_list";
        requestArgs.url = "/department/api/delete/lists";
        requestArgs.systemName = "wlanscope";
        requestArgs.body = ids;
        this.http.httpPost(requestArgs).subscribe(res => {
            if (res.code === 0 || res.code === 9) {
                this.getDropTreeData();
                this.getParentList();
            } else {
                this._message.info(res.msg);
            }
        });
    }

    getParentList() {
        let requestArgs = new RequestArgs();
        requestArgs.header = {'ticket': sessionStorage.getItem('ticket'), 'Content-Type': 'application/json'};
        requestArgs.url = "/department/api/display/list";
        requestArgs.systemName = "wlanscope";
        this.http.httpGet(requestArgs).subscribe(res => {
            if (res.code === 0 || res.code === 9) {
                let tmp = [];
                for (let obj of res.result) {
                    tmp.push(<DropDownsInterface> {id: obj['id'], name: obj['deptName']});
                }
                this.parentList = tmp;
            } else {
                this._message.info(res.msg);
            }
        });
    }

}
