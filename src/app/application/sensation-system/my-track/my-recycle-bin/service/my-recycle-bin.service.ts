import {Injectable} from '@angular/core';
import {HttpClientService} from "../../../../../shared/service/httpClient.service";
import {RequestArgs} from "../../../../../shared/model/request-args";
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {ReceiveModel} from "../../../../../shared/model/receive.model";
import {DropDownsInterface} from "../../../../../shared/component/dropdown/model/dropdowns.model";

@Injectable()
export class MyRecycleBinService {
    public topicList: Array<DropDownsInterface> = [];
    public topicID: string;
    public topicData: any;
    /**按钮类型*/
    public bidBtnType: any;
    public govBtnType: any;
    /**flag 0 招标信息按钮 1 政府政策信息按钮*/
    public flag: any;

    public requestArgs: RequestArgs = new RequestArgs();
    constructor(public http: HttpClientService, activatedRoute: ActivatedRoute, public router : Router,
                public modal: NzModalService, public message: NzMessageService,
               ) {
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
                        this.topicID = list[0]['id'];
                    }
                    else{
                        this.router.navigateByUrl('/manage-my-theme');
                    }
                } else {
                    this.router.navigateByUrl('/manage-my-theme');
                }
            }
        );
        this.bidBtnType = 'primary';
        this.flag = 0;

        this.requestArgs.systemName = 'sensation';
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
    }
    /**获取招标信息表格数据 或者 政府政策信息数据*/
    getTableList(url, topicID: string, startDate: string, endDate: string) {
        this.requestArgs.url = url;
        this.requestArgs.body = {"teId": this._toString([topicID]),"beginTime": startDate,"endTime": endDate};
        return this.http.httpPost(this.requestArgs);
    }

    cancelDelete(data: Array<string>, url ) {
        this.requestArgs.url = url;
        this.requestArgs.body = {"teCollectIds": this._toString(data)};
        return this.http.httpPost(this.requestArgs);
    }

    deleteComplete(data: Array<string>, url) {
        this.requestArgs.url = url;
        this.requestArgs.body = {"teCollectIds": this._toString(data)};
        return this.http.httpPost(this.requestArgs);
    }
    /**获取下拉列表数据*/
    getGovSelectData(url) {
        this.requestArgs.url = url;
        this.requestArgs.body = {};
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
