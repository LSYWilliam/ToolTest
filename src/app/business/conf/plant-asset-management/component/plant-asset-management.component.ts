import {Component, OnInit } from '@angular/core';
import {routerTransition} from '../../../../animations/route-animations';
import {PlantAssetManagementService} from "../service/plant-asset-management.service";
import {PlantTableHeader} from "../model/plant-table-header";

/**
 * 设备资产管理平台
 * @class OnlineUserListComponent
 */
@Component
({
    selector: 'app-plant-asset-management',
    templateUrl: './plant-asset-management.component.html',
    styleUrls: ['./plant-asset-management.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})

export class PlantAssetManagementComponent extends PlantAssetManagementService implements OnInit  {
    /**设备资产管理平台表格 静态数据 实体类*/
    public tableHeader: PlantTableHeader = new PlantTableHeader();
    /**
     * 页面数据初始化
     *      1.getApUseInfo() 获取表格右上角设备使用情况
     *      2.getTableData() 获取设备资产管理平台table表格数据
     * */
    ngOnInit() {
        this.getApUseInfo();
        this.getTableData();
    }
}
