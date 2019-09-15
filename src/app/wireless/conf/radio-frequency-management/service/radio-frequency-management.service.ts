import {Injectable} from "@angular/core";
import {NetworkListResolverModel} from "../../../../shared/model/network-list-resolver.model";
import {ActivatedRoute, Router} from "@angular/router";
import {RadioFrequencyModel} from "../model/radio-frequency.model";
import {HttpClientService} from "../../../../shared/service/httpClient.service";
import {RequestArgs} from "../../../../shared/model/request-args";
import {AllRadioFreqModel} from "../../../../shared/model/all-radio-freq.model";
import {AllRadioFreqInterface} from "../../../../shared/interface/all-radio-freq.interface";
import {NzMessageService, NzModalService} from "ng-zorro-antd";

/**
 * 无线-配置-射频管理数据获取类
 * @class RadioFrequencyManagementService
 */

@Injectable()
export class RadioFrequencyManagementService {
    /** 页面Model */
    public radioFrequencyModel: RadioFrequencyModel = new RadioFrequencyModel();
    /** http请求参数 */
    public requestArgs: RequestArgs = new RequestArgs();
    /** 网络ID */
    public netID: string;
    /**是否显示加载中 false: 不显示  true: 显示*/
    public spinStatus: boolean = false;

    /**
     * 构造函数
     * @param http HttpClientService
     *              注入http客户端服务
     * @param activatedRoute  ActivatedRoute
     *              注入路由服务
     * @param modalService NzModalService
     *              注入佐罗模态服务
     * @param route  Router
     *              注入路由服务
     * @param _message  错误提示框
     *              注入路由服务
     * @description
     *      1、设置统一请求参数的系统名称与ticket
     *      2、类实例化的时候获取网络列表的下拉菜单值
     */
    constructor(private route: Router,
                private http: HttpClientService,
                private activatedRoute: ActivatedRoute,
                public modalService: NzModalService,
                public _message: NzMessageService){
        this.requestArgs.systemName = 'wlanscope';
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
        this.getNetworkList(this.activatedRoute,this.route);
        if (this.radioFrequencyModel.dropDowns != null) {
            this.netID = this.radioFrequencyModel.dropDowns[0].id;
        }
    }

    /**
     * 获取网络列表下拉菜单的内容
     * @param activatedRoute  ActivatedRoute
     *              路由服务
     * @param route  Router
     *             路由服务
     */
    protected getNetworkList(activatedRoute: ActivatedRoute,route: Router) {
        this.radioFrequencyModel.dropDowns = new NetworkListResolverModel(activatedRoute,route).networkList;
    }
    /**获取全网配置数据*/
    // protected getGlobalValue() {
    //     this.requestArgs.url = "/api/v1/rf/getNetRfConfig/" + this.netID;
    //     this.http.httpGet(this.requestArgs)
    //         .subscribe(
    //             res => {
    //                 if (res.code === 0) {
    //                     let data = new AllRadioFreqModel();
    //                     data.setAllData(<AllRadioFreqInterface> res.result);
    //                     this.radioFrequencyModel.globalConf = data;
    //                 }
    //             });
    // }
    /**获取AP射频管理数据*/
    protected getApTable() {
        this.requestArgs.url = "/api/v1/rf/getApRfConfig/" + this.netID;
        this.http.httpGet(this.requestArgs)
            .subscribe(
                res => {
                    console.log(res);
                    switch (res.code) {
                        case 0:
                            let data: any = [];
                            for (let obj of res.result) {
                                data.push(RadioFrequencyManagementService.getTableData(obj));
                            }
                            this.radioFrequencyModel.tableData = data;
                            break;
                        case 9:
                            this.radioFrequencyModel.tableData = [];
                            break;
                    }
                });
    }
    /**点击页面的保存按钮，弹出模态框，点击此模态框的确定按钮触发的事件*/
    protected saveGlobalConf(data: any) {
        this.requestArgs.url = "/api/v1/rf/saveNetRfConfig";
        this.requestArgs.body = {
            'id': data['id'],
            'netId': this.netID,
            'config2gState': data['channel2Enable'],
            'config2gChannel': data['channel2'],
            'config2gPowerDbm': data['power2'],
            'config2g11nChannelWidth': data['channelWidth2'],
            // 'config2g11nSpace': data['channelWidth2'],
            'config5gState': data['channel5Enable'],
            'config5gChannel': data['channel5'],
            'config5gPowerDbm': data['power5'],
            'config5g11nChannelWidth': data['channelWidth5'],
            // 'config5g11nSpace': data['config5g11nSpace'],
            'radioFrequencyRoamInduction': data['roamingInduction']
        };
        this.http.httpPost(this.requestArgs).subscribe(
            res => {
                if (res.code === 0) {
                    // this.getGlobalValue();
                    this.getApTable();
                    this._message.success('全局保存成功!');
                    this.spinStatus = false;
                } else {
                    this._message.error('全局保存失败!');
                    this._message.error(res.msg);
                }
            }
        );
    }
    /**获取AP射频管理表格数据*/
    private static getTableData(data: AllRadioFreqInterface) {
        const rowData = {"apId":"", "apName":"", "apModel":"","apMac":"",
            "config2gChannel":"","config2gPowerDbm":"","config5gChannel":"",
            "config2g11nChannelWidth":null,"config5g11nChannelWidth":null,
            "config5gPowerDbm":"","rssiThreshold":null, "apRateThreshold":null,
            "config2gState" : null , "config5gState" : null, "config2g11nSpace": null,  "config5g11nSpace": null
        };

            rowData['apId'] = data.apId;
            rowData['apName'] = data.apName;
            rowData['apModel'] = data.apModel;
            rowData['apMac'] = data.apMac;
            if (data.config2gState == 0) {
                rowData['config2gChannel'] = "未开启";
                rowData['config2gPowerDbm'] = "未开启";
                rowData['config2g11nChannelWidth'] = ""+data.config2g11nChannelWidth;
                rowData['config2g11nSpace'] = ""+data.config2g11nSpace;
                rowData['config2g11nChannelWidthDesc'] = "未开启";
                rowData['config2g11nSpaceDesc'] = "未开启";
                rowData['config2gState'] = true;
            } else {
                rowData['config2gChannel'] = data.config2gChannelDesc;
                rowData['config2gPowerDbm'] = data.config2gPowerDbmDesc;
                rowData['config2g11nChannelWidth'] = ""+data.config2g11nChannelWidth;
                rowData['config2g11nSpace'] = ""+data.config2g11nSpace;
                rowData['config2g11nChannelWidthDesc'] = data.config2g11nChannelWidthDesc;
                rowData['config2g11nSpaceDesc'] = data.config2g11nSpaceDesc;
                rowData['config2gState'] = false;
            }

            if (data.config5gState == 0) {
                rowData['config5gChannel'] = "未开启";
                rowData['config5gPowerDbm'] = "未开启";
                rowData['config5g11nChannelWidth'] = ""+data.config5g11nChannelWidth;
                rowData['config5g11nSpace'] = ""+data.config5g11nSpace;
                rowData['config5g11nChannelWidthDesc'] = "未开启";
                rowData['config2g11nSpaceDesc'] = "未开启";
                rowData['config5gState'] = true;
            } else {
                rowData['config5gChannel'] = data.config5gChannelDesc;
                rowData['config5gPowerDbm'] = data.config5gPowerDbmDesc;
                rowData['config5g11nChannelWidth'] = ""+data.config5g11nChannelWidth;
                rowData['config5g11nSpace'] = ""+data.config5g11nSpace;
                rowData['config5g11nChannelWidthDesc'] = data.config5g11nChannelWidthDesc;
                rowData['config5g11nSpaceDesc'] = data.config5g11nSpaceDesc;
                rowData['config5gState'] = false;
            }

            rowData['rssiThreshold'] = data.fieldsStrengthThreshold;
            rowData['apRateThreshold'] = data.apRateThreshold;
            return rowData;
    }
}
