import { Injectable } from '@angular/core';
import { HttpClientService } from '../../../shared/service/httpClient.service';
import { NetworkOverviewModel } from '../model/network-overview.model';
import { NetworkOverviewInfoModel } from '../model/network-overview-info.model';
import { RequestArgs } from '../../../shared/model/request-args';
import { Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd";

@Injectable()
export class NetworkOverviewService {

    public networkOverviewModel: NetworkOverviewModel = new NetworkOverviewModel();

    /**
     * 构造函数
     * @param http HttpClientService
     *                  http请求方法
     */
    constructor(private http: HttpClientService,
                public message: NzMessageService,
                public router: Router) {}

    /**
     * 获取总网概览的方法
     * @param requestArgs RequestArgs
     *                    http请求参数
     */
    protected getNetworkOverviewInfo(requestArgs: RequestArgs) {
        requestArgs.url = '/api/v1/overview/net/overview';
        this.http.httpGet(requestArgs)
            .subscribe(
                res => {
                    let data = {
                        "dayTraffic": 0,
                        "currentClient": 0,
                        "useNet": 0,
                        "useDevice": 0,
                    };
                    if (res.code === 0) {
                        this.networkOverviewModel.networkOverviewInfoModel = <NetworkOverviewInfoModel> res.result;
                    } else if (res.code === 9) {
                        this.networkOverviewModel.networkOverviewInfoModel = <NetworkOverviewInfoModel> data;
                    } else {
                        this.networkOverviewModel.networkOverviewInfoModel = <NetworkOverviewInfoModel> data;
                    }
                });
    }

    /**
     * 获取关注网络的方法
     * @param requestArgs RequestArgs
     *                    http请求参数
     */
    protected getFocusWeb(requestArgs: RequestArgs) {
        requestArgs.url = '/api/v1/overview/net/focus';
        this.http.httpGet(requestArgs)
            .subscribe(
                res => {
                    let data = [
                        {
                            "netId": null,
                            "netName": "暂无网络",
                            "netCurrentClient": 0,
                            "netDayTraffic": 0,
                            "netAlarmNum": 0
                        },
                        {
                            "netId": null,
                            "netName": "暂无网络",
                            "netCurrentClient": 0,
                            "netDayTraffic": 0,
                            "netAlarmNum": 0
                        },
                        {
                            "netId": null,
                            "netName": "暂无网络",
                            "netCurrentClient": 0,
                            "netDayTraffic": 0,
                            "netAlarmNum": 0
                        }
                    ];
                    if (res.code === 0) {
                        this.networkOverviewModel.focusWeb = res.result;
                    } else if (res.code === 9) {
                        this.networkOverviewModel.focusWeb = data;
                    } else {
                        this.networkOverviewModel.focusWeb = data;
                    }
                });
    }

    /**
     * 获取网络列表的方法
     * @param requestArgs RequestArgs
     *                      http请求参数
     */
    protected getNetWorkList(requestArgs: RequestArgs) {
        requestArgs.url = '/api/v1/overview/net/list';
        this.http.httpGet(requestArgs)
            .subscribe(
                res => {
                    if (res.code === 0) {
                        this.networkOverviewModel.tableData = res.result;
                    } else if (res.code === 9) {
                        this.networkOverviewModel.tableData = [];
                    } else {
                        this.networkOverviewModel.tableData = [];
                    }
                });
    }

}
