import {Injectable} from '@angular/core';
import {HttpClientService} from "../../../../../shared/service/httpClient.service";
import {RequestArgs} from "../../../../../shared/model/request-args";
import {Router} from "@angular/router";
import {NzMessageService, NzModalService} from "ng-zorro-antd";

@Injectable()
export class ManageMyThemeService {
    public requestArgs: RequestArgs = new RequestArgs();
    constructor(public http: HttpClientService,
                public message: NzMessageService,
                public router: Router, public modal: NzModalService) {
        this.requestArgs.systemName = 'sensation';
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
    }

    public getTopicData() {
        this.requestArgs.url = "/crawler/crawler-theme-info/do-find-list";
        this.requestArgs.body = {};
        return this.http.httpPost(this.requestArgs);
    }

    public delTopicData(topicID: any) {
        this.requestArgs.url = "/crawler/crawler-theme-info/do-delete";
        this.requestArgs.body = {"teIds" : this._toString(topicID)};
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
}
