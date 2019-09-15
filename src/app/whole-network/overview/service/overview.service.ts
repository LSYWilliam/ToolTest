import {Inject, Injectable, ViewChild} from "@angular/core";
import {HttpClientService} from "../../../shared/service/httpClient.service";
import {OverviewModel} from "../model/overview.model";
import {BusinessInfoModel} from "../model/business-info.model";
import {BusinessMonitorModel} from "../model/business-monitor.model";
import {BusinessMonitorChartModel} from "../model/business-monitor-chart.model";
import {RequestArgs} from "../../../shared/model/request-args";
import {Subscription} from "rxjs/Subscription";
import {BarChartModel} from "../model/bar-chart.model";
import {Route, Router} from "@angular/router";
import {ColumnChartModel} from "../model/column-chart.model";
import {DOCUMENT} from "@angular/common";
import {Observable} from "rxjs/Observable";

declare let BMap: any;

declare var require: any;
const Highcharts = require('highcharts/highstock');
Highcharts.setOptions(
    { global: { useUTC: false },});

// require('highcharts/modules/highcharts-zh_CN')(Highcharts);
/**
 * 全网-监控器-概览 服务类
 * @class OverviewService
 */

@Injectable()
export class OverviewService {
    /**按钮类型*/
    public flowBtnType: any;
    public clientBtnType: any;
    public chartOptionValue: any;
    /**告警Ap数据*/
    public warnApData: any;
    /** 页面呈现的实体 */
    public overviewModel: OverviewModel = new OverviewModel();


    /**是否显示地图上面的面板*/
    public isShowPanel: any;
    /**是设备告警还是网络信息 1 速率和TOP5信息  2 网络信息*/
    public panelType: any;
    /**判断是否显示了告警设备表格*/
    public warnDevice: any;
    public netMessages: any;
    /**创建的地图实例*/
    public map: any;
    /**地图上面的坐标点*/
    public mapPoint: any;
    /**关闭流*/
    public $businessMonitor: any;
    public $mapPoint: any;
    public $top5Flow: any;
    public $top5Client: any;
    /**
     * 构造函数
     * @param http HttpClientService
     *                  http请求方法
     * @param router  Router
     *                 路由方法
     */
    constructor(private http: HttpClientService, public router: Router) {
        this.flowBtnType = 'primary';
        this.isShowPanel = false;
        this.panelType = 1;
    }

    /**
     * 获取商家监控信息的方法
     * @param requestArgs RequestArgs
     *                      http请求参数
     */
    protected getBusinessMonitor(requestArgs: RequestArgs) {
        this.$businessMonitor = Observable.timer(0, 30000).subscribe(
            (i) => {
                requestArgs.url = "/api/v1/overview/business/monitor";
                this.http.httpGet(requestArgs)
                    .subscribe(
                        res => {
                            let data = {
                                dayUpTraffic: 0,
                                dayDownTraffic: 0,
                                dayTraffic: 0,
                                allClient: 0,
                            };
                            if (res.code === 0) {
                                this.overviewModel.businessMonitorInfo = <BusinessMonitorModel> res.result;
                            } else if (res.code === 9)  {
                                this.overviewModel.businessMonitorInfo = <BusinessMonitorModel> data;
                            } else {
                                this.overviewModel.businessMonitorInfo = <BusinessMonitorModel> data;
                            }
                        });
            });
    }

    /**
     * 获取商家监控折线图数据的方法
     * @param requestArgs RequestArgs
     *                      http请求参数
     */
    protected getBusinessMonitorChart(requestArgs: RequestArgs) {
        this.overviewModel.businessMonitorChart.chartType = 'StockChart';
        this.overviewModel.businessMonitorChart.className = 'height_200';

        requestArgs.url = "/api/v1/overview/business/diagram";
        this.http.httpGet(requestArgs)
            .subscribe(
                res => {
                    if (res.code === 0) {
                        let monitorChart = new BusinessMonitorChartModel(<BusinessMonitorChartModel> res.result);
                        this.overviewModel.businessMonitorChart.chartOption = monitorChart.getOptions;
                    } else if (res.code === 9) {
                        this.overviewModel.businessMonitorChart.chartOption = null;
                    } else {
                        this.overviewModel.businessMonitorChart.chartOption = null;
                    }
                });
    }

    /**TOP5网络转发流量*/
    protected getColumnFlowChart(requestArgs: RequestArgs) {
        this.$top5Flow = Observable.timer(0, 30000).subscribe(
            (i) => {
                requestArgs.url = '/api/v1/overview/top_net/flow';
                this.http.httpGet(requestArgs)
                    .subscribe(
                        res => {
                            if (res.code === 0) {
                                let title = '转发流量';
                                let data = {'value': res.result.value, 'drillDownValue': res.result.drillValue, 'title': title};
                                this.overviewModel.columnFlowChart.chartOption = data;
                                this.chartOptionValue = this.overviewModel.columnFlowChart;
                            }
                        });
            });
    }
    /**TOP5网络在线客户端*/
    protected getColumnClientChart(requestArgs) {
        this.$top5Client = Observable.timer(0, 30000).subscribe(
            (i) => {
                requestArgs.url = '/api/v1/overview/top_net/client';
                this.http.httpGet(requestArgs)
                    .subscribe(
                        res => {
                            if (res.code === 0) {
                                let title = '在线客户端';
                                let data = {'value': res.result.value, 'drillDownValue': res.result.drillValue, 'title': title};
                                this.overviewModel.columnClientChart.chartOption = data;
                                this.chartOptionValue = this.overviewModel.columnClientChart;
                            }
                        });
            });
    }
    /**获取地图上面的坐标点*/
    protected showPoint(requestArgs: RequestArgs) {
        this.$mapPoint = Observable.timer(0, 300000).subscribe(
            (i) => {
                requestArgs.url = '/api/v1/overview/map_net_list';
                this.http.httpPost(requestArgs)
                    .subscribe(
                        res => {
                            if (res.code === 0) {
                                this.loadMap(res.result);
                            }
                        });
            });
    }

    /**显示地图*/
    showMap(point) {
        this.map = new BMap.Map("allMap");
        this.map.centerAndZoom(new BMap.Point(point.lng, point.lat), 5);
        this.map.enableScrollWheelZoom();    // 启用滚轮放大缩小，默认禁用
        this.map.enableContinuousZoom();    // 启用地图惯性拖拽，默认禁用
        this.map.addControl(new BMap.OverviewMapControl()); // 添加默认缩略地图控件
    }

    /**加载地图上面的点*/
    loadMap(array) {
        this.showMap(array[0]);
        for (let i = 0; i < array.length; i++) {
            if (array[i].lng && array[i].lat) {
                let point = new BMap.Point(array[i].lng, array[i].lat);
                let content = "<p style='font-size:14px;color:red;font-weight:bold;'>企业名称:"+ array[i].businessName+"</p>" + "网络地址:" + array[i].address;
                this.addMarker(point,content,this);
            }
        }
    }
    /**显示地图上面的面板*/
    addMarker(point,content,that){
        let marker = new BMap.Marker(point);
        this.map.addOverlay(marker);
        let infoWindow = new BMap.InfoWindow("<div style='font-size:14px;'>" + content + "</div>");
        let _that = this;
        marker.addEventListener("click", function () {
            that.panelType = 2;
            that.mapPoint = point;
            _that.showBusiNetworkList(point.lng, point.lat);
        });
        marker.addEventListener("mouseover", function () {
            this.openInfoWindow(infoWindow);
        });
    }

    /**展示当前企业的网络列表 接口*/
    protected showBusiNetworkList(lng, lat) {
        let requestArgs: RequestArgs = new RequestArgs();
        requestArgs.systemName = 'wlanscope';
        requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
        requestArgs.url = '/api/v1/overview/map_net_overview';
        requestArgs.body = {
            'lng': lng,
            'lat': lat
        };
        this.http.httpPost(requestArgs)
            .subscribe(
                res => {
                    if (res.code === 0) {
                        this.netMessages = res.result;
                    }
                });
    }

    /**展示企业下告警设备列表*/
    protected getBusiWarnDeviceList(requestArgs: RequestArgs) {
        requestArgs.url = '/api/v1/overview/broadcast';
        this.http.httpGet(requestArgs)
            .subscribe(
                res => {
                    if (res.code === 0) {
                        this.warnApData = res.result;
                    }
                });
    }

    /**
     * 获取在线客户端数量的方法
     * @param requestArgs RequestArgs
     *                      http请求参数
     */
    protected getCurrentClient(requestArgs: RequestArgs) {
        requestArgs.url = '/api/v1/overview/business/currentClient';
        this.http.httpGet(requestArgs)
            .subscribe(
                res => {
                    if (res.code === 0) {
                        this.overviewModel.currentClient = res.result['currentClient'];
                    } else if  (res.code === 9) {
                        this.overviewModel.currentClient = 0;
                    } else {
                        this.overviewModel.currentClient = 0;
                    }
                });
    }
}
