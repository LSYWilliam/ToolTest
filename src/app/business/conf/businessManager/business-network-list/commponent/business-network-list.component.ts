import {Component, OnInit, ViewChild} from '@angular/core';
import {routerTransition} from '../../../../../animations/route-animations';
import {BusinessNetworkListService} from "../service/business-network-list.service";
import {StaticDataModel} from "../model/static-data.model";
import {BusinessNetListModalInterface} from "../model/businessNetListModal.model";
import {BusinessListModalComponent} from "./business-list-modal/business-list-modal.component";
import {NzModalSubject} from "ng-zorro-antd";
import {ZorroPageTableComponent} from "../../../../../plugins/component/zorro-page-table/zorro-page-table.component";
import {AssetDetailsModalComponent} from "./asset-details-modal/asset-details-modal.component";
import {ConfirmModalComponent} from "../../../../../shared/component/confirm-modal/confirm-modal.component";
import {RequestArgs} from "../../../../../shared/model/request-args";


/**
 * 设备资产管理平台
 * @class OnlineUserListComponent
 */
@Component
({
    selector: 'app-business-network-list',
    templateUrl: './business-network-list.component.html',
    styleUrls: ['./business-network-list.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})

export class BusinessNetworkListComponent extends BusinessNetworkListService implements OnInit  {
    /**传递给three-link组件的 省*/
    public provinceLink:any;
    /**传递给three-link组件的 市*/
    public cityLink:any;
    /**传递给three-link组件的 区*/
    public areaLink:any;
    /**获取全国全部的省市区*/
    public threeLinkData: any;
    /**查询的 省*/
    public province: any;
    /**查询的 市*/
    public city: any;
    /**查询的 区*/
    public county: any;
    /**查询的 企业名称*/
    private businessName: any;
    /**查询的 网络名陈*/
    private netName: any;
    /**排序*/
    private sortCondition: any;
    private businessNameTime: any;
    /**模态框标题*/
    public modalTitle: any;

    /**每页大小*/
    public pageSize: number;
    /**表格索引值*/
    private pageIndex: number;

    /**操作类型  add 0 , edit 1, del 2 */
    private operate: any;
    /** 新建新增 or 编辑的模态框 */
    private modal$: NzModalSubject;
    /** 新建删除的模态框 */
    private newConfirmModal$: NzModalSubject;
    /**表格静态数据 实体类*/
    public staticDataModel: StaticDataModel = new StaticDataModel();
    /**在商户列表组件中引入table组件*/
    @ViewChild(ZorroPageTableComponent) child: ZorroPageTableComponent;
    /**网络列表表格 静态数据 实体类*/
    tableOperateEvent(value) {
        switch (value[1].name) {
            case '点击配置':
                this.route.navigate(["/ssid-details-copy/", value[0].netId],
                    {skipLocationChange: true });
                break;
        }
    }
    /**网络列表表格 静态数据 实体类*/
    clickRouteEvent(value) {
        switch (value[0].field) {
            case 'assetsDesc':
                this.getAssetDescData(value[1].netId, 0, 5).subscribe( res => {
                    console.log(res);
                    if (res.code === 0 || res.code === 9) {
                        this.showNetworkDetailsModalForData([res, value[1].netId]);
                    } else {
                        this.showNetworkDetailsModalForData([null, value[1].netId]);
                    }
                });
                break;
        }
    }
    /**选中某一行的数据*/
    // selectAllEvent(options) {
    //     const len = options.length;
    //     if (len <= 0) {
    //         this.message.warning('请选择一行进行编辑！');
    //     } else if ( len > 1) {
    //         this.message.warning('只能对单行进行编辑！');
    //     } else {
    //         if (this.operate == 1) {
    //             this.showModalForData(options[0]);
    //         } else if (this.operate == 2) {
    //             this.showModalForConfirm('确认删除这些数据？', options[0]);
    //         }
    //     }
    // }

    selectAllEvent(options) {
        const len = options.length;
        if (this.operate == 1) {
            if (len <= 0) {
                this.message.warning('请选择一行进行编辑！');
            } else if ( len > 1) {
                this.message.warning('只能对单行进行编辑！');
            } else {
                this.showModalForData(options[0]);
            }
        } else if (this.operate == 2) {
            let delArr = [];
            options.forEach( item => delArr.push(item.netId));
            this.showModalForConfirm('确认删除这些数据？', delArr);
        }
    }
    /**新增*/
    create() {
        this.modalTitle = '创建网络';
        this.showModalForData(null);
    }
    /**编辑*/
    edit() {
        this.modalTitle = '编辑网络';
        this.operate = 1;
        this.child.selectedData();
    }
    /**删除*/
    delete() {
        this.operate = 2;
        this.child.selectedData();
    }
    /**显示删除模态框*/
    showModalForConfirm(message: string, data) {
        const modalConfig = {
            content        : ConfirmModalComponent,
            onOk() {},
            onCancel() {},
            footer         : false,
            maskClosable : false,
            componentParams: {
                name: message
            }
        };

        this.newConfirmModal$ = this.modal.open(modalConfig);
        this.newConfirmModal$.subscribe(result => {
            if (result === 'onOk') {
                this.delAssetListData(data).subscribe( res => {
                    console.log(res);
                    if (res.code === 0) {
                        this.getWorkListData(this.province,this.city,this.county,this.businessName,this.netName, this.pageIndex, this.pageSize, this.sortCondition);
                    } else {
                        this.message.error(res.msg);
                    }
                });
            }
        })
    }
    /**显示新增或者编辑模态框
     *      1.data 是传递给模态框的初始化数据
     *      2.rowNode 编辑模态框的时候，获取编辑那一行的数据
     * */
    showModalForData(data: BusinessNetListModalInterface) {
        const modalConfig = {
            title: this.modalTitle,
            content : BusinessListModalComponent,
            onOk() {},
            onCancel() {},
            footer         : false,
            maskClosable : false,
            componentParams: {
                name: data,
                businessList: this.businessList,
                apModelList: this.apModelList
            }
        };
        this.modal$ = this.modal.open(modalConfig);
        this.modal$.subscribe(result => {
            switch (result[0]) {
                case 'add':
                    this.addData(result[1]);
                    break;
                case 'edit':
                    this.editData(result[1]);
                    break;
            }
        })
    }
    /**新增网络数据*/
    private addData(body) {
        // this.requestArgs.url = "/api/v1/net_info/add_net";
        // console.log(body);
        // this.requestArgs.body = body;
        // console.log(this.requestArgs.body);
        const requestArgs: RequestArgs = new RequestArgs();
        requestArgs.systemName = "wlanscope";
        requestArgs.url = '/api/v1/net_info/add_net';
        requestArgs.body = body;
        requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
        this.http.httpPost(requestArgs).subscribe( res => {
            if ( res.code === 0) {
                this.getWorkListData(this.province,this.city,this.county,this.businessName,this.netName, this.pageIndex, this.pageSize, this.sortCondition);
            } else {
                this.message.error(res.msg);
            }
        });
    }
    /**编辑网络数据*/
    private editData(body) {
        // this.requestArgs.url = "/api/v1/net_info/update_net";
        // console.log(body);
        // this.requestArgs.body = body;

        const requestArgs: RequestArgs = new RequestArgs();
        requestArgs.systemName = "wlanscope";
        requestArgs.url = '/api/v1/net_info/update_net';
        requestArgs.body = body;
        requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
        console.log(requestArgs);
        this.http.httpPost(requestArgs).subscribe( res => {
            if ( res.code === 0) {
                this.getWorkListData(this.province,this.city,this.county,this.businessName,this.netName, this.pageIndex, this.pageSize, this.sortCondition);
            } else {
                this.message.error(res.msg);
            }
        });
    }
    /**显示网络详情模态框
     *      1.data 是传递给模态框的初始化数据
     * */
    showNetworkDetailsModalForData(data: any) {
        const modalConfig = {
            title: this.modalTitle,
            content : AssetDetailsModalComponent,
            onOk() {},
            onCancel() {},
            footer         : false,
            maskClosable : false,
            componentParams: {
                name: data
            }
        };
        this.modal$ = this.modal.open(modalConfig);
        this.modal$.subscribe(result => {
        })
    }
    /**省市区数据*/
    outData(value){
        const value1 = JSON.parse(value);
        this.province = value1.hasOwnProperty('_province') ? value1._province.name : '';
        this.city = this.province && value1.hasOwnProperty('_city') && value1._city? value1._city.name : '';
        this.county = this.city && value1.hasOwnProperty('_area') && value1._area? value1._area.name : '';

    }
    /**点击查询按钮*/
    inquire() {
        this.getWorkListData(this.province,this.city,this.county,this.businessName,this.netName, this.pageIndex, this.pageSize, this.sortCondition);
    }
    /**三级联动数据*/
    private getThreeLinkData() {
        const requestArgs: RequestArgs = new RequestArgs();
        requestArgs.systemName = "test";
        requestArgs.url = "assets/data/mock-data/area.json";
        this.http.httpGet(requestArgs).subscribe(res => {
            this.threeLinkData = res;
        });
    }
    /**表格索引值大小改变的事件*/
    pageIndexEvent(value) {
        this.pageIndex = --value;
        this.getWorkListData(this.province,this.city,this.county,this.businessName,this.netName, this.pageIndex, this.pageSize, this.sortCondition);
    }
    /**搜索事件*/
    searchEvent(value) {
        switch(value[0]) {
            case 'businessName':
                this.businessName = value[1];
                break;
            case 'netName':
                this.netName = value[1];
                break;
        }
        this.getWorkListData(this.province,this.city,this.county,this.businessName,this.netName, this.pageIndex, this.pageSize, this.sortCondition);
    }
    /**排序事件*/
    sortEvent(value) {
        let str;
        switch(value[0]) {
            case 'descend':
                str = 'desc';
                break;
            case 'ascend':
                str = 'asc';
                break;
        }
        switch(value[1]) {
            case 'businessName':
                this.businessNameTime = str ? str+ ","+ value[1] : undefined;
                break;
        }
        this.sortCondition = [this.businessNameTime];

        const arr = this.sortCondition.filter( item =>  item !== undefined);
        this.sortCondition = arr.length ? this.sortCondition : null;

        this.getWorkListData(this.province,this.city,this.county,this.businessName,this.netName, this.pageIndex, this.pageSize, this.sortCondition);
    }
    getData() {
        this.province = '';
        this.city = '';
        this.county = '';
        this.businessName = '';
        this.netName = '';
        this.province = '';
        this.pageIndex = 0;
        this.pageSize = 10;
        this.sortCondition = null;

        this.getThreeLinkData();
        this.getBusinessTableData();
        this.getDeviceModelListData();
        this.getWorkListData(this.province,this.city,this.county,this.businessName,this.netName, this.pageIndex, this.pageSize, this.sortCondition);
    }
    /**
     * 销毁组件或指令
     * */
    ngOnDestroy(): void {
        if (this.modal$ !== undefined) {
            this.modal$.destroy();
        }
        if (this.newConfirmModal$ !== undefined) {
            this.newConfirmModal$.destroy();
        }
    }

    /**
     * 页面数据初始化
     *      1.getApUseInfo() 获取表格右上角设备使用情况
     *      2.getTableData() 获取设备资产管理平台table表格数据
     * */
    ngOnInit() {
        this.getData();
    }
}
