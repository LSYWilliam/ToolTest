import {Component, Input, OnInit} from '@angular/core';
import {routerTransition} from "../../../../../animations/route-animations";
import {RequestArgs} from "../../../../../shared/model/request-args";
import {HttpClientService} from "../../../../../shared/service/httpClient.service";
import {SummaryStatisticsModel} from "../../model/summary-statistics.model";
import {HeartbeatModel} from "../../model/alerm/heartbeat.model";
import {AbnormalModel} from "../../model/alerm/abnormal.model";
import {SecurityAlarmModel} from "../../model/alerm/security-alarm.model";
import {UseTrendModel} from "../../model/alerm/use-trend.model";
import {TooltipModel} from "../../model/tooltip.model";
import {PerformanceModel} from "../../model/alerm/performance.model";
import * as moment from "moment";

/**
 * 警报信息
 * @class AlarmInformationComponent
 */
@Component
({
    selector: 'app-ap-details-alarm-information',
    templateUrl: './alarm-information.component.html',
    styleUrls: ['./alarm-information.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})

export class AlarmInformationComponent implements OnInit  {
    public radioValue: string;
    private _apID: string;
    private _apSn: string;
    private requestArgs: RequestArgs = new RequestArgs();
    public summaryModel: SummaryStatisticsModel = new SummaryStatisticsModel();
    public abnormalModel: AbnormalModel = new AbnormalModel();
    public securityAlarmModel: SecurityAlarmModel = new SecurityAlarmModel();
    public abnormal: any;
    public securityAlarm: any;
    public tooltitleModel: TooltipModel = new TooltipModel();
    public tooltipModel: TooltipModel = new TooltipModel();
    public timeParam: number;
    public performanceModel: PerformanceModel = new PerformanceModel();
    public _isSpinning: boolean;

    /** 获取apID */
    @Input() set setApID(value: string) {
        this._apID = value;
    }
    /** 获取ap 序列号 */
    @Input() set setApSn(value: string) {
        this._apSn = value;
    }
    /**
     * 构造方法
     * @description
     *      1、获取ticket
     *      2、设置参数默认为今天
     * */
    constructor (private http: HttpClientService) {
        this.requestArgs.systemName = 'wlanscope';
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
        this.timeParam = 0;
    }
    /**
     * 方法初始化
     * @description
     *      1、标题提示词
     *      2、获取AP心跳图
     *      3、获取AP性能指标参数
     *      4、CPU使用率趋势折线图
     *      5、AP使用异常表格
     *      6、AP安全告警表格
     * */
    ngOnInit() {
        this._isSpinning = true;
        this.getTooltip();
        this.getHeartbeatChart();
        this.getApPerformance();
        this.getTodayPerformance();
        this.getAbnormal();
        this.getSecurityAlarm();
    }

    /** 标题提示词 */
    getTooltip() {
        this.tooltitleModel.apHeartbeat = 'AP心跳';
        this.tooltitleModel.apPerformance = 'AP性能指标';
        this.tooltitleModel.apUseException = 'AP告警信息';
        this.tooltitleModel.apSecurityAlarm = 'AP安全告警';
        this.tooltipModel.apHeartbeat = '对当天每分钟AP心跳是否上报进行实时监控。';
        this.tooltipModel.apPerformance = '对当天AP性能指标进行实时监控。';
        this.tooltipModel.apUseException = '当天AP使用异常列表。';
        this.tooltipModel.apSecurityAlarm = '当天AP安全告警列表。';
    }

    /** 获取AP心跳 */
    getHeartbeatChart() {
        this.summaryModel.heartbeatChart.chartType = 'StockChart';
        this.summaryModel.heartbeatChart.className = 'height_200';

        this.requestArgs.url = "/api/v1/wireless/getHisHeart/" + this._apID +"/"+ this.timeParam;
        this.http.httpGet(this.requestArgs)
            .subscribe(
                res => {
                    if (res.code === 0) {
                        let heartbeatModel = new HeartbeatModel(<HeartbeatModel> res.result);
                        this.summaryModel.heartbeatChart.chartOption = heartbeatModel.getOptions;
                        this._isSpinning = false;
                    } else if (res.code === 9) {
                        this.summaryModel.heartbeatChart.chartOption = null;
                    } else {
                        this.summaryModel.heartbeatChart.chartOption = null;
                    }
                });
    }

    /** 获取AP性能指标 */
    getApPerformance() {
        this.requestArgs.url = "/api/v1/wireless/getNowPerformance/"+ this._apSn;
        this.http.httpGet(this.requestArgs)
            .subscribe(
                res => {
                    let data = {
                        id: null,
                        cpu: 0,
                        memory: 0,
                        disk: 0,
                        logTime: 0,
                        apsn: null,
                        type: null,
                        apmac: null,
                        apip: null,
                        createTime: 0
                    };
                    if (res.code === 0) {
                        this.performanceModel = <PerformanceModel> res.result;
                    } else if (res.code === 9) {
                        this.performanceModel = <PerformanceModel> data;
                    } else {
                        this.performanceModel = <PerformanceModel> data;
                    }
                });
    }

    /** 获取CPU使用率趋势 */
    getTodayPerformance() {
        this.summaryModel.todayPerformanceChart.chartType = 'HighChart';
        this.summaryModel.todayPerformanceChart.className = 'height_200';
        this.requestArgs.url = "/api/v1/wireless/getTodayPerformance/" + this._apSn;
        this.http.httpGet(this.requestArgs)
            .subscribe(
                res => {
                    if (res.code === 0) {
                        let data: any[] = [];
                        for (let i = 0; i < res.result.x.length; i++) {
                            data.push([res.result.x[i], res.result.data[i]]);
                        }
                        let useTrendModel = new UseTrendModel(<any[]> data);
                        this.summaryModel.todayPerformanceChart.chartOption = useTrendModel.getOptions;
                    } else if (res.code === 9) {
                        this.summaryModel.todayPerformanceChart.chartOption = null;
                    } else {
                        this.summaryModel.todayPerformanceChart.chartOption = null;
                    }
                });
    }

    /** 获取AP使用异常 */
    private getAbnormal() {
        this.requestArgs.url = "/api/v1/wireless/getApBehaveLog/" + this._apSn + "/" + this.timeParam;
        this.http.httpGet(this.requestArgs)
            .subscribe(
                res => {
                    if (res.code === 0) {
                        this.abnormal = res.result;
                    } else if (res.code === 9) {
                        this.abnormal = [];
                    } else {
                        this.abnormal = [];
                    }
                });
    }

    /** 获取AP安全告警 */
    private getSecurityAlarm() {
        // let requestArgs: RequestArgs = new RequestArgs();
        // requestArgs.systemName = 'test';
        // requestArgs.url = "assets/data/api/v1/wireless/ap-details/abnormal.json";
        // this.securityAlarm = [];
        // // this.http.httpGet(requestArgs)
        // //     .subscribe(
        // //         res => {
        // //             if (res.code === 0) {
        // //                 this.securityAlarm = res.result;
        // //             } else if (res.code === 9) {
        // //                 this.securityAlarm = [];
        // //             } else {
        // //                 this.securityAlarm = [];
        // //             }
        // //             this._isSpinning = false;
        // //         });
    }
}
