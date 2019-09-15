import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';

import {OverviewService} from '../service/overview.service';
import {StaticDataModel} from '../model/static-data.model';
import {TableComponent} from '../../../plugins/component/table/table.component';
import {RequestArgs} from '../../../shared/model/request-args';
import {routerTransition} from '../../../animations/route-animations';
import {DeviceWebComponent} from "./device-web/device-web.component";

/**
 * 概况模块
 * @class OverviewComponent
*/
@Component
({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})

export class OverviewComponent extends OverviewService implements OnInit, OnDestroy  {
    public staticDataModel: StaticDataModel = new StaticDataModel();
    @ViewChild(TableComponent) child: TableComponent;
    @ViewChild(DeviceWebComponent) deviceWeb: DeviceWebComponent;

    /**
     * 获取页面静态数据的方法
     * @description
     *      1、需要设置各个tips的内容
     */
    private getStaticData() {
        this.staticDataModel.businessTips = '展示企业今日截止最近5分钟的上行速率、下行速率、总速率的变化趋势及当前在线客户端数量';
        this.staticDataModel.deviceTips = '按今日转发流量和在线客户端数展现今天分布top网络';
        this.staticDataModel.netWorkTips = '按今日转发流量展示top10网络';
    }

    /**
     * 获取页面数据方法
     * @description
     *      1、创建统一请求参数
     *      2、设置统一请求参数的系统名称与ticket
     */
    private getData() {
        let requestArgs: RequestArgs = new RequestArgs();
        requestArgs.systemName = 'wlanscope';
        requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};

        super.getBusinessMonitorChart(requestArgs);
        super.getBusinessMonitor(requestArgs);
        super.getColumnFlowChart(requestArgs);
        super.getCurrentClient(requestArgs);
        super.showPoint(requestArgs);
        super.getBusiWarnDeviceList(requestArgs);
    }

    /**
     * 表格单击方法
     * @param value 表格行内容
     * @description
     *      1、获取用户点击表格的行内容
     *      2、根据行数据进行跳转
     *      3、跳转至ap概要页面，并隐藏跳转参数
     */
    cellClickEvent(value) {
        this.router.navigate(["/ap-details/" , value.data['apId'], '/overview', value.data['apSn']],
            {skipLocationChange: true });
    }

    /**转发流量*/
    flowInfo() {
        this.$top5Client.unsubscribe();
        this.flowBtnType = 'primary';
        this.clientBtnType = 'default';
        let requestArgs: RequestArgs = new RequestArgs();
        requestArgs.systemName = 'wlanscope';
        requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
        this.getColumnFlowChart(requestArgs);
    }
    /**在线客户端*/
    clientInfo() {
        this.$top5Flow.unsubscribe();
        this.flowBtnType = 'default';
        this.clientBtnType = 'primary';

        let requestArgs: RequestArgs = new RequestArgs();
        requestArgs.systemName = 'wlanscope';
        requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};

        this.getColumnClientChart(requestArgs);

    }

    /**切换按钮*/
    switchIcon(value?: any) {
        if (value) {
            this.isShowPanel = false;
        }
        this.panelType = this.panelType === 0 ? 1 : 0;
    }

    /**点击回退按钮*/
    backIcon() {
        this.panelType = 1;
    }
    /**点击网络名称跳转*/
    netWorkRoute(value) {
        this.router.navigate(["/network-details/", value.netId, value.netName, "/overview"],
            {skipLocationChange: true });
    }
    /**点击告警个数跳转*/
    apWarnRoute() {
        this.warnDevice = true;
    }
    /**取消订阅*/
    ngOnDestroy(): void {
            this.$businessMonitor.unsubscribe();
            this.$mapPoint.unsubscribe();
            if (this.$top5Flow) {
                this.$top5Flow.unsubscribe();
            }
            if (this.$top5Client) {
                this.$top5Client.unsubscribe();
            }

    }
    /**
     * 页面初始化方法
     * @description
     *      1、调用并获取静态数据
     *      2、调用并获取动态数据
     */
    ngOnInit() {
        this.getStaticData();
        this.getData();
    }

}

