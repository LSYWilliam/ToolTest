import {Injectable, ViewChild} from '@angular/core';
import {HttpClientService} from "../../../../../shared/service/httpClient.service";
import {NzMessageService, NzModalService, NzModalSubject} from "ng-zorro-antd";
import {CommonUtilService} from "../../../../../shared/service/common-util.service";
import {TableComponent} from "../../../../../plugins/component/table/table.component";
import {RequestArgs} from "../../../../../shared/model/request-args";
import {DropDownsInterface} from "../../../../../shared/component/dropdown/model/dropdowns.model";
import {AdapterGroupRegisterModel} from "../model/adapter-group-register.model";
import {AdapterGroupRegisterHeadModel} from "../model/adapter-group-register-head.model";

@Injectable()
export class AdapterGroupRegisterService {
    @ViewChild(TableComponent) child: TableComponent;
    /**http请求*/
    public requestArgs: RequestArgs = new RequestArgs();

    public apRegisterHeadModel: AdapterGroupRegisterHeadModel = new AdapterGroupRegisterHeadModel();
    public apRegisterModel: AdapterGroupRegisterModel = new AdapterGroupRegisterModel();

    public adapterGroupDropDownList: Array<DropDownsInterface> = [];
    /**订阅模态框*/
    subscription$: NzModalSubject;

    constructor(private http: HttpClientService, public modalService: NzModalService,
                public _message: NzMessageService, public commonUtilService: CommonUtilService) {
        this.requestArgs.systemName = 'wlanscope';
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket'), 'Content-Type': 'application/json;charset=UTF-8'};
        this.getRegisterList();
        this.getAdapterGroupDropDownList();
    }

    getRegisterList() {
        this.requestArgs.url="/api/v1/adapter/biz/list";
        this.http.httpGet(this.requestArgs)
            .subscribe(res => {
                    if (res.code === 0) {
                        this.apRegisterModel.tableData = res.result;
                    } else if (res.code === 9) {
                        this.apRegisterModel.tableData = [];
                    } else {
                        this.apRegisterModel.tableData = [];
                        this._message.create('error', res.msg);
                    }
                }
            );
    }

    saveAPAdapter(item) {
        this.requestArgs.url="/api/v1/adapter/biz/update";
        this.requestArgs.body= {
            "adapterGroupId" : item.adapterGroupId,
            "businessId" : item.businessId
        };
        this.http.httpPost(this.requestArgs)
            .subscribe( res => {
                    if(res.code===0) {
                        this.getRegisterList();
                        this.subscription$.destroy();
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
