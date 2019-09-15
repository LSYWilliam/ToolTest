import {Component, OnInit, ViewChild} from '@angular/core';
import {routerTransition} from "../../../../animations/route-animations";
import {ApListServer} from "../service/ap-list.server";
import {StaticDataModel} from "../model/static-data.model";
import {RequestArgs} from "../../../../shared/model/request-args";
import {HttpParams} from "@angular/common/http";
import {ApListModalComponent} from "./ap-list-modal/ap-list-modal.component";
import {TableComponent} from "../../../../plugins/component/table/table.component";
import {setApListRow} from "../model/ap-list-modal.model";

/**
 * AP清单
 * @class ApListComponent
 */
@Component
({
    selector: 'app-ap-list',
    templateUrl: './ap-list.component.html',
    styleUrls: ['./ap-list.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})

export class ApListComponent extends ApListServer implements OnInit {
    /** 定义个windowHeight类型 */
    public windowHeight: number;
    public staticData: StaticDataModel = new StaticDataModel();
    public requestArgs: RequestArgs = new RequestArgs();
    /**在父组件中调用table组件*/
    @ViewChild(TableComponent) child: TableComponent;
    /**
     * 获取页面数据方法
     * @description
     *      1、创建统一请求参数
     *      2、设置统一请求参数的系统名称与ticket
     */
    private getData(requestArgs: RequestArgs, netId: string) {
        super.getApCount(requestArgs, netId);
        super.getApList(requestArgs, netId);
    }

    /**
     * 初始化方法
     * @description
     *      获得AP列表数据
     */
    ngOnInit(): void {
        this.windowHeight = window.innerHeight-170;
        this.requestArgs.systemName = 'wlanscope';
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
        if (this.apListModel.dropDowns != null) {
            let netId = this.apListModel.dropDowns[0].id;
            this.getData(this.requestArgs, netId);
        }
    }

    /**
     * 获得网络ID
     * @description
     *      点击下拉条中的某一选项，获得网络ID
     *      网络设备数 AP列表更新
     */
    getDropDown(id: string) {
        this.getData(this.requestArgs, id);
    }
    /** 双击表格的事件
     * @param value any
     *          双击表格行的数据
     */
    cellClickEvent(value) {
        if ( value.colDef.field == 'remark') {
            this.showModalForComponent(value);
        }
    }

    /**
     * 打开单个AP配置的模态框
     * @param apName string
     *              AP的名称
     * @param data  any
     *              整行数据
     */
    showModalForComponent(data: any) {
        const modalConfig = {
            title          : '编辑备注',
            content        : ApListModalComponent,
            onOk() {},
            onCancel() {},
            footer         : false,
            maskClosable : false,
            componentParams: {
                name: data
            }
        };

        const subscription$ = this.modalService.open(modalConfig);
        subscription$.subscribe(result => {
            if (result[0] === 'onOk') {
                this.requestArgs.url = '/api/v1/ap_info/edit-remark';
                const body = new HttpParams().set('apId', result[1]).set('remark', result[2]);
                this.requestArgs.body = body.toString();
                this.http.httpPatch1(this.requestArgs).subscribe( res => {
                    if (res.code === 0) {
                        let rowData = setApListRow( data['data'], res.result);
                        this.child.editRow(rowData);
                    }
                });
            }
        })
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
        switch(value.colDef.field) {
            case 'clientNum':
                if (Number(value.data['clientNum']) > 0 ) {
                    sessionStorage.setItem('onlineDetailsId', value.data['apId']);
                    this.router.navigate(["/online-client-detail/", "ap", value.data['apId'], "/ap-list"],
                        {skipLocationChange: true });
                } else {
                    this.message.warning("没有在线客户端，暂无数据！");
                }
                break;
            case 'apName' :
                super.getApIdJump(value.data['apId'], value.data['apSn']);
                break;
        }

    }
}
