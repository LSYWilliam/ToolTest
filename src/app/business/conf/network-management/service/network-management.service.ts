import {Injectable, ViewChild, ViewChildren} from '@angular/core';
import {HttpClientService} from "../../../../shared/service/httpClient.service";
import {NetworkManagementModel, SsidInfo} from "../model/network-management.model";
import {StaticDataModel} from "../model/static-data.model";
import {RequestArgs, RequestArgsInterface} from "../../../../shared/model/request-args";
import {AllRadioFreqInterface} from "../../../../shared/interface/all-radio-freq.interface";
import {AllRadioFreqModel} from "../../../../shared/model/all-radio-freq.model";
import {RadioFrequencyModel} from "../model/radio-frequency.model";
import {ProbeConfInterface} from "../../../../shared/component/probe-conf/model/probe-conf-out.model";
import {DropDownsInterface} from "../../../../shared/component/dropdown/model/dropdowns.model";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {NetworkStaticDataModel} from "../model/network-static-data.model";
import {forkJoin} from "rxjs/observable/forkJoin";
import {SsidConfInterface} from "../../../../wireless/conf/ssid-conf/model/ssid-conf.model";
import {FoldComponent} from "../../../../shared/component/fold/fold.component";
import {SsidItemComponent} from "../../../../shared/component/ssid-item/ssid-item.component";

@Injectable()
export class NetworkManagementService {
    @ViewChild("network") network: FoldComponent;
    @ViewChildren(SsidItemComponent) viewChildren: Array<SsidItemComponent>;

    /** 网络列表 */
    public networkList: Array<DropDownsInterface>;
    public networkListInfo: any;
    /**选中的netID*/
    public selectNetID: string;
    /** 是否显示加载中 */
    public contentStatus: boolean;
    /** http请求参数 */
    public requestArgs: RequestArgs = new RequestArgs();
    /** 页面的静态数据 */
    public staticData:  NetworkStaticDataModel = new NetworkStaticDataModel();
    /** 表格头部 */
    public staticTableDataModel: StaticDataModel = new StaticDataModel();
    /** 页面保存的实体类 */
    public networkManagerModel: NetworkManagementModel = new NetworkManagementModel();
    /** 探针配置 */
    public probeConf: any;
    /** 无线电配置 */
    public radio: AllRadioFreqModel = new AllRadioFreqModel();
    /** 左侧表格 */
    public leftTable: any;
    /** 右侧表格 */
    public rightTable: any;
    /** 下左侧表格 */
    public downLeftTable: any;
    /** 下右侧表格 */
    public downRightTable: any;
    /** ssid详情 */
    public ssidDetailsModel: Array<SsidInfo> = [];
    /** 2.4GHz配置，5GHz配置 */
    public radioFrequencyModel: RadioFrequencyModel = new RadioFrequencyModel();
    /** 是否有AP设备 */
    public hasAPDevice: boolean;
    /** 是否有交换机设备 */
    public hasSwitchDevice: boolean;

    public valiValueFlag = false;

    /**
     * 构造方法
     * @description
     *      1、初始化加载中按钮为false
     *      2、http请求参数配置
     *      3、获取左侧网络列表
     * */
    constructor(protected http: HttpClientService, public message: NzMessageService,public modalService: NzModalService) {
        this.contentStatus = false;
        this.requestArgs.systemName = "wlanscope";
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
        this.getNetworkList();
    }

    /**
     * 获取网络列表
     * @description
     *      1、配置url
     *      2、订阅获取数据
     *      3、判断code
     *      4、解析获取的变量，重新赋值
     * */
    protected getNetworkList() {
        this.requestArgs.url = '/api/v1/net_info';
        this.requestArgs.systemName = "wlanscope";
        this.http.httpGet(this.requestArgs).subscribe(
            res => {
                switch (res.code) {
                    case 0:
                        let tmp = [];
                        for (let obj of res.result) {
                            tmp.push(<DropDownsInterface> {id: obj['netId'], name: obj['netName']});
                        }
                        this.networkList = tmp;
                        this.networkListInfo = res.result;
                        this.networkManagerModel.setNetInfo(res.result[0]['netId'],res.result[0]['netName'],
                            res.result[0]['netType'],res.result[0]['province'],res.result[0]['city'],
                            res.result[0]['county'],res.result[0]['detailAddress']);
                        this.staticData.setDefaultData(res.result[0]['netType']);

                        this.network.inDefault=res.result[0]['netName']+"配置";
                        switch (this.networkManagerModel.netInfo.netType) {
                            case 0:
                                this.hasAPDevice = true;
                                this.hasSwitchDevice = false;
                                break;
                            case 1:
                                this.hasAPDevice = false;
                                this.hasSwitchDevice = true;
                                break;
                            case 2:
                                this.hasAPDevice = true;
                                this.hasSwitchDevice = true;
                                break;
                        }

                        break;
                    case 9:
                        this.networkListInfo =[];
                        break;
                }
            }
        );
    }

    public updateNetworkListInfo() {
        this.requestArgs.url = '/api/v1/net_info';
        this.requestArgs.systemName = "wlanscope";
        this.http.httpGet(this.requestArgs).subscribe(
            res => {
                switch (res.code) {
                    case 0:
                        this.networkListInfo = res.result;
                        break;
                    case 9:
                        this.networkListInfo =[];
                        break;
                }
            }
        );
    }

    /**
     * 获取网络类型
     * @description
     *      1、判断ID，获取相应的网络
     * */
    protected getNetInfo(id: string) {
        for (let obj of this.networkListInfo) {
            if (obj['netId'] === parseInt(id,0)) {
                this.networkManagerModel.setNetInfo(id, obj['netName'], obj['netType'],obj['province'],obj['city'],obj['county'],obj['detailAddress']);
                this.staticData.setDefaultData(obj['netType']);
                switch (this.networkManagerModel.netInfo.netType) {
                    case 0:
                        this.hasAPDevice = true;
                        this.hasSwitchDevice = false;
                        break;
                    case 1:
                        this.hasAPDevice = false;
                        this.hasSwitchDevice = true;
                        break;
                    case 2:
                        this.hasAPDevice = true;
                        this.hasSwitchDevice = true;
                        break;
                }
                this.network.inDefault=obj['netName']+"配置";
            }
        }
    }

    /**
     * 获取网络ID
     * @param id
     * @description
     *      1、将获得ID赋值
     *      2、获取相应的网络
     *      3、获取网络设备
     *      4、SSID配置
     *      5、无线电配置
     *      6、探针配置
     * */
    public getNetID(id: string) {
        this.selectNetID = id;
        this.valiValueFlag = false;
        this.getNetInfo(this.selectNetID);
        this.getNetDevice();
        this.getSsidMessage(this.selectNetID);
        // this.getGlobalValue(this.selectNetID);
        // this.getGlobalProbeConfValue(this.selectNetID);
    }

    /**
     * 网络设备
     * @description
     *      1、配置http请求头部
     *      2、http合并请求
     *      3、通过返回的数据判断code，展示数据
     * */
    protected getNetDevice() {
        let systemName = "wlanscope";
        let header = {'ticket': sessionStorage.getItem('ticket')};
        let url = '/api/v1/net_info/' +  this.selectNetID + '/ap';
        let useDevice: RequestArgs = new RequestArgs(
            <RequestArgsInterface> {systemName: systemName, header: header, url: url, body: {'choose': true}});
        let unUseDevice: RequestArgs = new RequestArgs(
            <RequestArgsInterface> {systemName: systemName, header: header, url: url, body: {'choose': false}});
        let switchUrl = `/api/v1/switch_info/choose/${this.selectNetID}`;
        let useSwitchDevice: RequestArgs = new RequestArgs(
            <RequestArgsInterface> {systemName: systemName, header: header, url: switchUrl, body: {'choose': true}});
        let unUseSwitchDevice: RequestArgs = new RequestArgs(
            <RequestArgsInterface> {systemName: systemName, header: header, url: switchUrl, body: {'choose': false}});
        forkJoin(
            this.http.httpGet(useDevice),
            this.http.httpGet(unUseDevice),
            this.http.httpGet(useSwitchDevice),
            this.http.httpGet(unUseSwitchDevice)
        ).subscribe(
            ([useRes,unUseRes,useSwitchRes,unUseSwitchRes]) => {
                switch (unUseRes.code) {
                    case 0:
                        this.leftTable = unUseRes.result;
                        break;
                    case 9:
                        this.leftTable = [];
                        break;
                    default:
                        this.leftTable = [];
                }

                switch (useRes.code) {
                    case 0:
                        this.rightTable = useRes.result;
                        break;
                    case 9:
                        this.rightTable = [];
                        break;
                    default:
                        this.rightTable = [];
                }

                switch (unUseSwitchRes.code) {
                    case 0:
                        this.downLeftTable = unUseSwitchRes.result;
                        break;
                    case 9:
                        this.downLeftTable = [];
                        break;
                    default:
                        this.downLeftTable = [];
                }

                switch (useSwitchRes.code) {
                    case 0:
                        this.downRightTable = useSwitchRes.result;
                        break;
                    case 9:
                        this.downRightTable = [];
                        break;
                    default:
                        this.downRightTable = [];
                }
            }
        );
    }

    /**
     * 探针配置
     * @description
     *      1、请求接口，获取数据
     *      2、判断code
     *      3、0：获取的数据赋值
     *      4、9：设置无数据默认值
     * */
    // protected getGlobalProbeConfValue(netID: string) {
    //     this.requestArgs.systemName = "wlanscope";
    //     this.requestArgs.url = "/api/v1/net_probe_config/" + netID;
    //     this.http.httpGet(this.requestArgs).subscribe(
    //         res => {
    //             switch (res.code) {
    //                 case 0:
    //                     this.probeConf = <ProbeConfInterface> res.result;
    //                     this.networkManagerModel.probe = this.probeConf;
    //                     break;
    //                 case 9:
    //                     this.probeConf = {
    //                         netId: Number.parseInt(this.selectNetID),
    //                         probeInterval:1,
    //                         probeMessageType: '0',
    //                         probeMessageTypeName: 'SYSLOG',
    //                         probeStatus : 0,
    //                         probeServerIp: '0.0.0.0',
    //                         probeServerPort: 0,
    //                         probeStatusName: '关闭'};
    //                     this.networkManagerModel.probe = this.probeConf;
    //                     break;
    //             }
    //         }
    //     );
    // }

    /**
     * 无线电配置
     * @param netID
     * @description
     *      1、请求接口，获取无线电数据
     * */
    // protected getGlobalValue(netID: string) {
    //     this.requestArgs.systemName = "wlanscope";
    //     this.requestArgs.url = "/api/v1/rf/getNetRfConfig/" + netID;
    //     this.http.httpGet(this.requestArgs)
    //         .subscribe(
    //             res => {
    //                 if (res.code === 0) {
    //                     let data = new AllRadioFreqModel();
    //                     data.setAllData(<AllRadioFreqInterface> res.result);
    //                     this.radioFrequencyModel.globalConf = data;
    //                     this.networkManagerModel.radio = this.radioFrequencyModel.globalConf;
    //                 }
    //             });
    // }


    /**
     * 获取SSID信息
     * @param netID
     * @description
     *      1、请求接口，获取数据
     *      2、解析result
     *      3、赋值ssidInfo
     * */
    protected getSsidMessage(netID: string) {
        this.requestArgs.systemName = "wlanscope";
        this.requestArgs.url = "/api/v1/wireless/" + netID +"/ssid_info/detail";
        this.http.httpGet(this.requestArgs)
            .subscribe(
                res => {
                    if (res.code === 0) {
                        this.ssidDetailsModel.splice(0, this.ssidDetailsModel.length);
                        for (let obj of res.result) {
                            let ssidInfoModel = new SsidInfo();
                            ssidInfoModel.ssidStatus = obj.ssidStatus !== 0;
                            ssidInfoModel.ssidInfo = <SsidConfInterface> obj;
                            this.ssidDetailsModel.push(ssidInfoModel);
                        }
                        this.networkManagerModel.ssidInfo = this.ssidDetailsModel;
                    }
                });
    }

    markAsDirtys() {
        this.viewChildren.forEach(res=> {
            res.markAsDirtyFlag();
        });
    }
    /**获取商家地址信息 接口*/
    // protected getBusinessAddressInfo() {
    //     this.requestArgs.systemName = "wlanscope";
    //     this.requestArgs.url = "/api/v1/businesses/detail";
    //     this.http.httpGet(this.requestArgs).subscribe(
    //         res => {
    //             if (res.code === 0) {
    //                 this.provinceLink = res.result.province;
    //                 this.cityLink = res.result.city;
    //                 this.areaLink = res.result.district;
    //                 this.networkManagerModel.netInfo.netDetailAddress = res.result.businessAddr;
    //             }
    //         });
    // }
}
