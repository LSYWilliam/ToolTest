import { Injectable } from '@angular/core';
import {HttpClientService} from "../../../../../shared/service/httpClient.service";
import {ApResourceMonitorModel} from "../model/ap-resource-monitor.model";
import {ApResourceMonitorHeadModel} from "../model/ap-resource-monitor-head.model";
import {RequestArgs} from "../../../../../shared/model/request-args";
import {NzMessageService} from "ng-zorro-antd";

@Injectable()
export class ApResourceMonitorService {
    /**http请求*/
    public requestArgs: RequestArgs = new RequestArgs();

    public apResourceMonitorHeadModel: ApResourceMonitorHeadModel = new ApResourceMonitorHeadModel();
    public apResourceMonitorModel: ApResourceMonitorModel = new ApResourceMonitorModel();

    constructor(private http: HttpClientService, public _message: NzMessageService) {
        this.getApResourceMonitorList();
    }

    getApResourceMonitorList() {
        this.requestArgs.systemName = 'wlanscope';
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket'), 'Content-Type': 'application/json;charset=UTF-8'};
        this.requestArgs.url="/api/v1/register/overview";
        this.http.httpGet(this.requestArgs)
            .subscribe(res => {
                    if (res.code === 0) {
                        this.apResourceMonitorModel.tableData = res.result;
                    } else if (res.code === 9) {
                    } else {
                        this._message.create('error', res.msg);
                    }
                }
            );
    }
}
