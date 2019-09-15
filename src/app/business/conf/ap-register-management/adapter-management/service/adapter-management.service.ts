import {Injectable, ViewChild} from '@angular/core';
import {AdapterManagementHeadModel} from "../model/adapter-management-head.model";
import {AdapterManagementModel} from "../model/adapter-management.model";
import {NzMessageService, NzModalService, NzModalSubject} from "ng-zorro-antd";
import {HttpClientService} from "../../../../../shared/service/httpClient.service";
import {CommonUtilService} from "../../../../../shared/service/common-util.service";
import {TableComponent} from "../../../../../plugins/component/table/table.component";
import {RequestArgs} from "../../../../../shared/model/request-args";
import {DropDownsInterface} from "../../../../../shared/component/dropdown/model/dropdowns.model";

@Injectable()
export class AdapterManagementService {
    @ViewChild(TableComponent) child: TableComponent;
    /**http请求*/
    public requestArgs:RequestArgs = new RequestArgs();

    public adapterGroupDropDownList: Array<DropDownsInterface> = [];

    public adapterManagementHeadModel: AdapterManagementHeadModel = new AdapterManagementHeadModel();
    public adapterManagementModel: AdapterManagementModel = new AdapterManagementModel();

    /**订阅模态框*/
    subscription$: NzModalSubject;
    constructor(private http: HttpClientService, public modalService: NzModalService,
                public _message: NzMessageService, public commonUtilService: CommonUtilService) {
        this.requestArgs.systemName = 'wlanscope';
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket'),'Content-Type':'application/json;charset=UTF-8'};
        this.getAdapterList();
        this.getAdapterGroupDropDownList();
    }

    /**
     * 获取适配器列表数据
     */
    getAdapterList() {
        this.requestArgs.url="/api/v1/register/adapter/list";
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
        this.requestArgs.url="/api/v1/register/adapter/save";
        this.requestArgs.body= {
            "adapterIp" : item.adapterIp,
            "adapterName" : item.adapterName,
            "port" : item.port,
            "remark" : item.remark,
            "id" : item.id?item.id:null,
            "adapterGroupId" : item.adapterGroupId
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

    getAdapterGroupDropDownList() {
        this.requestArgs.url="/api/v1/adapter/group/list/drop";
        this.http.httpGet(this.requestArgs)
            .subscribe( res => {
                    if(res.code===0) {
                        let tmpDropDownList=[];
                        res.result.forEach(glt=> {
                            let tmp= {
                                id: glt.id,
                                name: glt.adapterGroupIp
                            };
                            tmpDropDownList.push(tmp);
                        });
                        this.adapterGroupDropDownList = tmpDropDownList;
                    } else {
                        this.adapterGroupDropDownList.push({
                            id: null,
                            name: "无"
                        });
                    }
                }
            );
    }

}
