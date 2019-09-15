import {Injectable, ViewChild} from '@angular/core';
import {NzMessageService, NzModalService, NzModalSubject} from "ng-zorro-antd";
import {HttpClientService} from "../../../../shared/service/httpClient.service";
import {CommonUtilService} from "../../../../shared/service/common-util.service";
import {RequestArgs} from "../../../../shared/model/request-args";
import {ApplicationItem} from "../model/application-store.model";

@Injectable()
export class ApplicationStoreService {
    /**http请求*/
    public requestArgs:RequestArgs = new RequestArgs();

    public itemList: Array<ApplicationItem>;

    /**订阅模态框*/
    subscription$: NzModalSubject;
    constructor(private http: HttpClientService, public modalService: NzModalService,
                public _message: NzMessageService, public commonUtilService: CommonUtilService) {
        this.requestArgs.systemName = 'test';
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket'),'Content-Type':'application/json;charset=UTF-8'};
        this.getApplicationList();
        // this.getAdapterGroupDropDownList();
    }

    /**
     */
    getApplicationList() {
        this.requestArgs.url="/assets/data/api/v1/ApplicationStore/list.json";
        this.http.httpGet(this.requestArgs)
            .subscribe( res => {
                if(res.code===0) {
                    this.itemList = res.result;
                } else if(res.code===9) {
                } else {
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
                    } else {
                    }
                }
            );
    }

}
