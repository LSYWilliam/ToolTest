import {Component, OnInit, ViewChild} from '@angular/core';
import {routerTransition} from '../../../../animations/route-animations';
import {StaticDataModel} from "../model/static-data.model";
import {TableComponent} from "../../../../plugins/component/table/table.component";
import {SwitchDeviceListService} from "../service/switch-device-list.service";

/**
 * 交换机设备管理平台
 * @class SwitchDeviceManagementComponent
 */
@Component
({
    selector: 'app-switch-device-asset-management',
    templateUrl: './switch-device-list.component.html',
    styleUrls: ['./switch-device-list.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})

export class SwitchDeviceListComponent extends SwitchDeviceListService implements OnInit  {
    /** 定义个windowHeight类型 */
    public windowHeight: number;
    /**表格静态数据 实体类*/
    public staticDataModel: StaticDataModel = new StaticDataModel();
    /**在商户列表组件中引入table组件*/
    @ViewChild(TableComponent) child: TableComponent;
    /**
     * 点击获取网络id下拉框
     * */
    getDropDownNetId(value) {
        this.getSwitchList(value);
    }
    /**用于监听子组件的全选*/
    selectRow(options: any) {
        console.log(options);
        const len = options.length;
        if (len <= 0) {
            this.message.warning('请选择一行进行编辑！');
        } else if ( len > 1) {
            this.message.warning('只能对单行进行编辑！');
        } else {
            // this.showModalForData(<SwitchModalInterface> options[0]['data'],options[0]);
        }
    }

    /**
     * 页面数据初始化
     * */
    ngOnInit() {
        this.windowHeight = window.innerHeight-200;
    }
}
