import { Injectable } from '@angular/core';
import { HttpClientService } from '../../../../shared/service/httpClient.service';
import { RequestArgs } from '../../../../shared/model/request-args';
import { FirmwareManagementPlatformModel } from '../model/firmware-management-platform.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from "@angular/forms";
import { VersionTypeDropDownModel } from "../model/version-type-drop-down.model";
import { DropDownsInterface } from "../../../../shared/component/dropdown/model/dropdowns.model";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { DeviceModelResolverModel } from "../../../../shared/model/device-model-resolver.model";
import { DeviceTypeResolverModel } from "../../../../shared/model/device-type-resolver.model";
import {SwitchDeviceModelResolverModel} from "../../../../shared/model/switch-device-model-resolver.model";

@Injectable()

export class FirmwareManagementPlatformService {
    public firmwareManagementPlatformModel: FirmwareManagementPlatformModel = new FirmwareManagementPlatformModel();
    public versionTypeDropDown: VersionTypeDropDownModel = new VersionTypeDropDownModel();
    public verType: string;
    public verModel: string;
    public unchosenDeviceModelDropDown = [];
    public searchDeviceModelDropDown;
    public uploadDeviceModelDropDown;
    public uploadDeviceType;
    /**
     * 构造方法
     * @param
     *      注入到http
     *      注入到fb
     *      注入到modalService
     *      注入到message
     * @description
     *      1、设置添加版本-版本类型
     *      2、设备类型下拉框
     *      3、设备型号下拉框
     *
     * */
    constructor(public http: HttpClientService,
                public fb: FormBuilder,
                public activatedRoute: ActivatedRoute,
                public modalService: NzModalService,
                public message: NzMessageService) {

        this.verType = '请选择类型';
        this.verModel = '请先选择设备类型';
        this.unchosenDeviceModelDropDown.push(<DropDownsInterface> {id: undefined, name: '请先选择设备类型'});
        /** 设备类型下拉框 */
        this.versionTypeDropDown.deviceType = new DeviceTypeResolverModel(activatedRoute).deviceType;
        /** AP设备型号下拉框 */
        this.versionTypeDropDown.deviceModel = new DeviceModelResolverModel(activatedRoute).deviceModel;
        /** 交换机设备型号下拉框 */
        this.versionTypeDropDown.switchDeviceModel = new SwitchDeviceModelResolverModel(activatedRoute).switchDeviceModel;
        /** 版本上传设备类型下拉框 */
        this.versionTypeDropDown.uploadDeviceType = new DeviceTypeResolverModel(activatedRoute).deviceType2;
        /** AP版本上传设备型号下拉框 */
        this.versionTypeDropDown.uploadDeviceModel = new DeviceModelResolverModel(activatedRoute).deviceModel2;
        /** 版本上传交换机设备型号下拉框 */
        this.versionTypeDropDown.switchUploadDeviceModel = new SwitchDeviceModelResolverModel(activatedRoute).switchDeviceModel2;

        this.uploadDeviceType = "请选择类型";
        this.searchDeviceModelDropDown = this.unchosenDeviceModelDropDown;
        this.uploadDeviceModelDropDown = this.unchosenDeviceModelDropDown;

    }

    /** 获取服务器地址 */
    public getFileUploadServer(requestArgs: RequestArgs) {
        requestArgs.url = '/api/v1/file_upload_server';
        this.http.httpGet(requestArgs)
            .subscribe(
                res => {
                    if (res.code === 0) {
                        let link: string = res.result.fileUploadServer;
                        let first = link.indexOf('/');
                        let second = link.indexOf('/', first + 1);
                        let third = link.indexOf(':');
                        let fourth = link.indexOf(':', third + 1);
                        let server = link.substring(second + 1, fourth);
                        this.firmwareManagementPlatformModel.fileUploadServer = server;
                    } else {
                        this.firmwareManagementPlatformModel.versionDetails = '暂无服务器地址';
                    }
                });
    }

    /** 设备类型下拉框 */
    public getTypeList() {
        let requestArgs: RequestArgs = new RequestArgs();
        requestArgs.systemName = 'wlanscope';
        requestArgs.url = '/api/v1/firmware_version/device_type';
        requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
        this.http.httpGet(requestArgs)
            .subscribe(res => {
                if (res.code === 0) {
                    let tmp: Array<DropDownsInterface> = [];
                    tmp.push(<DropDownsInterface> {id: undefined, name: '请选择类型'});
                    res.result.forEach(
                        data => {
                            tmp.push(<DropDownsInterface> {id: data.type, name: data.typeName});
                        }
                    );
                    this.versionTypeDropDown.deviceType = tmp;
                }
            });
    }

    /** 设备型号下拉框 */
    // public getModelList(type) {
    //     let requestArgs: RequestArgs = new RequestArgs();
    //     requestArgs.systemName = 'wlanscope';
    //     requestArgs.url = "/api/v1/firmware_version/device_model";
    //     requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
    //     this.http.httpGet(requestArgs)
    //         .subscribe(res => {
    //             if (res.code === 0) {
    //                 let tmp: Array<DropDownsInterface> = [];
    //                 tmp.push(<DropDownsInterface> {id: undefined, name: '请选择型号'});
    //                 if (type === '') {
    //                     res.result.forEach(
    //                         data => {
    //                             tmp.push(<DropDownsInterface> {id: data.modelId, name: data.deviceModel});
    //                         }
    //                     );
    //                 } else {
    //                     res.result.forEach(
    //                         data => {
    //                             if (type === data.type) {
    //                                 tmp.push(<DropDownsInterface> {id: data.modelId, name: data.deviceModel});
    //                             }
    //                         }
    //                     );
    //                 }
    //                 this.versionTypeDropDown.deviceModel = tmp;
    //             }
    //         });
    // }

    /** 获取版本详情 */
    protected getVersionExplain(requestArgs: RequestArgs, id: string) {
        requestArgs.url = '/api/v1/firmware_version/' + id;
        this.http.httpGet(requestArgs)
            .subscribe(
                res => {
                    if (res.code === 0) {
                        this.firmwareManagementPlatformModel.versionDetails = res.result.instruction;
                    } else {
                        this.firmwareManagementPlatformModel.versionDetails = "暂无描述";
                    }
                });
    }

    /**
     * 获取版本列表
     * @param requestArgs  RequestArgs
     * @description
     *          获得版本列表
     * */
    protected getFirmwareVersionList(requestArgs: RequestArgs) {
        requestArgs.url = "/api/v1/firmware_version";
        this.http.httpGet(requestArgs)
            .subscribe(
                res => {
                    if (res.code === 0) {
                        this.firmwareManagementPlatformModel.tableData = res.result;
                    } else if (res.code === 9) {
                        this.firmwareManagementPlatformModel.tableData = [];
                    } else {
                        this.message.error(res.msg);
                        this.firmwareManagementPlatformModel.tableData = [];
                    }
                });
    }

    protected getFirmwareVersionListTwo(requestArgs: RequestArgs) {
        requestArgs.url = "/api/v1/firmware_version";
        this.http.httpGet(requestArgs)
            .subscribe(
                res => {
                    if (res.code === 0) {
                        this.firmwareManagementPlatformModel.tableData = res.result;
                    } else if (res.code === 9) {
                        this.firmwareManagementPlatformModel.tableData = [];
                    } else {
                        this.firmwareManagementPlatformModel.tableData = [];
                    }
                });
    }

    protected getFilterList(requestArgs: RequestArgs) {
        return this.http.httpGet(requestArgs).map(res => res);
    }

    /**
     * 获取固件版本停用
     * */
    protected getVersionStop(requestArgs: RequestArgs, id: string) {
        requestArgs.url = '/api/v1/firmware_version/' + id;
        return this.http.httpPatch(requestArgs).map(res => res);
    }

    /**
     * 版本上传
     * @param requestArgs  RequestArgs
     * @param data         文件流
     * @description
     *          版本上传
     * */
    protected getVersionUpload(requestArgs: RequestArgs, data: any) {
        requestArgs.url = '/api/v1/firmware_version/version_file';
        requestArgs.body = data;
        return this.http.httpPost2(requestArgs).map(res => res);
    }

}
