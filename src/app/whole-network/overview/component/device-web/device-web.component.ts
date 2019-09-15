import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {DeviceWebModel} from "./model/net-web.model";
import {StaticDataModel} from "./model/static-data.model";
import {RequestArgs} from "../../../../shared/model/request-args";
import {HttpClientService} from "../../../../shared/service/httpClient.service";
import {Router} from "@angular/router";

/**
 * 折叠组件模块
 * @class DeviceWebComponent
 */
@Component({
  selector: 'app-device-web',
  templateUrl: './device-web.component.html',
  styleUrls: ['./device-web.component.scss']
})
export class DeviceWebComponent implements OnChanges {

    /** 组件输入 显示关注网络数据 实体类*/
    @Input() public deviceWebs: DeviceWebModel = new DeviceWebModel();
    public isShowNetName: any;
    public tableRowData: any;
    /** 组件输出 网络ID数据 */
    @Output() public netWorkRoute = new EventEmitter();
    /** 组件输出 网络ID数据 */
    @Output() public apWarnRoute = new EventEmitter();
    /**表格静态数据 实体类*/
    public staticDataModel: StaticDataModel = new StaticDataModel();

    constructor(private http: HttpClientService,public router: Router,) {
        this.isShowNetName = true;
    }
    closeIcon() {
        this.isShowNetName = true;
    }
    /**点击每一个网络名称*/
    netNameEvent(deviceWebs) {
        this.netWorkRoute.emit(deviceWebs);
    }
    /**点击每一个告警*/
    apWarnEvent(deviceWebs) {
        this.isShowNetName = false;
        this.getWarnDeviceList(deviceWebs.netId);
    }
    /**点击告警设备，跳转到该网络下的告警设备列表*/
    getWarnDeviceList(netId) {
        let requestArgs: RequestArgs = new RequestArgs();
        requestArgs.systemName = 'wlanscope';
        requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
        requestArgs.url = '/api/v1/overview/warn/' + netId;
        this.http.httpGet(requestArgs)
            .subscribe(
                res => {
                    if (res.code === 0) {
                        this.tableRowData = res.result;
                        this.apWarnRoute.emit();
                    } else if (res.code === 9) {
                        this.tableRowData = [];
                        this.apWarnRoute.emit();
                    }
                });
    }
    /**
     * 表格单击方法
     * @param value 表格行内容
     * @description
     *      1、获取用户点击表格的行内容
     *      2、根据行数据进行跳转
     *      3、跳转至ap概要页面，并隐藏跳转参数
     */
    cellClick(value: any) {
        if (value.colDef.field) {
            this.router.navigate(["/ap-details/" , value.data['apId'], "/overview", value.data['apSn'],],
                {skipLocationChange: true });
        }

    }
    /**监听组件表格内容是否改变的 生命周期函数*/
    ngOnChanges(changes: SimpleChanges): void {

    }

}
