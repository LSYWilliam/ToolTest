import {HttpClientService} from "../../../../shared/service/httpClient.service";
import {RequestArgs} from "../../../../shared/model/request-args";
import {Inject, Injectable} from "@angular/core";

import {Router} from "@angular/router";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {DOCUMENT} from "@angular/common";

@Injectable()
export class EquipmentAssetManagementService {
    /**表格行数据*/
    public dataSet: Array<any> = [];
    /**重置的数据*/
    public resetArray: Array<any> = [];
    /**http请求*/
    public requestArgs: RequestArgs = new RequestArgs();
    /**表格是否有复选框*/
    public isCheckBox: boolean;
    public total: any;

    constructor(public http: HttpClientService,public router: Router,  public message: NzMessageService,
                public modal: NzModalService, @Inject(DOCUMENT) public document: any) {
        this.requestArgs.systemName = "wlanscope";
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};

        this.resetArray = [
            { id: 0, value: '库存中', checked: false },
            { id:1, value: '使用中', checked: false },
            { id:2, value: '已废弃', checked: false }
        ];
        this.isCheckBox = true;
    }

    /**获取设备管理列表数据*/
    getEquipmentAssetListData(pageIndex, pageSize, assetStatus, sortCondition, businessName, assetSn, assetMac, assetModel) {
        this.requestArgs.url = '/api/asset/list';
        this.requestArgs.body = {
            "number": pageIndex,
            "size": pageSize,
            "assetStatus": assetStatus,
            "sort": sortCondition,
            "businessName": businessName,
            "assetSn": assetSn,
            "assetMac": assetMac,
            "assetModel": assetModel
        };
        console.log(this.requestArgs);
        this.http.httpPost(this.requestArgs).subscribe( res => {
            if (res.code === 0) {
                this.dataSet = res.result.content;
                for (let item of this.dataSet) {
                    if (item.assetStatus === 0) {
                        Object.assign(item, {disabled: false});
                    } else {
                        Object.assign(item, {disabled: true});
                    }
                }
                this.total = res.result.totalElements;
            } else {
                this.message.error(res.msg);
            }
        });
    }
    /**单元格编辑接口*/
    cellEditInterface(assetId, assetName, remark ) {
        this.requestArgs.url = '/api/asset/edit';
        this.requestArgs.body = {
            "assetId": assetId,
            "assetName": assetName,
            "remark": remark
        };
        this.http.httpPost(this.requestArgs).subscribe( res => {
             if (res.code !== 0) {
                 this.message.error(res.msg);
             }
        });
    }
    /**废弃设备*/
    abandonedAsset(assetId) {
        this.requestArgs.url = '/api/asset/del?assetId=' + assetId;
        return this.http.httpPatch(this.requestArgs);
    }

    /**添加设备*/
    addAsset(data) {
        this.requestArgs.url = "/api/asset/add";
        this.requestArgs.body = {
            assetName: data.assetName,
            assetSn: data.assetSn,
            assetModel: data.assetModel,
            assetModelDescription: data.assetModelDescription,
            assetMac: data.assetMac
        };
        return this.http.httpPost(this.requestArgs);
    }
    /**获取详情数据接口*/
    getDetailsData(assetSN, number, size ) {
        this.requestArgs.url = '/api/asset/details';
        this.requestArgs.body = {
            "assetSN": assetSN,
            "number": number,
            "size": size
        };
        return this.http.httpPost(this.requestArgs);
    }
}
