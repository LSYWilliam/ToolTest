import {Component, ElementRef, Input, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {HttpClientService} from "../../../../../shared/service/httpClient.service";
import {RequestArgs} from "../../../../../shared/model/request-args";
import {SummaryStatisticsModel} from "../../model/summary-statistics.model";
import {InfoInterface} from "../../model/summary-statistics/info.model";
import {FlowMonitorModel} from "../../model/summary-statistics/flow-monitor.model";
import {HistoryDropDownModel} from "../../model/summary-statistics/history-drop-down.model";
import {OperatingStatusModel} from "../../model/summary-statistics/operating-status.model";
import {FlowRateMonitoringModel} from "../../model/summary-statistics/flow-rate-monitoring.model";
import {OnlineClientModel} from "../../model/summary-statistics/online-client.model";
import {FlowInfoInterface} from "../../model/summary-statistics/flow-info.model";
import {TooltipModel} from "../../model/tooltip.model";
import {DropDownsInterface} from "../../../../../shared/component/dropdown/model/dropdowns.model";
import * as moment from "moment";

/**
 * AP详情-摘要统计
 * @class SummaryStatisticsComponent
 */
@Component
({
    selector: 'app-ap-details-summary-statistics',
    templateUrl: './summary-statistics.component.html',
    styleUrls: ['./summary-statistics.component.scss']
})

export class SummaryStatisticsComponent implements OnInit {
    private _apID: string;
    private requestArgs: RequestArgs = new RequestArgs();
    public summaryModel: SummaryStatisticsModel = new SummaryStatisticsModel();
    public historyDropDown: HistoryDropDownModel = new HistoryDropDownModel();
    public userNumAbstract: any;
    public tooltipModel: TooltipModel = new TooltipModel();
    public tooltitleModel: TooltipModel = new TooltipModel();
    /** 历史数据ID */
    public timeParam: any;
    public _isSpinning: boolean;
    public changeTimes: string;

    /** 获取apID */
    @Input()
    set setApID(value: string) {
        this._apID = value;
    }

    @ViewChild('chart') private col: ElementRef;

    /**
     * 构造方法
     * @description
     *      获取ticket
     *      设置日期选择下拉框
     *      设置默认过去一天
     * */
    constructor(private http: HttpClientService) {
        this.requestArgs.systemName = 'wlanscope';
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};

        /** 历史数据下拉框 */
        let tmp: Array<DropDownsInterface> = [];
        tmp.push(<DropDownsInterface> {id:'-1', name:'过去一天'});
        tmp.push(<DropDownsInterface> {id:'-7', name:'过去一周'});
        this.historyDropDown.dropDowns = tmp;
        /** 历史数据默认 -1 */
        this.timeParam = -1;
        this.changeTimes = '过去一天';
    }

    /**
     * 方法初始化
     * @description
     *      1、标题提示词
     *      2、实时统计：客户端，流量
     *      3、实时统计折线图
     *      4、运动状态
     *      5、流速监控：转发流量数据
     *      6、流速监控折线图
     *      7、在线客户端数量
     *      8、在线客户端折线图
     * */
    ngOnInit() {
        this.getTooltip();
        this.getNowData();
        this.getBusinessMonitorChart();
        this.getOperatingStatusChart();
        this.getHisDataAbstract();
        this.getFlowRateMonitortChart();
        this.getUserNumAbstract();
        this.getOnlineClientChart();
    }

    /** 标题提示词 */
    getTooltip() {
        this._isSpinning = true;
        this.tooltipModel.dataMonitoring = '截至今日最近五分钟，上行速率、下行速率和总速率的走势情况。。';
        this.tooltipModel.operatingStatus = '在选择时间下，以分钟为粒度对历史运行状态的监控。';
        this.tooltipModel.flowRateMonitoring = '在选定时间范围内，上行速率、下行速率和总速率的走势情况。';
        this.tooltipModel.onlineClient = '在选择时间下，以五分钟为粒度对历史在线客户端的监控。';
        this.tooltitleModel.dataMonitoring='速率监控';
        this.tooltitleModel.operatingStatus = '运行状态';
        this.tooltitleModel.flowRateMonitoring = '流速监控';
        this.tooltitleModel.onlineClient = '在线客户端';
    }

    /** 获得流量监控：客户端，转发流量数据 */
    private getNowData() {
        this.requestArgs.url = '/api/v1/wireless/getNowData/' + this._apID;
        this.http.httpGet(this.requestArgs)
            .subscribe(
                res => {
                    if (res.code === 0) {
                        this.summaryModel.setInfo(<InfoInterface> res.result);
                    }
                }
            );
    }

    /** 获得流量监控Option */
    private getBusinessMonitorChart() {
        this.summaryModel.businessMonitorChart.chartType = 'StockChart';
        this.summaryModel.businessMonitorChart.className = 'height_200';
        this.requestArgs.url = '/api/v1/wireless/getTodayData/' + this._apID;
        this.http.httpGet(this.requestArgs)
            .subscribe(
                res => {
                    if (res.code === 0) {
                        let monitorChart = new FlowMonitorModel(<FlowMonitorModel> res.result);
                        this.summaryModel.businessMonitorChart.chartOption = monitorChart.getOptions;
                    } else if (res.code === 9) {
                        this.summaryModel.businessMonitorChart.chartOption = null;
                    } else {
                        this.summaryModel.businessMonitorChart.chartOption = null;
                    }
                });
    }

    /**
     * 获取运动状态Option
     * */
    private getOperatingStatusChart() {
        this.summaryModel.operatingStatusChart.chartType = 'StockChart';
        this.summaryModel.operatingStatusChart.className = 'height_200';

        this.requestArgs.url = "/api/v1/wireless/getHisStatus/" + this._apID +"/"+ this.timeParam;
        this.http.httpGet(this.requestArgs)
            .subscribe(
                res => {
                    if (res.code === 0) {
                        let operationChart = new OperatingStatusModel(<OperatingStatusModel> res.result);
                        this.summaryModel.operatingStatusChart.chartOption = operationChart.getOptions;
                    } else if (res.code === 9) {
                        this.summaryModel.operatingStatusChart.chartOption = null;
                    } else {
                        this.summaryModel.operatingStatusChart.chartOption = null;
                    }
                });
    }

    /** 获得流速监控：转发流量数据 */
    private getHisDataAbstract() {
        this.requestArgs.url = '/api/v1/wireless/getHisDataAbstract/' + this._apID +"/"+ this.timeParam;
        this.http.httpGet(this.requestArgs)
            .subscribe(
                res => {
                    if (res.code === 0) {
                        this.summaryModel.setFlowInfo(<FlowInfoInterface> res.result);
                    }
                }
            );
    }

    /**
     * 获取流速监控Option
     * */
    private getFlowRateMonitortChart() {
        this.summaryModel.flowRateMonitorChart.chartType = 'StockChart';
        this.summaryModel.flowRateMonitorChart.className = 'height_200';

        this.requestArgs.url = "/api/v1/wireless/getHisData/"+ this._apID +"/"+ this.timeParam;
        this.http.httpGet(this.requestArgs)
            .subscribe(
                res => {
                    if (res.code === 0) {
                        let flowRateChart = new FlowRateMonitoringModel(<FlowRateMonitoringModel> res.result);
                        this.summaryModel.flowRateMonitorChart.chartOption = flowRateChart.getOptions;
                    } else if (res.code === 9) {
                        this.summaryModel.flowRateMonitorChart.chartOption = null;
                    } else {
                        this.summaryModel.flowRateMonitorChart.chartOption = null;
                    }
                });
    }

    /** 获取过去一天或者一周的客户端 */
    private getUserNumAbstract() {
        this.requestArgs.url = '/api/v1/wireless/getUserNumAbstract/'+ this._apID +"/"+ this.timeParam;
        this.http.httpGet(this.requestArgs)
            .subscribe(
                res => {
                    if (res.code === 0) {
                        this.userNumAbstract = res.result.totalClientNum;
                    }
                }
            );
    }

    /** 获取在线客户端Option */
    private getOnlineClientChart() {
        this.summaryModel.onlineClientChart.chartType = 'StockChart';
        this.summaryModel.onlineClientChart.className = 'height_200';

        this.requestArgs.url = "/api/v1/wireless/getUserNum/"+ this._apID +"/"+ this.timeParam;
        this.http.httpGet(this.requestArgs)
            .subscribe(
                res => {
                    if (res.code === 0) {
                        let onlineClientChart = new OnlineClientModel(<OnlineClientModel> res.result);
                        this.summaryModel.onlineClientChart.chartOption = onlineClientChart.getOptions;
                    } else if (res.code === 9) {
                        this.summaryModel.onlineClientChart.chartOption = null;
                    } else {
                        this.summaryModel.onlineClientChart.chartOption = null;
                    }
                    this._isSpinning = false;
                });
    }

    /** 下拉条： 过去一天 或 过去一周 */
    getDropDown(id) {
        this.timeParam = id;
        switch (Number(id)) {
            case -7:
                this.changeTimes = '过去一周';
                break;
            case -1:
                this.changeTimes = '过去一天';
                break;
        }

        this.getOperatingStatusChart();

        this.getHisDataAbstract();
        this.getFlowRateMonitortChart();

        this.getUserNumAbstract();
        this.getOnlineClientChart();
    }

}
