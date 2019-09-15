import { Injectable } from '@angular/core';
import {OnlineVisitorsModel} from "../model/online-visitors.model";
import {HttpClientService} from "../../../../../shared/service/httpClient.service";
import {RequestArgs} from "../../../../../shared/model/request-args";
import {HighChartsModel} from "../../../../../plugins/component/highcharts/model/highCharts.model";

@Injectable()
export class OnlineVisitorsService {
    options: any;
    requestArgs:RequestArgs = new RequestArgs();
    visitorNum: number;
    onlineVisitorsCharts: HighChartsModel = new HighChartsModel();

    constructor(protected http: HttpClientService) {
        this.onlineVisitorsCharts = new HighChartsModel();
        this.onlineVisitorsCharts.chartType = "HighChart";

        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket'),'Content-Type':'application/json'};
        this.getDrawData();
    }

    /**
     * 获取绘图数据
     */
    getDrawData() {
        this.requestArgs.url="/hzfacade/ewifi/visitor-management";
        this.requestArgs.systemName = "attendance";
        this.http.httpGet(this.requestArgs).subscribe(res=> {
            if(res.code===0) {
                let yList=res.result[0]["yList"];
                let xList=res.result[0]["xList"];
                const draw = new OnlineVisitorsModel(xList,yList);

                this.onlineVisitorsCharts.chartOption=draw.chartOption;
                this.visitorNum = res.result[0].total;
            }
        });
    }
}
