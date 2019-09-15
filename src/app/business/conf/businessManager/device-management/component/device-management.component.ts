import {Component, OnInit} from '@angular/core';
import {routerTransition} from "../../../../../animations/route-animations";
import {BusinessListService} from "../service/device-management.service";
import {StaticDataModel} from "../model/static-data.model";

/**
 * 设备管理模块
 * @class DeviceManagementComponent
*/
@Component
({
    selector: 'app-device-management',
    templateUrl: './device-management.component.html',
    styleUrls: ['./device-management.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})

export class DeviceManagementComponent extends BusinessListService implements OnInit  {
    /**设备管理表格 静态数据*/
    public staticDataModel: StaticDataModel = new StaticDataModel();
    /**商家下拉框返回值*/
    getDropDown(value) {
        this.businessId = value;
        this.getDeviceManagementTableData(this.businessId);
    }
    /**获取动态数据*/
    getData() {
        this.getDeviceManagementTableData(this.businessId);
    }
    /**页面初始化数据*/
    ngOnInit() {
        this.getData();
    }
}
