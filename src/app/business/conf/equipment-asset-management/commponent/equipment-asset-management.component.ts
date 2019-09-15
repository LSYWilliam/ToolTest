import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {routerTransition} from '../../../../animations/route-animations';
import {EquipmentAssetManagementService} from "../service/equipment-asset-management.service";
import {StaticDataModel} from "../model/static-data.model";
import {EquipmentAssetModalComponent} from "./equipment-asset-modal/equipment-asset-modal.component";
import {EquipmentAssetModalInterface} from "../model/equipment-asset-modal.model";
import {UploadModalComponent} from "../../../../shared/component/upload-modal/upload-modal.component";
import {NzModalSubject} from "ng-zorro-antd";
import {ConfirmModalComponent} from "../../../../shared/component/confirm-modal/confirm-modal.component";
import {AssetDetailsModalComponent} from "./asset-details-modal/asset-details-modal.component";
import {RequestArgs} from "../../../../shared/model/request-args";



/**
 * 设备资产管理平台
 * @class OnlineUserListComponent
 */
@Component
({
    selector: 'app-equipment-asset-management',
    templateUrl: './equipment-asset-management.component.html',
    styleUrls: ['./equipment-asset-management.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})

export class EquipmentAssetManagementComponent extends EquipmentAssetManagementService implements OnInit  {
    /**模态框标题*/
    public modalTitle: any;
    public equipmentAseetModal$: NzModalSubject;
    /**查询变量*/
    private assetSn: any;
    private assetMac: any;
    private assetModel: any;
    private businessName: any;
    private assetStatus: any;
    /**表格每页大小*/
    public pageSize: any;
    public current: any;
    /**表格索引值*/
    private pageIndex: any;

    /**排序类型  升序 or 降序*/
    private sortCondition: Array<any> = [];
    private sortFactoryTime: any;
    private sortInstallTime: any;
    private sortAbandonedTime: any;

    /**单元格编辑*/
    private assetName: string;
    /**备注*/
    private remark: string;

    /**导入模态框*/
    public newUploadModalModal$: NzModalSubject;
    /**废弃模态框*/
    public abandonedConfirmModal$: NzModalSubject;
    /**详情模态框*/
    public detailsModal$: NzModalSubject;
    /**导入模态框*/
    public uploadModal$: NzModalSubject;
    /**表格静态数据 实体类*/
    public staticDataModel: StaticDataModel = new StaticDataModel();

    /**设备资产管理平台表格 静态数据 实体类*/
    tableOperateEvent(value) {
        switch(value[1].name) {
            case '废弃':
                this.showModalForConfirm('是否废弃该设备?', value[0].assetId);
                break;
            case '详情':
                this.getDetailsData(value[0].assetSn, 0,5).subscribe( res => {
                    if (res.code === 0) {
                        if (res.result.content.length) {
                            this.showNetworkDetailsModalForData([res, value[0].assetSn]);
                        } else {
                            this.showNetworkDetailsModalForData([null, value[0].assetSn]);
                        }
                    }
                });
                break;
        }
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
        this.detailsModal$ = this.modal.open(modalConfig);
        this.detailsModal$.subscribe(result => {
        })
    }

    /**显示废弃模态框*/
    showModalForConfirm(message: string, assetId?: any) {
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

        this.abandonedConfirmModal$ = this.modal.open(modalConfig);
        this.abandonedConfirmModal$.subscribe(result => {
            if (result === 'onOk') {
                this.abandonedAsset(assetId).subscribe( res => {
                    if (res.code === 0) {
                        this.getEquipmentAssetListData(this.pageIndex, this.pageSize, this.assetStatus, this.sortCondition, this.businessName, this.assetSn, this.assetMac, this.assetModel);
                    } else {
                        this.message.error(res.msg);
                    }
                });
            }
        })
    }

    /**批量导入*/
    batchImport() {
        let requestArgs: RequestArgs = new RequestArgs();
        requestArgs.systemName = 'wlanscope';
        requestArgs.url = '/api/asset/import';

        const obj = {
            header: this.requestArgs.header,
            url: this.http.getUrl(requestArgs),
            isMulImport: true,
            title:'上传文件'
        };
        // const obj = {
        //     header: {'ticket': sessionStorage.getItem('ticket')},
        //     url: "/api/asset/import",
        //     isMulImport: true,
        //     title:'上传文件'
        // };

        this.showUploadModal(obj);
    }
    /**显示导入组件模态框
     *      1. obj  是传递给导入组件的数据
     *      2. 导入文件成功后 点击导入组件模态框按钮会刷新表格
     * */
    showUploadModal(obj: any) {
        const modalConfig = {
            content        : UploadModalComponent,
            onOk() {},
            onCancel() {},
            footer         : false,
            maskClosable : false,
            componentParams: {
                value: obj
            }
        };

        this.newUploadModalModal$ = this.modal.open(modalConfig);
        this.newUploadModalModal$.subscribe(result => {
            if (result[0] === 'onOk') {
                this.showModalForUploadConfirm(result);
            } else if (result[0] === 'onCancel') {
                this.showModalForUploadConfirm(result);
            }

        })
    }

    /**显示导入 确认 模态框*/
    showModalForUploadConfirm(message: any) {
        const modalConfig = {
            content        : ConfirmModalComponent,
            onOk() {},
            onCancel() {},
            footer         : false,
            maskClosable : false,
            componentParams: {
                name: message[1]
            }
        };

        this.uploadModal$ = this.modal.open(modalConfig);
        this.uploadModal$.subscribe(result => {
            if (message[0] === 'onOk') {
                this.current = 1;
                this.getData();
            }
        })
    }

    /**点击模板下载按钮事件*/
    templateDownLoad() {
        this.requestArgs.url = '/api/asset/download';
        this.requestArgs.responseType = "blob";
        this.template();
    }
    /**模板下载*/
    template() {
        this.http.httpPost3(this.requestArgs).subscribe(
            res => {
                let blob = new Blob([res], {type: "application/vnd.ms-excel"});
                let objectUrl = URL.createObjectURL(blob);
                let a = this.document.createElement('a');
                this.document.body.appendChild(a);
                a.setAttribute('style', 'display:none');
                a.setAttribute('href', objectUrl);
                let filename = "设备资产.xlsx";
                a.setAttribute('download', filename);
                a.click();
                URL.revokeObjectURL(objectUrl);
            }
        )
    }
    /**搜索事件*/
    searchEvent(value) {
        switch(value[0]) {
            case 'assetSn':
                this.assetSn = value[1];
                break;
            case 'assetMac':
                this.assetMac = value[1];
                break;
            case 'assetModel':
                this.assetModel = value[1];
                break;
            case 'businessName':
                this.businessName = value[1];
                break;
        }
        this.pageIndex = 0;
        this.getEquipmentAssetListData(this.pageIndex, this.pageSize, this.assetStatus, this.sortCondition, this.businessName, this.assetSn, this.assetMac, this.assetModel);
    }
    /**过滤事件*/
    filterEvent(value) {
        const arr = [];
        if (value.length) {
            value.forEach( item => arr.push(item.id));
        }
        this.assetStatus = arr;
        this.pageIndex = 0;
        this.getEquipmentAssetListData(this.pageIndex, this.pageSize, this.assetStatus, this.sortCondition, this.businessName, this.assetSn, this.assetMac, this.assetModel);
    }
    /**重置事件*/
    resetEvent() {
        this.assetStatus = null;
        this.pageIndex = 0;
        this.getEquipmentAssetListData(this.pageIndex, this.pageSize, this.assetStatus, this.sortCondition, this.businessName, this.assetSn, this.assetMac, this.assetModel);
    }
    /**排序事件*/
    sortEvent(value) {
        // const str = value[0] === 'descend' ? 'desc': 'asc';
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
            case 'factoryTime':
                // this.sortFactoryTime = str+ ","+ value[1];
                this.sortFactoryTime = str ? str+ ","+ value[1] : undefined;
                break;
            case 'installTime':
                // this.sortInstallTime = str+ ","+ value[1];
                this.sortInstallTime = str ? str+ ","+ value[1] : undefined;
                break;
            case 'abandonedTime':
                // this.sortAbandonedTime = str+ ","+ value[1];
                this.sortAbandonedTime = str ? str+ ","+ value[1] : undefined;
                break;
        }
        this.sortCondition = [this.sortFactoryTime, this.sortInstallTime, this.sortAbandonedTime];

        const arr = this.sortCondition.filter( item =>  item !== undefined);
        this.sortCondition = arr.length ? this.sortCondition : null;
        this.getEquipmentAssetListData(this.pageIndex, this.pageSize, this.assetStatus, this.sortCondition, this.businessName, this.assetSn, this.assetMac, this.assetModel);
    }
    /**表格索引值大小改变的事件*/
    pageIndexEvent(value) {
        this.current = value;
        this.pageIndex = --value;
        this.getEquipmentAssetListData(this.pageIndex, this.pageSize, this.assetStatus, this.sortCondition, this.businessName, this.assetSn, this.assetMac, this.assetModel);
    }
    /**单元格编辑事件*/
    cellEditEvent(value) {
        value[2] === 'assetName' ? this.assetName = value[1] : this.remark = value[1];
        this.cellEditInterface(value[0].assetId, this.assetName, this.remark );
    }
    /**新增*/
    create() {
        this.modalTitle = '新增设备';
        this.showModalForData(null);
    }
    /**显示新增或者编辑模态框
     *      1.data 是传递给模态框的初始化数据
     *      2.rowNode 编辑模态框的时候，获取编辑那一行的数据
     * */
    showModalForData(data: EquipmentAssetModalInterface) {
        const modalConfig = {
            title: this.modalTitle,
            content : EquipmentAssetModalComponent,
            onOk() {},
            onCancel() {},
            footer         : false,
            maskClosable : false,
            componentParams: {
                name: data
            }
        };
        this.equipmentAseetModal$ = this.modal.open(modalConfig);
        this.equipmentAseetModal$.subscribe(result => {
            if (result[0] === 'add') {
                this.addAsset(result[1]).subscribe( res => {
                    if (res.code === 0) {
                        this.getEquipmentAssetListData(this.pageIndex, this.pageSize, this.assetStatus, this.sortCondition, this.businessName, this.assetSn, this.assetMac, this.assetModel);
                    }  else {
                        this.message.error(res.msg);
                    }
                })
            }
        }
        )
    }
    /**初始化数据*/
    getData() {
        this.current = 1;
        this.pageIndex = 0;
        this.pageSize = 10;
        this.assetSn = '';
        this.assetMac = '';
        this.assetModel = '';
        this.businessName = '';
        this.assetStatus = null;
        this.sortCondition = null;
        this.businessName = '';
        this.getEquipmentAssetListData(this.pageIndex, this.pageSize, this.assetStatus, this.sortCondition, this.businessName, this.assetSn, this.assetMac, this.assetModel);
    }
    /**
     * 销毁组件或指令
     * */
    ngOnDestroy(): void {
        if (this.equipmentAseetModal$ !== undefined) {
            this.equipmentAseetModal$.destroy();
        }
        if (this.newUploadModalModal$ !== undefined) {
            this.newUploadModalModal$.destroy();
        }
        if (this.uploadModal$ !== undefined) {
            this.uploadModal$.destroy();
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
