import {HttpClientService} from "../../../../../shared/service/httpClient.service";
import {RequestArgs} from "../../../../../shared/model/request-args";
import {Injectable} from "@angular/core";

import {Router} from "@angular/router";
import {NzMessageService, NzModalService} from "ng-zorro-antd";

@Injectable()
export class BusinessNetworkListService {
    /**http请求*/
    public requestArgs: RequestArgs = new RequestArgs();

    /**表格行数据*/
    public dataSet: Array<any> = [];
    /**表格是否有复选框*/
    public isCheckBox: boolean;
    public total: any;
    /**商家列表*/
    public businessList: any;
    /**设备型号列表*/
    public apModelList: Array<any> = [];

    constructor( public http: HttpClientService,
                 public route: Router,
                 public message: NzMessageService,
                 public modal: NzModalService) {
        this.requestArgs.systemName = 'wlanscope';
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
        this.isCheckBox = true;
    }

    /**获取网络列表数据*/
    getWorkListData(province: any, city: any, county: any, businessName: string, netName: string, number: any, size: any, sort: any ) {
        // this.requestArgs.systemName = 'wlanscope';
        this.requestArgs.url = "/api/v1/net_info/list_net";
        this.requestArgs.body = {
            "province": province,
            "city": city,
            "county": county,
            "businessName": businessName,
            "netName": netName,
            "number": number,
            "size": size,
            "sort":  sort
        };
        this.http.httpPost(this.requestArgs).subscribe( res => {
            console.log(res);
            if (res.code === 0) {
                this.dataSet = res.result;
                this.total = res.pagination.totalElements;
            }else if (res.code ===9) {
                this.dataSet = [];
            } else {
                this.message.error(res.msg);
            }
        })
    }

    /**获取商家表格数据*/
    protected getBusinessTableData() {
        // this.requestArgs.systemName = 'wlanscope';
        this.requestArgs.url = "/api/v1/businesses";
        this.http.httpGet(this.requestArgs)
            .subscribe(
                res => {
                    if (res.code === 0) {
                        this.businessList = res.result;
                    } else if (res.code ===9) {
                        this.businessList = [];
                    }  else {
                        this.message.error(res.msg);
                    }
                });
    }
    /**获取设备型号列表数据*/
    protected getDeviceModelListData() {
        this.requestArgs.url = "/api/v1/firmware_version/device_model/1";
        this.http.httpGet(this.requestArgs)
            .subscribe(
                res => {
                    if (res.code === 0) {
                        const result = res.result;
                        result.forEach( item => {
                            this.apModelList.push({name: item.deviceModel, id: item.modelId});
                        });
                    } else if (res.code ===9) {
                        this.apModelList = [];
                    }  else {
                        this.message.error(res.msg);
                    }
                });
    }

    /**删除设备型号列表数据*/
    // delAssetListData(netId) {
    //     this.requestArgs.url = "/api/v1/net_info/discard_net";
    //     this.requestArgs.body = {
    //         netId: netId
    //     };
    //     return this.http.httpPost( this.requestArgs );
    // }

    delAssetListData(netId) {
        this.requestArgs.url = "/api/v1/net_info/delete_batch";
        this.requestArgs.body = netId;
        console.log(this.requestArgs);
        return this.http.httpPost( this.requestArgs );
    }

    /**获取设备信息接口*/
    getAssetDescData(netId, number, size) {
        this.requestArgs.url = '/api/v1/wireless/getApList/' + netId + '?number=' + number + '&size=' + size;
        this.requestArgs.body = {};
        return this.http.httpGet(this.requestArgs);
    }
}
