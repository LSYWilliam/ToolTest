import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../../../animations/route-animations';
import {NetDetailsListModel} from '../model/net-details-list.model';
import {NetworkDetailsService} from '../service/network-details.service';
import {RequestArgs} from '../../../shared/model/request-args';
declare let EwifiGis: any;
declare let EwifiMapNoMapData: any;
declare let EwifiMap8FData: any;
declare let EwifiMap12FData: any;

/**
 * 网络详情
 * @class NetworkDetailsComponent
 */
@Component
({
    selector: 'app-network-details',
    templateUrl: './network-details.component.html',
    styleUrls: ['./network-details.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})

export class NetworkDetailsComponent extends NetworkDetailsService implements OnInit {

    /** 定义个windowHeight类型 */
    public windowHeight: number;
    /** 是否选中复选框 */
    public checked: boolean;
    /** 当前楼层 */
    public currentFloor: any;
    /** 是否显示热力图 */
    public statusHotMap: any;
    /** AP详情 */
    public apDetails: boolean;
    /** 表格头部 */
    public netDetailsListModel: NetDetailsListModel = new NetDetailsListModel();
    /** 请求头 */
    public requestArgs: RequestArgs = new RequestArgs();
    /** div的宽度 */
    public clientWidth: number;
    /** div的高度 */
    public clientHeight: number;


    /** 提示词 */
    private getNetDetailsList() {
        this.netDetailsListModel.netDetailsList = '网络详情：点击AP点，显示AP详情；点击热力，显示热力详情（注：点击查看AP详情，必须关闭热力图！）。';
    }

    /** 下拉菜单事件 */
    getDropDown(id) {
        this.apDetails = false;
        this.checked = false;
        this.currentFloor = id;
        super.getApMapData(this.requestArgs, this.netId, this.currentFloor);
    }

    /** 点击AP，显示AP详情 */
    apDetailsShow(event) {
        // 获取到APID
        let apId = event.target.id;
        super.getApCoordinate(this.requestArgs, this.netId, this.currentFloor).subscribe(res => {
            if (res !== undefined) {
                for (let item of res) {
                    if (Number(apId) === Number(item.apId)) {
                        this.apDetails = true;
                        super.getApDetail(this.requestArgs, apId);
                    }
                }
            }
        });
    }

    /** 关闭详情框 */
    closeDetails() {
        this.apDetails = false;
    }

    /**
     * 页面初始化方法
     * @description
     *          调用并获取动态数据
     */
    ngOnInit() {
        this.windowHeight = window.innerHeight-330;
        /** AP详情默认隐藏 */
        this.apDetails = false;
        /** 复选框默认不选中 */
        // 复选框默认不选中
        this.checked = false;
        // this.checked = true;
        /** 当前地图 */
        // 默认楼层8楼
        // this.currentFloor = this.floorMenu.dropDowns[0].id;
        this.currentFloor = '8F';
        /** 地图默认宽度 */
        this.clientWidth = EwifiMap8FData.width;
        /** 地图默认高度 */
        this.clientHeight = (document.body.clientHeight) - 160;
        /** 地图热力默认显示（后期要删掉） */
        this.statusHotMap = 'false';
        /** 获取http头部参数 */
        this.requestArgs.systemName = 'wlanscope';
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};

        this.getData(this.requestArgs, this.netId, this.currentFloor);
    }

    /**
     * 获取页面数据方法
     * @description
     *      1、创建统一请求参数
     *      2、设置统一请求参数的系统名称与ticket
     *      3、获得网络详情
     *      4、获得AP坐标
     *      5、获得AP列表
     */
    getData(requestArgs: RequestArgs, netId: string, floor: string) {
        this.getNetDetailsList();
        super.getApMapData(requestArgs, netId, floor);
        super.getNetDetailFlow(requestArgs, netId);
        super.getNetDetailApList(requestArgs, netId);
    }

    /** 复选框事件
     * @description
     *      选中复选框，显示热力图
     *      不选复选框，隐藏热力图
     * */
    checkHotMap(value) {
        this.apDetails = false;
        if (value === true) {
            this.statusHotMap = 'true';
            super.getHotPoint(this.requestArgs, this.netId, this.currentFloor).subscribe(res => {
                if (res.code === 0) {
                    let apPoints: any[] = [];
                    for (let i = 0; i < res.result.length; i++) {
                        apPoints.push({
                            'id': res.result[i].apId,
                            'lng': res.result[i].apGisX,
                            'lat': res.result[i].apGisY,
                            'style': {
                                "pointPath" : "#apoints"
                            }
                        });
                    }
                    super.getHotMapService(this.requestArgs, this.netId, this.currentFloor).subscribe(option => {
                        this.getHotMap(this.currentFloor, apPoints, this.statusHotMap, option.heatMapData, option.max);
                    });
                } else {
                    let apPoints: any[] = [];
                    apPoints.push({
                        'id': 1002,
                        'lng': "252",
                        'lat': "202",
                        'style': {
                            "pointPath" : "#apoints"
                        }
                    });
                    super.getHotMapService(this.requestArgs, this.netId, this.currentFloor).subscribe(option => {
                        const heatMapData = [
                            {"x":"254","y":"185","value":5},
                            {"x":"192","y":"342","value":7},
                            {"x":"172","y":"392","value":7},
                            {"x":"112","y":"242","value":7},
                            {"x":"162","y":"222","value":7}
                        ];
                        const max = '200';
                        // this.getHotMap(this.currentFloor, apPoints, this.statusHotMap, option.heatMapData, option.max);
                        this.getHotMap(this.currentFloor, apPoints, 'true', heatMapData, max);
                    });
                }
            });
        } else {
            this.statusHotMap = 'false';
            super.getApMapData(this.requestArgs, this.netId, this.currentFloor);
        }
    }

    /**
     * 热力图
     * @description
     *      热力图方法
     * */
    getHotMap(floor, point, status, hotData, hotMax) {
        document.getElementById('hotmap').innerHTML = '';
        const option = {
            'MAP' : {
                'mapName': 'EwifiMap' + floor,
                'mapType': 'Custom',
                'isDrag': 'true',
                'isZoom': 'false',
                'isCentered': 'false'
            },
            'point': point,
            'heatMap' : {
                'isHeatMap': status,
                'heatMapData': hotData,
                'legend': {
                    'show': 'true',
                    'left': 50,
                    'top': 100,
                },
                'isHeatMapPanel': 'false',
                'heatMpaPanelType' : 'Histogram',
                'heatBoxLeft': '190',
                'heatBoxTop': '50',
                'heatShowHide': 'false',
                'heatRadius': 230,
                'heatMinMax': ['0', hotMax],  // 最大值最小值
            },
        };
        const ewifiGis = new EwifiGis();
        ewifiGis.init('hotmap');
        ewifiGis.setOption(option);
        ewifiGis.execute();
    }

}
