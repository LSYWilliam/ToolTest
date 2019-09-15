import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../../../animations/route-animations';
import { NetworkOverviewService } from '../service/network-overview.service';
import { NetworkListModel } from '../model/network-list.model';
import { RequestArgs } from '../../../shared/model/request-args';

/**
 * 全网-监控器-网络概览
 * @class NetworkOverviewComponent
 */
@Component
({
    selector: 'app-network-overview',
    templateUrl: './network-overview.component.html',
    styleUrls: ['./network-overview.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})

export class NetworkOverviewComponent extends NetworkOverviewService implements OnInit  {
    /** 定义个windowHeight类型 */
    public windowHeight: number;
    /** 定义个NetworkListModel类型 */
    public networkListModel: NetworkListModel = new NetworkListModel();
    /** 组件Type */
    public netVersionType: string;

    /**
     * 获取页面静态数据的方法
     * @description
     *      1、需要设置各个tips的内容
     */

    private getNetworkList() {
        this.networkListModel.networkOverview = '展示企业当前在用网络数、在用设备数、当前在线客户端数、今日总转发流量情况';
        this.networkListModel.focusWeb = '重点网络为重点系数最高的三个网络，重点系数=今日累计转发流量*40%+当前在线客户端*40%+今日AP告警数*20%';
        this.networkListModel.netList = '展示当前企业所有下属网络';
    }

    /**
     * 点击关注网络
     * @description
     *      1、获取netId
     *      2、跳转到网络详情
     */
    public getJumpRoute(option) {
        if (option.netId === null ||
            option.netId === '' ||
            option.netId === undefined) {
            this.message.warning("没有在用设备，暂无AP！");
        } else {
            this.router.navigate(["/network-details/", option.netId, option.netName, "/network-overview"],
                {skipLocationChange: true });
        }
    }

    /**
     * 点击表格跳转
     * @description
     *      1、获取netId
     *      2、跳转到网络详情
     */
    public cellClickJump(data) {
        switch(data.colDef.field) {
            case 'netName' :
                if (Number(data.data['onlineDevice']) > 0) {
                    sessionStorage.setItem('networkDetailsId', data.data['netId']);
                    // 暂时注释
                    // this.router.navigate(["/network-details/", data.data.netId, data.data.netName, "/network-overview"],
                    //     {skipLocationChange: true });
                    break;
                } else {
                    this.message.warning("没有在用设备，暂无AP！");
                }
                break;
            case 'currentClient':
                if (Number(data.data['currentClient']) > 0 ) {
                    sessionStorage.setItem('onlineDetailsId', data.data['netId']);
                    this.router.navigate(["/online-client-detail/", "net", data.data.netId, "/network-overview"],
                        {skipLocationChange: true });
                    break;
                } else {
                    this.message.warning("没有在线客户端，暂无数据！");
                }
                break;
        }
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

        super.getNetworkOverviewInfo(requestArgs);
        super.getFocusWeb(requestArgs);
        super.getNetWorkList(requestArgs);
    }

    /**
     * 页面初始化方法
     * @description
     *      1、调用并获取静态数据
     *      2、调用并获取动态数据
     */
    ngOnInit() {
        this.windowHeight = window.innerHeight-380;
        this.netVersionType = '关注网络';
        this.getNetworkList();
        this.getData();
    }

}
