import {Component, OnInit} from '@angular/core';
import {routerTransition} from "../../../../animations/route-animations";
import {SsidDetailsService} from "../service/ssid-details.service";

/**
 * 当日概况模块
 * @class OverviewComponent
*/
@Component
({
    selector: 'app-ssid-details',
    templateUrl: './ssid-details.component.html',
    styleUrls: ['./ssid-details.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})

export class SsidDetailsComponent extends SsidDetailsService implements OnInit  {
    /**获取动态数据*/
    getData() {
        /**获取SSID列表数据*/
        super.getSSIDList();
    }
    /**
     * 网络选择下拉框
     * 1. 选中某个网络，获取该网络下对应的ssid清单列表
     * */
    getDropDown(id) {
        this.netID = id;
        super.getSSIDList();
    }
    /**初始化数据*/
    ngOnInit() {
        this.getData();
    }
}
