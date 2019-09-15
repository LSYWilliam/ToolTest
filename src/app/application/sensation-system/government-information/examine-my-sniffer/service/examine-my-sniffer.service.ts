import {Injectable} from '@angular/core';
import {HttpClientService} from "../../../../../shared/service/httpClient.service";
import {RequestArgs} from "../../../../../shared/model/request-args";
import {QueryDataModel} from "../model/query-data.model";
import {SearchModel} from "../model/search.model";
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {ReceiveModel} from "../../../../../shared/model/receive.model";
import {DropDownsInterface} from "../../../../../shared/component/dropdown/model/dropdowns.model";


@Injectable()
export class ExamineMySnifferService {
    public topicList: Array<DropDownsInterface> = [];
    public topicID: number;
    public topicData: any = [];
    private requestArgs: RequestArgs = new RequestArgs();
    constructor(private http: HttpClientService, activatedRoute: ActivatedRoute, public router : Router,
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
                    } else{
                        this.router.navigateByUrl('/manage-my-sniffer');
                    }
                } else {
                    this.router.navigateByUrl('/manage-my-sniffer');
                }
            }
        );
        this.requestArgs.systemName = 'sensation';
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
        // this.requestArgs.header = {'ticket': '5b5cd68e0cec422ab05c24ff75c8549e'};

    }

    public getTopicData(queryPara:QueryDataModel, topId: number) {
        let search: SearchModel = new SearchModel(queryPara, topId);
        this.requestArgs.url = "/crawler/crawler-collect-info/gov-find-list-collect-info";
        this.requestArgs.body = search.toJson();
        return this.http.httpPost(this.requestArgs);
    }

    public getTopicData2(value) {
        this.requestArgs.url = "/crawler/crawler-collect-info/gov-find-list-collect-info";
        this.requestArgs.body = value;
        return this.http.httpPost(this.requestArgs);
    }

    public delTopicData(collectId: string, text: string) {
        this.requestArgs.url = "/crawler/crawler-delete-collect-info/gov-soft-delete-collect-info";
        this.requestArgs.body = {"teCollectIds": this._toString([collectId]), "teCollectContent": text};
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

    isAttentionTopicData(collectId: string,url) {
        this.requestArgs.url = url;
        this.requestArgs.body = {"teCollectIds": this._toString([collectId])};
        return this.http.httpPost(this.requestArgs);
    }
}
