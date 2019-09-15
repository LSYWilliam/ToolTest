import { Injectable } from '@angular/core';
import { HttpClientService } from '../../../../shared/service/httpClient.service';
import { RequestArgs } from '../../../../shared/model/request-args';
import { FirmwareManagementModel } from '../model/firmware-management.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService, NzModalService } from "ng-zorro-antd";
import { BusinessDropDownModel } from "../model/business-drop-down.model";
import { BusinessListResolverModel } from "../../../../shared/model/business-list-resolver.model";
import {DropDownsInterface} from "../../../../shared/component/dropdown/model/dropdowns.model";

@Injectable()

export class FirmwareManagementService {

    public versionId: string;
    public firmwareManagementModel: FirmwareManagementModel = new FirmwareManagementModel();
    public switchFirmwareManagementModel: FirmwareManagementModel = new FirmwareManagementModel();
    public bidDropDownModel: BusinessDropDownModel = new BusinessDropDownModel();
    public tabs = [
        {
            name   : 'AP固件管理',
            content: 'AP'
        },
        {
            name   : '交换机固件管理',
            content: '交换机'
        }
    ];

    constructor(public http: HttpClientService,
                private router: Router,
                private route: ActivatedRoute,
                public modal: NzModalService,
                public message: NzMessageService,
                private activatedRoute: ActivatedRoute,
                private activeRouteId: ActivatedRoute,
                public confirmServ: NzModalService) {
        this.activeRouteId.paramMap.subscribe(
            res => {
                this.versionId = res.get('id');
            }
        );
        this.getBusinessInfo(this.activatedRoute, this.router);
        this.bidDropDownModel.veriosnDropDowns = [{'id': undefined, 'name': '暂无更新版本'}];

    }

    /** 获取商家下拉菜单 */
    protected getBusinessInfo(activatedRoute: ActivatedRoute, router: Router) {
        this.bidDropDownModel.dropDowns = new BusinessListResolverModel(activatedRoute, router).businessList;
    }

    /** 获取版本详情(点击列表中的固件版本查看版本说明) */
    protected getVersionExplain(requestArgs: RequestArgs, id: string) {
        requestArgs.url = '/api/v1/ap_version/' + id;
        this.http.httpGet(requestArgs)
            .subscribe(
                res => {
                    if (res.code === 0) {
                        this.firmwareManagementModel.versionDetails = res.result.instruction;
                    } else {
                        this.firmwareManagementModel.versionDetails = "暂无数据！";
                    }
                });
    }

    /** 获取更新记录(点击列表中更新记录,查看更新记录) */
    protected getUpdateNotes(requestArgs: RequestArgs, apId: string) {
        // requestArgs.url = '/api/v1/ap_version_upgrade_history/' + apId;
        requestArgs.url = `/api/v1/version_upgrade/history/1/${apId}`;
        this.http.httpGet(requestArgs)
            .subscribe(
                res => {
                    if (res.code === 0) {
                        let data: any[] = [];
                        for (let i = 0; i < res.result.length; i++) {
                            data.push({
                                'updateTime': res.result[i].updateTime,
                                'currentVersion': res.result[i].currentVersionInfo?res.result[i].currentVersionInfo['version']:"",
                                'oldVersion': res.result[i].oldVersionInfo?res.result[i].oldVersionInfo['version']:""
                            });
                        }
                        this.firmwareManagementModel.upadteNote = data;
                    } else if (res.code === 9) {
                        this.firmwareManagementModel.upadteNote = [];
                    } else {
                        this.message.error(res.msg);
                        this.firmwareManagementModel.upadteNote = [];
                    }
                });
    }

    /** 获取更新记录(点击列表中更新记录,查看更新记录) */
    protected getSwitchUpdateNotes(requestArgs: RequestArgs, switchId: string) {
        requestArgs.url = `/api/v1/version_upgrade/history/2/${switchId}`;
        this.http.httpGet(requestArgs)
            .subscribe(
                res => {
                    if (res.code === 0) {
                        let data: any[] = [];
                        for (let i = 0; i < res.result.length; i++) {
                            data.push({
                                'updateTime': res.result[i].updateTime,
                                'currentVersion': res.result[i].currentVersionInfo['version'],
                                'oldVersion': res.result[i].oldVersionInfo['version']
                            });
                        }
                        this.switchFirmwareManagementModel.upadteNote = data;
                    } else if (res.code === 9) {
                        this.switchFirmwareManagementModel.upadteNote = [];
                    } else {
                        this.switchFirmwareManagementModel.upadteNote = [];
                    }
                });
    }

    /**
     * 获取版本列表
     * */
    protected getFirmwareVersionList(requestArgs: RequestArgs, id) {
        requestArgs.url = "/api/v1/ap_info/" + id;
        this.http.httpGet(requestArgs)
            .subscribe(
                res => {
                    if (res.code === 0) {
                        let data: any = [];
                        for (let i = 0; i < res.result.length; i ++) {
                            if (res.result[i].currentVersionInfo === null ||
                                res.result[i].currentVersionInfo === {} ||
                                res.result[i].currentVersionInfo === [] ||
                                res.result[i].currentVersionInfo === '' ||
                                res.result[i].currentVersionInfo === undefined ||
                                JSON.stringify(res.result[i].currentVersionInfo) === '{}' ) {
                                data.push({
                                    'apId': res.result[i].apId,
                                    'apStatusIcon': res.result[i].apStatusIcon,
                                    'apModel': res.result[i].apModel,
                                    'apName': res.result[i].apName,
                                    'netName': res.result[i].netName,
                                    'apSn': res.result[i].apSn,
                                    'id': null,
                                    'version': null,
                                    'type': null
                                });
                            } else {
                                data.push({
                                    'apId': res.result[i].apId,
                                    'apStatusIcon': res.result[i].apStatusIcon,
                                    'apName': res.result[i].apName,
                                    'apModel': res.result[i].apModel,
                                    'netName': res.result[i].netName,
                                    'apSn': res.result[i].apSn,
                                    'id': res.result[i].currentVersionInfo.id,
                                    'version': res.result[i].currentVersionInfo.version,
                                    'type': res.result[i].currentVersionInfo.type,
                                });

                            }
                        }
                        this.firmwareManagementModel.tableData = data;
                    } else if (res.code === 9) {
                        this.firmwareManagementModel.tableData = [];
                    } else {
                        this.firmwareManagementModel.tableData = [];
                    }

                });
    }

    /**
     * 获取版本列表
     * */
    protected getSwitchFirmwareVersionList(requestArgs: RequestArgs, id) {
        requestArgs.url = "/api/v1/switch_info/" + id;
        this.http.httpGet(requestArgs)
            .subscribe(
                res => {
                    if (res.code === 0) {
                        let data: any = [];
                        for (let i = 0; i < res.result.length; i ++) {
                            if (res.result[i].currentVersionInfo === null ||
                                res.result[i].currentVersionInfo === {} ||
                                res.result[i].currentVersionInfo === [] ||
                                res.result[i].currentVersionInfo === '' ||
                                res.result[i].currentVersionInfo === undefined ||
                                JSON.stringify(res.result[i].currentVersionInfo) === '{}' ) {
                                data.push({
                                    'switchId': res.result[i].switchId,
                                    'switchStatusIcon': res.result[i].switchStatusIcon,
                                    'switchName': res.result[i].switchName,
                                    'switchModel': res.result[i].switchModel,
                                    'netName': res.result[i].netName,
                                    'switchSn': res.result[i].switchSn,
                                    'id': null,
                                    'version': null,
                                    'type': null
                                });
                            } else {
                                data.push({
                                    'switchId': res.result[i].switchId,
                                    'switchStatusIcon': res.result[i].switchStatusIcon,
                                    'switchName': res.result[i].switchName,
                                    'switchModel': res.result[i].switchModel,
                                    'netName': res.result[i].netName,
                                    'switchSn': res.result[i].switchSn,
                                    'id': res.result[i].currentVersionInfo.id,
                                    'version': res.result[i].currentVersionInfo.version,
                                    'type': res.result[i].currentVersionInfo.type,
                                });

                            }
                        }
                        this.switchFirmwareManagementModel.tableData = data;
                    } else if (res.code === 9) {
                        this.switchFirmwareManagementModel.tableData = [];
                    } else {
                        this.switchFirmwareManagementModel.tableData = [];
                    }

                });
    }

    /**
     * 更新
     * */
    protected getUpdate(requestArgs: RequestArgs, data) {
        requestArgs.url = '/api/v1/ap_info/ap_version';
        requestArgs.body = data;
        return this.http.httpPatch(requestArgs).map(res => res);
    }

    /**
     * 更新
     * */
    protected getSwitchUpdate(requestArgs: RequestArgs, data) {
        requestArgs.url = '/api/v1/switch_info/upgrade_version';
        requestArgs.body = data;
        return this.http.httpPost(requestArgs).map(res => res);
    }

    /** 获取版本 */
    protected getVersionList(requestArgs: RequestArgs, type, model) {
        requestArgs.url = '/api/v1/firmware_version/useful_firmware?type='+ type + '&deviceModel=' + model;
        return this.http.httpGet(requestArgs).map( res => res);
    }
}
