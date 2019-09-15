import {BusinessInfoModel} from './business-info.model';
import {BusinessMonitorModel} from './business-monitor.model';
import {HighChartsModel} from '../../../plugins/component/highcharts/model/highCharts.model';
import {ColumnChartsModel} from "../component/columncharts/model/columnCharts.model";

/**
 * 全网-监控器-概览 页面数据的实体
 * @class OverviewModel
 */
export class OverviewModel {
    /** 商户信息 */
    private _businessInfo: BusinessInfoModel = new BusinessInfoModel();
    /** 商户监控信息 */
    private _businessMonitorInfo: BusinessMonitorModel = new BusinessMonitorModel();
    /** 折线图 */
    private _businessMonitorChart: HighChartsModel = new HighChartsModel();
    /** TOP5网络柱状图 */
    private _flowChart: HighChartsModel = new HighChartsModel();


    private _columnFlowChart: ColumnChartsModel = new ColumnChartsModel();
    private _columnClientChart: ColumnChartsModel = new ColumnChartsModel();


    /** 在线客户端TOP5柱状图 */
    private _clientChart: HighChartsModel = new HighChartsModel();
    /** 当前客户端 */
    private _currentClient: number;
    /** 申购设备 */
    private _purchaseDevice: number;
    /** 在网设备 */
    private _inNetDevice: number;
    /** TOP10设备表格 */
    private _tableData: any;

    get businessInfo(): BusinessInfoModel {
        return this._businessInfo;
    }

    set businessInfo(value: BusinessInfoModel) {
        this._businessInfo = value;
    }


    get businessMonitorInfo(): BusinessMonitorModel {
        return this._businessMonitorInfo;
    }

    set businessMonitorInfo(value: BusinessMonitorModel) {
        this._businessMonitorInfo = value;
    }


    get businessMonitorChart(): HighChartsModel {
        return this._businessMonitorChart;
    }

    set businessMonitorChart(value: HighChartsModel) {
        this._businessMonitorChart = value;
    }


    get flowChart(): HighChartsModel {
        return this._flowChart;
    }

    set flowChart(value: HighChartsModel) {
        this._flowChart = value;
    }

    get columnFlowChart(): HighChartsModel {
        return this._columnFlowChart;
    }

    set columnFlowChart(value: HighChartsModel) {
        this._columnFlowChart = value;
    }

    get columnClientChart(): HighChartsModel {
        return this._columnClientChart;
    }

    set columnClientChart(value: HighChartsModel) {
        this._columnClientChart = value;
    }


    get clientChart(): HighChartsModel {
        return this._clientChart;
    }

    set clientChart(value: HighChartsModel) {
        this._clientChart = value;
    }


    get currentClient(): number {
        return this._currentClient;
    }

    set currentClient(value: number) {
        this._currentClient = value;
    }


    get purchaseDevice(): number {
        return this._purchaseDevice;
    }

    set purchaseDevice(value: number) {
        this._purchaseDevice = value;
    }


    get inNetDevice(): number {
        return this._inNetDevice;
    }

    set inNetDevice(value: number) {
        this._inNetDevice = value;
    }


    get tableData(): any {
        return this._tableData;
    }

    set tableData(value: any) {
        this._tableData = value;
    }
}
