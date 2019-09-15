import {Injectable, ViewChild} from '@angular/core';
import {NzMessageService, NzModalService, NzModalSubject} from "ng-zorro-antd";
import {HttpClientService} from "../../../../../shared/service/httpClient.service";
import {CommonUtilService} from "../../../../../shared/service/common-util.service";
import {TableComponent} from "../../../../../plugins/component/table/table.component";
import {RequestArgs} from "../../../../../shared/model/request-args";
import {AdapterGroupManagementHeadModel} from "../model/adapter-group-management-head.model";
import {AdapterGroupManagementModel} from "../model/adapter-group-management.model";

@Injectable()
export class AdapterGroupManagementService {
    @ViewChild(TableComponent) child: TableComponent;
    /**http请求*/
    public requestArgs:RequestArgs = new RequestArgs();

    public adapterManagementHeadModel: AdapterGroupManagementHeadModel = new AdapterGroupManagementHeadModel();
    public adapterManagementModel: AdapterGroupManagementModel = new AdapterGroupManagementModel();

    /**订阅模态框*/
    subscription$: NzModalSubject;
    constructor(private http: HttpClientService, public modalService: NzModalService,
                public _message: NzMessageService, public commonUtilService: CommonUtilService) {
        this.requestArgs.systemName = 'wlanscope';
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket'),'Content-Type':'application/json;charset=UTF-8'};
        this.getAdapterList();
    }

    /**
     * 获取适配器列表数据
     */
    getAdapterList() {
        this.requestArgs.url="/api/v1/adapter/group/list";
        this.http.httpGet(this.requestArgs)
            .subscribe( res => {
                if(res.code===0) {
                    this.adapterManagementModel.tableData = res.result;
                } else if(res.code===9) {
                    this.adapterManagementModel.tableData = [];
                } else {
                    this.adapterManagementModel.tableData = [];
                    this._message.create('error', res.msg);
                }}
            );
    }

    /**
     * 保存适配器数据
     * @param item 传入的适配器参数
     */
    saveAdapterInfo(item) {
        this.requestArgs.url="/api/v1/adapter/group/save";
        this.requestArgs.body= {
            "id": item.id?item.id:null,
            "adapterGroupName" : item.adapterGroupName,
            "adapterGroupIp" : item.adapterGroupIp,
            "webPort" : item.webPort,
            "udpPort" : item.udpPort,
            "address" : item.address,
            "remark" : item.remark
        };
        this.http.httpPost(this.requestArgs)
            .subscribe( res => {
                    if(res.code===0) {
                        this.subscription$.destroy();
                        this.getAdapterList();
                        this._message.create('info', res.msg);
                    } else if(res.code===9) {
                    } else {
                        this._message.create('error', res.msg);
                    }
                }
            );
    }

}
