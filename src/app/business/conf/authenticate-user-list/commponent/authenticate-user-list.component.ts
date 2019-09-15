import {Component, OnInit } from '@angular/core';
import {routerTransition} from '../../../../animations/route-animations';
import {AuthenticateAssetManagementService} from "../service/authenticate-asset-management.service";
import {StaticDataModel} from "../model/static-data.model";


/**
 * 设备资产管理平台
 * @class OnlineUserListComponent
 */
@Component
({
    selector: 'app-authenticate-user-list',
    templateUrl: './authenticate-user-list.component.html',
    styleUrls: ['./authenticate-user-list.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})

export class AuthenticateUserListComponent extends AuthenticateAssetManagementService implements OnInit  {
    /**表格静态数据 实体类*/
    public staticDataModel: StaticDataModel = new StaticDataModel();
    /**设备资产管理平台表格 静态数据 实体类*/
    tableOperateEvent(value) {
        console.log(value[0]);
        console.log(value[1]);
    }
    /**
     * 页面数据初始化
     *      1.getApUseInfo() 获取表格右上角设备使用情况
     *      2.getTableData() 获取设备资产管理平台table表格数据
     * */
    ngOnInit() {

    }
}
