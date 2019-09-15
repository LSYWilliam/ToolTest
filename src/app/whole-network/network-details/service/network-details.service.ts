import { Injectable } from '@angular/core';
import { HttpClientService } from '../../../shared/service/httpClient.service';
import { RequestArgs } from '../../../shared/model/request-args';
import { NetworkDetailsModel } from '../model/network-details.model';
import { ActivatedRoute } from '@angular/router';
import { NetDetailsDataModel } from '../model/net-details-data.model';
import { Router } from '@angular/router';
import { FloorDropDownModel } from '../model/floor-drop-down.model';
import { Location } from '@angular/common';
import { NetApDetailsModel } from "../model/net-ap-details.model";
import { FloorListResolverModel } from "../../../shared/model/floor-list-resolver.model";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
declare let EwifiGis: any;

@Injectable()
export class NetworkDetailsService {

    public networkDetailsModel: NetworkDetailsModel = new NetworkDetailsModel();
    public floorMenu: FloorDropDownModel = new FloorDropDownModel();
    public netId: string;
    public netName: string;
    public url: string;

    /**
     * 构造函数
     * @param http HttpClientService
     *                  http请求方法
     * @param route ActivatedRoute
     *                  路由方法
     * @param location Location
     *                  路由方法
     * @description
     *                  获得下拉条数据
     *                  获得URL参数： id 网络名称 url
     */
    constructor(private http: HttpClientService,
                private route: ActivatedRoute,
                private activatedRoute: ActivatedRoute,
                private activeRouteId: ActivatedRoute,
                private router: Router,
                private location: Location) {

        this.getNetDetailsFloor(this.activatedRoute);

        this.activeRouteId.paramMap.subscribe(
            res => {
                this.netId = res.get('id');
                this.netName = res.get('name');
                this.url = res.get('url');
            }
        );
    }

    /**
     * 获取楼层数据的方法
     * @param activatedRoute ActivatedRoute
     *                      路由方法
     */
    protected getNetDetailsFloor(activatedRoute: ActivatedRoute) {
        let data = new FloorListResolverModel(activatedRoute).floor;
        if (data === undefined) {
            // this.floorMenu.dropDowns = [{id: 'NoMap', name: '暂无地图'}];
            this.floorMenu.dropDowns = [{id: '8F', name: '8楼'}];
        } else {
            this.floorMenu.dropDowns = new FloorListResolverModel(activatedRoute).floor;
        }
    }

    /**
     * 获取网络详情-AP坐标点的方法
     * @param requestArgs RequestArgs
     *        netId  string
     *        floor  string
     *                      路由方法
     */
    protected getApCoordinate (requestArgs: RequestArgs, netId: string, floor: string) {
        requestArgs.url = '/api/v1/overview/net/apMap/' + netId + '/' + floor;
        return this.http.httpGet(requestArgs)
            .map(
                res => {
                    if (res.code === 0) {
                        return res.result;
                    }
                });
    }

    /**
     * 获取网络详情-AP坐标点并显示地图的方法
     * @param requestArgs RequestArgs
     *        netId  string
     *        floor  string
     *                      路由方法
     */
    protected getHotPoint(requestArgs: RequestArgs, netId: string, floor: string) {
        requestArgs.url = '/api/v1/overview/net/apMap/' + netId + '/' + floor;
        return this.http.httpGet(requestArgs).map(res => res);
    }
    protected getApMapData(requestArgs: RequestArgs, netId: string, floor: string) {
        requestArgs.url = '/api/v1/overview/net/apMap/' + netId + '/' + floor;
        return this.http.httpGet(requestArgs)
            .subscribe(
                res => {
                    let point: any[] = [];
                    point.push({
                        'id': 1002,
                        'lng': "252",
                        'lat': "202",
                        'style': {
                            "pointPath" : "#apoints"
                        }
                    });
                    // console.log(res.code);
                    if (res.code === 0) {
                        let apPoints: any[] = [];
                        // for (let i = 0; i < res.result.length; i++) {
                        //     apPoints.push({
                        //         'id': res.result[i].apId,
                        //         'lng': res.result[i].apGisX,
                        //         'lat': res.result[i].apGisY,
                        //         'style': {
                        //             "pointPath" : "#apoints"
                        //         }
                        //     });
                        // }
                        apPoints.push({
                            'id': 1002,
                            'lng': "252",
                            'lat': "202",
                            'style': {
                                "pointPath" : "#apoints"
                            }
                        });
                        // console.log(apPoints);
                        this.getApMap(floor, apPoints);
                    } else if (res.code === 9) {
                        this.getApMap(floor, point);
                    } else {
                        this.getApMap(floor, point);
                    }

                });
    }

    /**
     * AP展示在地图上
     * @param floor      楼层
     *        pointData  AP点坐标
     */
    protected getApMap(floor: string, pointData: any) {
        document.getElementById('hotmap').innerHTML = '';
        // if (floor === 'NoMap') {
            // document.getElementById('hotmap').innerHTML = '暂无地图';
            // document.getElementById('hotmap').style.width = '50px';
            // document.getElementById('hotmap').style.margin = '50px auto';
        // } else {
            const option = {
                'MAP' : {
                    'mapName': 'EwifiMap' + floor,
                    'mapType': 'Custom',
                    'isDrag': 'true',
                    'isZoom': 'false',
                    'isCentered': 'false'
                },
                'point': pointData
            };
            // console.log(floor);
            const ewifiGis = new EwifiGis();
            ewifiGis.init('hotmap');
            ewifiGis.setOption(option);
            ewifiGis.execute();
        // }
    }

    /**
     * 获取AP详情数据的方法
     * @param requestArgs RequestArgs
     *                      路由方法
     */
    protected getApDetail(requestArgs: RequestArgs, apId: string) {
        requestArgs.url = '/api/v1/overview/net/getApDetail/' + apId;
        this.http.httpGet(requestArgs)
            .subscribe(
                res => {
                    let data = {
                        apId: null,
                        apName: "暂无AP",
                        apStatus: null,
                        apIp: "暂无AP",
                        apModel: "暂无型号",
                        apMac: "暂无MAC",
                        publicIp: "暂无公共Ip",
                        currentClient: 0,
                        dayTraffic: 0
                    };
                    if (res.code === 0) {
                        this.networkDetailsModel.netApDetailsModel = <NetApDetailsModel> res.result;
                    } else if (res.code === 9) {
                        this.networkDetailsModel.netApDetailsModel = <NetApDetailsModel> data;
                    } else {
                        this.networkDetailsModel.netApDetailsModel = <NetApDetailsModel> data;
                    }
                });
    }

    /**
     * 获取AP热力数据的方法
     * @param requestArgs RequestArgs
     *                      路由方法
     */
    protected getHotMapService(requestArgs: RequestArgs, netId: string, floor: string) {
        requestArgs.url = '/api/v1/overview/net/apHeatMap/' + netId +'/'+ floor;
        return this.http.httpGet(requestArgs)
            .map(
                res => {
                    if (res.code === 0) {
                        return res.result;
                    }
                });
    }

    /**
     * 获取网络概览数据的方法
     * @param requestArgs RequestArgs
     *        netId       string
     *                      路由方法
     */
    protected getNetDetailFlow(requestArgs: RequestArgs, netId: string) {
        requestArgs.url = '/api/v1/overview/net/getNetDetail/' + netId;
        this.http.httpGet(requestArgs)
            .subscribe(
                res => {
                    let data = {
                        "netId": null,
                        "netName": "暂无网络",
                        "deviceNum": 0,
                        "currentClient": 0,
                        "dayTraffic": 0,
                        "upFlowVelocity": 0,
                        "downFlowVelocity": 0,
                        "currentFlowVelocity": 0,
                    };
                    if (res.code === 0) {
                        this.networkDetailsModel.netDetailsFlowData = <NetDetailsDataModel> res.result;
                    } else if (res.code === 9) {
                        this.networkDetailsModel.netDetailsFlowData = <NetDetailsDataModel> data;
                    } else {
                        this.networkDetailsModel.netDetailsFlowData = <NetDetailsDataModel> data;
                    }
                });
    }

    /**
     * 获取表格数据的方法
     * @param requestArgs RequestArgs
     *        netId       string
     *                      路由方法
     */
    protected getNetDetailApList(requestArgs: RequestArgs, netId: string) {
        requestArgs.url = '/api/v1/overview/net/getApList/' + netId;
        return this.http.httpGet(requestArgs)
            .subscribe(
                res => {
                    if (res.code === 0) {
                        this.networkDetailsModel.tableData = res.result;
                    } else if (res.code === 9) {
                        this.networkDetailsModel.tableData = [];
                    } else {
                        this.networkDetailsModel.tableData = [];
                    }
                });
    }


}
