import {Inject, Injectable, ViewChild} from '@angular/core';
import {HttpClientService} from "../../../../../shared/service/httpClient.service";
import {RequestArgs} from "../../../../../shared/model/request-args";
import {StaffBasicInfoHead} from "../model/staff-basic-info-head.model";
import {ZorroTableComponent} from "../../../../../shared/component/zorro-table/zorro-table.component";
import {DOCUMENT} from "@angular/common";
import {NzMessageService, NzModalService, NzModalSubject} from "ng-zorro-antd";
import {StaffBasicInfoModel} from "../model/staff-basic-info.model";
import {CommonUtilService} from "../../../../../shared/service/common-util.service";
import {Router} from "@angular/router";

@Injectable()
export class StaffBasicInfoManagementService {
    @ViewChild(ZorroTableComponent) child: ZorroTableComponent;
    tableInput: any;
    srcRequestArgs: any;
    requestArgs: any;
    /**订阅模态框*/
    subscription$: NzModalSubject;
    operationFlag: string;

    constructor(private http: HttpClientService,@Inject(DOCUMENT) private document, public modalService: NzModalService,
                public _message: NzMessageService, public commonUtilService: CommonUtilService, private router: Router) {
        /**给页面表格赋值*/
        this.tableInput=new StaffBasicInfoHead().tableInput;
        this.srcRequestArgs=new RequestArgs();
        this.srcRequestArgs.url="/hzfacade/user/list-user-info";
        this.srcRequestArgs.systemName = "attendance";
        this.srcRequestArgs.header = {'ticket': sessionStorage.getItem('ticket'),'Content-Type':'application/json'};
        this.requestArgs=new RequestArgs();
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
        this.judegDepartment();
    }

    judegDepartment() {
        let requestArgs = new RequestArgs();
        requestArgs.header = {'ticket': sessionStorage.getItem('ticket'),'Content-Type':'application/json'};
        requestArgs.url="/hzfacade/depart/list-depart-info";
        requestArgs.systemName = "attendance";
        requestArgs.body = {'pageNo': 0,'pageSize': 10000 };
        this.http.httpGet(requestArgs).subscribe(res=> {
            if(res.code!==0) {
                this._message.create('info', "暂无部门相关情况，管理员工前，请先新建部门！");
                this.router.navigateByUrl('/dept-basic-info-management');
            }
        });
    }

    /**
     * 新增员工服务
     * @param {StaffBasicInfoModel} item
     */
    addStaff(item:StaffBasicInfoModel) {
        this.requestArgs.body = item;
        this.requestArgs.url = "/hzfacade/user/do-add-user-info";
        this.requestArgs.systemName = "attendance";
        this.http.httpGet(this.requestArgs).subscribe(res=> {
            if(res.code===0) {
                this._message.create('info', res.msg);
                this.child.refreshData(false);
                this.subscription$.destroy();
            } else {
                this._message.create('error', res.msg);
            }
        });
    }

    /**
     * 编辑员工服务
     * @param {StaffBasicInfoModel} item
     */
    editStaff(item:StaffBasicInfoModel) {
        this.requestArgs.body = item;
        this.requestArgs.url = "/hzfacade/user/do-modify-user-info";
        this.requestArgs.systemName = "attendance";
        this.http.httpGet(this.requestArgs).subscribe(res=> {
            if(res.code===0) {
                this._message.create('info', res.msg);
                this.child.refreshData(false);
                this.subscription$.destroy();
            } else {
                this._message.create('error', res.msg);
            }
        });
    }

    /**
     * 删除员工服务
     * @param {StaffBasicInfoModel} item
     */
    delStaff(ids) {
        this.requestArgs.body = {
            'usrIds': ids.join(",")
        };
        this.requestArgs.url = "/hzfacade/user/do-delete-user-list";
        this.requestArgs.systemName = "attendance";
        this.http.httpGet(this.requestArgs).subscribe(res=> {
            if(res.code===0) {
                this._message.create('info', res.msg);
                this.child.refreshData(false);
            } else {
                this._message.create('error', res.msg);
            }
        });
    }

    /**
     * 下载数据服务
     * @param {StaffBasicInfoModel} item
     */
    DownLoadDataFile() {
        this.requestArgs.url = '/hzfacade/user/list-user-info';
        this.requestArgs.systemName = "attendance";
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
        this.requestArgs.body = {
            'pageNo': 0,
            'pageSize': 10000
        };
        this.http.httpGet(this.requestArgs).subscribe(res=> {
            this.JSONToCSVConvertor(res.result, "员工信息列表", true);
        });
    }

    /**
     * 将JSON转化成SCV格式
     * @param JSONData 数据
     * @param ReportTitle 标题
     * @param ShowLabel 是否展示数据栏
     * @constructor
     */
    JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
        let arrData = typeof JSONData !== 'object' ? JSON.parse(JSONData) : JSONData;
        let CSV = 'data:text/csv;charset=utf-8,\ufeff';
        CSV += ReportTitle + '\r\n\n';
        if (ShowLabel) {
            let row = "真实姓名"+','+"个人账号"+','+"手机号码"+','+"职位"+','+"部门"+','+"邮箱"+','
                +"入职时间"+','+"状态"+',';
            row = row.slice(0, -1);
            CSV += row + '\r\n';
        }
        for (let i = 0; i < arrData.length; i++) {
            let row = "";
            row +='"' + arrData[i].usrRealName + '","' + arrData[i].usrName + '","' + arrData[i].usrMobile + '","'
                + arrData[i].usrPosition + '","' + arrData[i].partName + '","' + arrData[i].usrEmail + '","'
                + arrData[i].usrRegisterTime + '","' + arrData[i].usrWorkStatus + '",' ;
            row.slice(0, row.length - 1);
            CSV += row + '\r\n';
        }

        if (CSV === '') {
            alert("Invalid data");
            return;
        }

        let fileName = "员工信息列表.csv";
        if (window.navigator.msSaveOrOpenBlob) {
            // if browser is IE
            let blob = new Blob([decodeURIComponent(encodeURI(CSV))], {
                type: "text/csv;charset=utf-8;"
            });
            navigator.msSaveBlob(blob, fileName);
        } else {
            let encodedUri = encodeURI(CSV);
            let link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", fileName);
            document.body.appendChild(link);
            link.click();
        }
    }

}
