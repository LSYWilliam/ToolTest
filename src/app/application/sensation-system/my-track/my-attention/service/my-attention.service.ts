import {Injectable} from '@angular/core';
import {HttpClientService} from "../../../../../shared/service/httpClient.service";
import {RequestArgs} from "../../../../../shared/model/request-args";
import {NzMessageService} from "ng-zorro-antd";

@Injectable()
export class MyAttentionService {
    /**按钮类型*/
    public bidBtnType: any;
    public govBtnType: any;
    /**flag 0 招标信息按钮 1 政府政策信息按钮*/
    public flag: any;

    public requestArgs: RequestArgs = new RequestArgs();
    constructor(public http: HttpClientService, public message: NzMessageService,) {
        this.bidBtnType = 'primary';
        this.flag = 0;
        this.requestArgs.systemName = 'sensation';
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
    }

    getTableList(url) {
        this.requestArgs.url = url;
        return this.http.httpPost(this.requestArgs);
    }

    public delTopicData(collectId: any) {
        this.requestArgs.url = "/crawler/crawler-delete-collect-info/soft-delete-collect-info";
        this.requestArgs.body = {"teCollectIds": this._toString(collectId)};
        return this.http.httpPost(this.requestArgs);
    }

    _toString(topicID: any) {
        let ids = "";
        for(let i = 0 ; i <topicID.length;i++) {
            ids = ids+topicID[i];
            if (i<topicID.length-1)
                ids = ids+",";
        }
        return ids;
    }

    public cancelAttentionData(collectId: any, url) {
        this.requestArgs.url = url;
        this.requestArgs.body = {"teCollectIds": this._toString(collectId)};
        return this.http.httpPost(this.requestArgs);
    }
}
