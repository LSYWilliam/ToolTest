import {Injectable, ViewChild} from '@angular/core';
import {HttpClientService} from "../../../../../shared/service/httpClient.service";
import {RequestArgs} from "../../../../../shared/model/request-args";
import {DeptBasicInfoHead} from "../model/dept-basic-info-head.model";
import {NzMessageService, NzModalService, NzModalSubject} from "ng-zorro-antd";
import {DeptBasicInfoModel} from "../model/dept-basic-info.model";
import {DropDownsInterface} from "../../../../../shared/component/dropdown/model/dropdowns.model";
import {ZorroTableComponent} from "../../../../../shared/component/zorro-table/zorro-table.component";
import {CommonUtilService} from "../../../../../shared/service/common-util.service";

@Injectable()
export class DeptBasicInfoManagementService {
    @ViewChild(ZorroTableComponent) child: ZorroTableComponent;

    dataMenu;
    tableInput:any;
    requestArgs: RequestArgs = new RequestArgs();
    srcRequestArgs: RequestArgs = new RequestArgs();
    process:any;
    metaData:any;
    dropDownParentDeptList:any;

    /**订阅模态框*/
    subscription$: NzModalSubject;
    /**模态框传值*/
    element:DeptBasicInfoModel = new DeptBasicInfoModel();
    chosenElement = new DeptBasicInfoModel();
    deptListData;

    constructor(private http: HttpClientService, public modalService: NzModalService, public _message: NzMessageService,
                public commonUtilService: CommonUtilService) {
        this.tableInput = new DeptBasicInfoHead().tableInput;
        this.metaData = new DeptBasicInfoHead().metaData;
        this.srcRequestArgs.header = {'ticket': sessionStorage.getItem('ticket'),'Content-Type':'application/json'};
        this.srcRequestArgs.url="/hzfacade/depart/find-child-depart-info";
        this.srcRequestArgs.systemName = "attendance";
        this.chosenElement = new DeptBasicInfoModel();

        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket'),'Content-Type':'application/json'};

        /**页面赋值*/
        this.getDropTreeData();
        this.getDropDownParentDeptList();
        this.getDeptListData();
    }

    /**
     * 增加部门信息
     * @param {DeptBasicInfoModel} deptInfo
     */
    addDeptInfo(deptInfo: DeptBasicInfoModel) {
        this.requestArgs.url="/hzfacade/depart/do-add-input-depart-info";
        this.requestArgs.systemName = "attendance";
        this.requestArgs.body= {
            "partName" : deptInfo.partName,
            "partLeader" : deptInfo.partLeader,
            "partCode" : deptInfo.partCode,
            "parentPartCode" : deptInfo.parentPartCode?deptInfo.parentPartCode:""
        };
        this.http.httpGet(this.requestArgs).subscribe(res=> {
            if(res.code===0) {
                this._message.create('info', res.msg);
                this.child.refreshData(false);
                this.getDropTreeData();
                this.subscription$.destroy();
            } else {
                this._message.create('error', res.msg);
            }
        });
    }

    /**
     * 编辑部门信息
     * @param {DeptBasicInfoModel} deptInfo
     */
    editDeptInfo(deptInfo: DeptBasicInfoModel) {
        this.requestArgs.url="/hzfacade/depart/do-modify-depart-info";
        this.requestArgs.systemName = "attendance";
        this.requestArgs.body= {
            "partName" : deptInfo.partName,
            "partLeader" : deptInfo.partLeader,
            "partCode" : deptInfo.partCode
        };
        this.http.httpGet(this.requestArgs).subscribe(res=> {
            if(res.code===0) {
                this._message.create('info', res.msg);
                this.child.refreshData(false);
                this.getDropTreeData();
                this.subscription$.destroy();
            } else {
                this._message.create('error', res.msg);
            }
        });
    }

    /**
     * 删除部门信息
     * @param {DeptBasicInfoModel} deptInfo
     */
    delDeptInfo(deptInfo: DeptBasicInfoModel) {
        this.requestArgs.url="/hzfacade/depart/delete-depart-info";
        this.requestArgs.systemName = "attendance";
        this.requestArgs.body= {
            "partCode":deptInfo.partCode
        };
        this.http.httpGet(this.requestArgs).subscribe(res=> {
            if(res.code===0) {
                this._message.create('info', res.msg);
                this.child.refreshData(false);
                this.getDropTreeData();
            } else {
                this._message.create('error', res.msg);
            }
        });

    }

    /**
     * 获取下拉树数据
     */
    getDropTreeData() {
        this.requestArgs.url = "/hzfacade/user/find-all-depart-info";
        this.requestArgs.systemName = "attendance";
        this.requestArgs.body = {};
        this.http.httpGet(this.requestArgs).subscribe( res => {
            this.dataMenu = res.result;
            this.chosenElement = res.result[0];
        });
    }

    /**
     * 获取部门编码
     * @param parentPartCode
     * @returns {Observable<ReceiveModel>}
     */
    getPartCode(parentPartCode) {
        this.requestArgs.url="/hzfacade/depart/create-depart-code";
        this.requestArgs.systemName = "attendance";
        if(parentPartCode) {
            this.requestArgs.body = {'parentPartCode': parentPartCode };
        }
        return this.http.httpGet(this.requestArgs);
    }

    /**
     * 获取新增编辑弹出框中的上级部门下拉树
     */
    getDropDownParentDeptList() {
        this.requestArgs.url="/hzfacade/depart/list-depart-info";
        this.requestArgs.systemName = "attendance";
        this.requestArgs.body = {'pageNo': 0,'pageSize': 10000 };
        this.http.httpGet(this.requestArgs).subscribe(res=> {
            if(res.code===0) {
                let data = res.result;
                let dropDown=[];
                data.forEach(glt=> {
                    let tmp = <DropDownsInterface> {
                        id: glt.partCode,
                        name: glt.partName
                    };
                    dropDown.push(tmp);
                });
                dropDown.push({
                    id: "",
                    name: "最上级目录"
                });
                this.dropDownParentDeptList=dropDown;
            }
        });

    }

    /**
     * 获取指定的部门表格数据
     */
    getPartTable() {
        this.srcRequestArgs.body= {
            "partCode":this.chosenElement.partCode
        };
        this.child.refreshData(true);
    }

    /**
     * 获取全部的部门表格数据
     */
    getAllPartTable() {
        this.srcRequestArgs.body= {};
        this.child.refreshData(true);
    }

    /**
     * 获取部门列表数据
     */
    getDeptListData() {
        let requestArgs = new RequestArgs();
        requestArgs.header = {'ticket': sessionStorage.getItem('ticket'),'Content-Type':'application/json'};
        requestArgs.url="/hzfacade/depart/list-depart-info";
        requestArgs.systemName = "attendance";
        requestArgs.body = {'pageNo': 0,'pageSize': 10000 };
        this.http.httpGet(requestArgs).subscribe( res => {
            if(res.code===0) {
                let tmp = [];
                for (let obj of res.result) {
                    tmp.push(<DropDownsInterface> {id: obj['partCode'], name: obj['partName']});
                }
                this.deptListData = tmp;
            }
        });
    }
}
