import {Injectable} from '@angular/core';
import {HttpClientService} from "../../../../../shared/service/httpClient.service";
import {RequestArgs} from "../../../../../shared/model/request-args";
import {DropDownsInterface} from "../../../../../shared/component/dropdown/model/dropdowns.model";
import {StaticDataModel} from "../model/static-data.model";
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {ReceiveModel} from "../../../../../shared/model/receive.model";

@Injectable()
export class OpenBidService {
    public topicList: Array<DropDownsInterface> = [];
    public topicID: number;
    public topicData: any;
    public requestArgs: RequestArgs = new RequestArgs();
    constructor(public http: HttpClientService, activatedRoute: ActivatedRoute, private router : Router,
                public modal: NzModalService, public message: NzMessageService) {
        activatedRoute.data.subscribe(
            ( data:{networkList: ReceiveModel} ) => {
                if (data.networkList.code === 0) {
                    let list: Array<DropDownsInterface> = [];
                    data.networkList.result.forEach(
                        res => {
                            list.push(<DropDownsInterface>{id: res['teId'], name: res['teName']});
                        }
                    );
                    if (list.length > 0) {
                        this.topicList = list;
                        this.topicID = Number(list[0]['id']);
                    }
                    else{
                        this.router.navigateByUrl('/manage-my-theme');
                    }
                } else {
                    this.router.navigateByUrl('/manage-my-theme');
                }
            }
        );
        this.requestArgs.systemName = 'sensation';
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
    }

    getTableList(topicID: number) {
        this.requestArgs.url = "/crawler/crawler-collect-info/find-kb-list-collect-info";
        this.requestArgs.body = {"teId": topicID};
        return this.http.httpPost(this.requestArgs);

    }

}
