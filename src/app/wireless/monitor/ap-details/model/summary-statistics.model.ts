import {InfoInterface, InfoModel} from "./summary-statistics/info.model";
import {HighChartsModel} from "../../../../plugins/component/highcharts/model/highCharts.model";
import {FlowInfoInterface, FlowInfoModel} from "./summary-statistics/flow-info.model";

export class SummaryStatisticsModel {

    /** AP详细信息 */
    private _info: InfoModel = new InfoModel();
    /** 实时统计折线图 */
    private _businessMonitorChart: HighChartsModel = new HighChartsModel();
    /** 实时统计流量详情 */
    private _flowInfo: FlowInfoModel = new FlowInfoModel();
    /** 运行状态图 */
    private _operatingStatusChart: HighChartsModel = new HighChartsModel();
    /** 流速监控折线图 */
    private _flowRateMonitorChart: HighChartsModel = new HighChartsModel();
    /** 在线客户端折线图 */
    private _onlineClientChart: HighChartsModel = new HighChartsModel();
    /** AP心跳图 */
    private _heartbeatChart: HighChartsModel = new HighChartsModel();
    /** CPU趋势图 */
    private _todayPerformanceChart: HighChartsModel = new HighChartsModel();

    public setInfo(data: InfoInterface) {
        this.info.upUsrNum = data.upUsrNum;
        this.info.dayTraffic = data.dayTraffic;
        this.info.dayDownTraffic = data.dayDownTraffic;
        this.info.dayUpTraffic = data.dayUpTraffic;
    }

    public setFlowInfo(data: FlowInfoInterface) {
        this.flowInfo.dayTraffic = data.dayTraffic;
        this.flowInfo.upDayTraffic = data.upDayTraffic;
        this.flowInfo.downDayTraffic = data.downDayTraffic;
    }

    get flowInfo(): FlowInfoModel {
        return this._flowInfo;
    }

    set flowInfo(value: FlowInfoModel) {
        this._flowInfo = value;
    }

    get info(): InfoModel {
        return this._info;
    }

    set info(value: InfoModel) {
        this._info = value;
    }


    get businessMonitorChart(): HighChartsModel {
        return this._businessMonitorChart;
    }

    set businessMonitorChart(value: HighChartsModel) {
        this._businessMonitorChart = value;
    }

    get operatingStatusChart(): HighChartsModel {
        return this._operatingStatusChart;
    }

    set operatingStatusChart(value: HighChartsModel) {
        this._operatingStatusChart = value;
    }

    get flowRateMonitorChart(): HighChartsModel {
        return this._flowRateMonitorChart;
    }

    set flowRateMonitorChart(value: HighChartsModel) {
        this._flowRateMonitorChart = value;
    }

    get onlineClientChart(): HighChartsModel {
        return this._onlineClientChart;
    }

    set onlineClientChart(value: HighChartsModel) {
        this._onlineClientChart = value;
    }

    get heartbeatChart(): HighChartsModel {
        return this._heartbeatChart;
    }

    set heartbeatChart(value: HighChartsModel) {
        this._heartbeatChart = value;
    }

    get todayPerformanceChart(): HighChartsModel {
        return this._todayPerformanceChart;
    }

    set todayPerformanceChart(value: HighChartsModel) {
        this._todayPerformanceChart = value;
    }

}
