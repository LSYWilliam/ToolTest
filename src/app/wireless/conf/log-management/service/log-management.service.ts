import {Injectable, ViewChild} from '@angular/core';
import {NzMessageService, NzModalService, NzModalSubject} from "ng-zorro-antd";
import {TableComponent} from "../../../../plugins/component/table/table.component";
import {RequestArgs} from "../../../../shared/model/request-args";
import {HttpClientService} from "../../../../shared/service/httpClient.service";
import {CommonUtilService} from "../../../../shared/service/common-util.service";
import {LogManagementModel} from "../model/log-management.model";
import {LogManagementHeadModel} from "../model/log-management-head.model";
import {ActivatedRoute, Router} from "@angular/router";
import {NetworkListResolverModel} from "../../../../shared/model/network-list-resolver.model";

@Injectable()
export class LogManagementService {
    @ViewChild(TableComponent) child: TableComponent;
    /**http请求*/
    public requestArgs: RequestArgs = new RequestArgs();

    public logManagementHeadModel: LogManagementHeadModel = new LogManagementHeadModel();
    public logManagementModel: LogManagementModel = new LogManagementModel();

    public businessId;
    public dropDownNetList;
    public networkList;
    /**订阅模态框*/
    subscription$: NzModalSubject;

    constructor(public http: HttpClientService, public modalService: NzModalService,
                public _message: NzMessageService, public commonUtilService: CommonUtilService,
                public activatedRoute: ActivatedRoute, public router: Router) {
        this.requestArgs.systemName = 'wlanscope';
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket'), 'Content-Type': 'application/json;charset=UTF-8'};
        this.getNetworkList(activatedRoute,router);
        this.getNetList();
        this.getBusinessesInfo();
    }

    /**
     * 商户详细信息查询
     */
    protected getBusinessesInfo() {
        let requestArgs = new RequestArgs();
        requestArgs.systemName = "wlanscope";
        requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
        requestArgs.url = "/api/v1/businesses/detail";
        this.http.httpGet(requestArgs).subscribe(
            res => {
                if (res.code === 0) {
                    this.businessId = res.result.businessId;
                    this.getLogList();
                }
            }
        );
    }

    /**
     * 获取网络列表下拉菜单的内容
     * @param activatedRoute  ActivatedRoute
     *              路由服务
     * @param router  Router
     *             路由服务
     */
    protected getNetworkList(activatedRoute: ActivatedRoute, router: Router) {
        this.networkList = new NetworkListResolverModel(activatedRoute, router).networkList;
    }

    /**
     * 获取适配器列表数据
     */
    getLogList() {
        let requestArgs = new RequestArgs();
        requestArgs.systemName = "wlanscope";
        requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
        requestArgs.url = `/api/v1/log_manage/list/${this.businessId}`;
        this.http.httpGet(requestArgs)
            .subscribe(res => {
                    if (res.code === 0) {
                        this.logManagementModel.tableData = res.result;
                        console.log(this.logManagementModel.tableData);
                    } else if (res.code === 9) {
                        this.logManagementModel.tableData = [];
                    } else {
                        this.logManagementModel.tableData = [];
                        this._message.create('error', res.msg);
                    }
                }
            );
    }

    /**
     * 保存适配器数据
     * @param item 传入的适配器参数
     */
    addLogInfo(item) {
        this.requestArgs.url = "/api/v1/log_manage/add";
        this.requestArgs.body = {
            "netId": item.netId ? item.netId : null,
            "step": item.step,
            "flag": item.flag,
            "host1": item.host1,
            "port1": parseInt(item.port1, 0),
            "host2": item.host2,
            "port2": parseInt(item.port2, 0),
            "host3": item.host3,
            "port3": parseInt(item.port3, 0)
        };
        if (item.host2 === "") {
            delete this.requestArgs.body.host2;
        }
        if (item.port2 === "") {
            delete this.requestArgs.body.port2;
        }
        if (item.host3 === "") {
            delete this.requestArgs.body.host3;
        }
        if (item.port3 === "") {
            delete this.requestArgs.body.port3;
        }
        this.http.httpPost(this.requestArgs)
            .subscribe(res => {
                    if (res.code === 0) {
                        this.subscription$.destroy();
                        this.getLogList();
                        this._message.create('info', res.msg);
                    } else if (res.code === 9) {
                    } else {
                        this._message.create('error', res.msg);
                    }
                }
            );
    }

    /**
     * 保存适配器数据
     * @param item 传入的适配器参数
     */
    editLogInfo(item) {
        this.requestArgs.url = "/api/v1/log_manage/update";
        this.requestArgs.body = {
            "id": item.id,
            "netId": item.netId,
            "step": item.step,
            "flag": item.flag,
            "host1": item.host1,
            "port1": parseInt(item.port1, 0),
            "host2": item.host2 === "" ? null : item.host2,
            "port2": parseInt(item.port2, 0),
            "host3": item.host3 === "" ? null : item.host3,
            "port3": parseInt(item.port3, 0)
        };
        if (item.host2 === "") {
            delete this.requestArgs.body.host2;
        }
        if (item.port2 === "") {
            delete this.requestArgs.body.port2;
        }
        if (item.host3 === "") {
            delete this.requestArgs.body.host3;
        }
        if (item.port3 === "") {
            delete this.requestArgs.body.port3;
        }
        this.http.httpPost(this.requestArgs)
            .subscribe(res => {
                    if (res.code === 0) {
                        this.subscription$.destroy();
                        this.getLogList();
                        this._message.create('info', res.msg);
                    } else if (res.code === 9) {
                    } else {
                        this._message.create('error', res.msg);
                    }
                }
            );
    }

    delLogNum(ids) {
        this.requestArgs.url = `/api/v1/log_manage/delete/${this.businessId}`;
        this.requestArgs.body = ids;
        this.http.httpPost(this.requestArgs).subscribe(
            res => {
                if (res.code === 0) {
                    this.child.singleDelete();
                    this._message.success('删除成功!');
                } else {
                    this._message.error('删除失败！');
                    this._message.error(res.msg);
                }
            }
        );
    }

    /**
     * 获取适配器列表数据
     */
    getNetList() {
        let requestArgs = new RequestArgs();
        requestArgs.systemName = "wlanscope";
        requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
        requestArgs.url = `/api/v1/wireless/getNetList`;
        this.http.httpGet(requestArgs)
            .subscribe(res => {
                    if (res.code === 0) {
                        this.dropDownNetList = res.result;
                    } else if (res.code !== 9) {
                        this._message.create('error', res.msg);
                    }
                }
            );
    }

}
