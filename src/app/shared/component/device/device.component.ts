import {Component, Inject, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NzMessageService, NzModalService, NzModalSubject} from "ng-zorro-antd";
import {HttpClientService} from "../../service/httpClient.service";
import {TableComponent} from "../../../plugins/component/table/table.component";
import {ConfirmModalComponent} from "../confirm-modal/confirm-modal.component";
import {DeviceModalInterface, setDeviceRow, setPlatFormRow} from "./model/device-modal.model";
import {RequestArgs} from "../../model/request-args";
import {PlantAssetModalComponent} from "./plant-asset-modal/plant-asset-modal.component";
import {DOCUMENT} from "@angular/common";
import {Router} from "@angular/router";
import {UploadModalComponent} from "../upload-modal/upload-modal.component";


@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit, OnDestroy {
    /** 定义个windowHeight类型 */
    public windowHeight: number;
    /**模态框标题*/
    public modalTitle: any;
    /**所有设备数量*/
    @Input() public allDeviceSum: any;
    /**使用设备数量*/
    @Input() public useDeviceSum: any;
    /** true 设备资产管理平台 false 设备管理*/
    @Input() public type: boolean;
    /**表格头部数据*/
    @Input() public tableHeaderData: any;
    /**组件输入表格行数据*/
    @Input() public tableRowData: any;
    /**组件输入商家Id*/
    @Input() public businessId: any;
    /**组件输入商家列表数据*/
    @Input() public businessList: any;
    /**是点击了编辑还是点击了新增 0 新增 1 编辑*/
    public operate: number;
    /**http请求*/
    public requestArgs: RequestArgs = new RequestArgs();
    /**父组件引入table组件*/
    @ViewChild(TableComponent) child: TableComponent;

    /** 新建设备列表的模态框 */
    private newDeviceListModal$: NzModalSubject;
    /** 新建删除的模态框 */
    private newConfirmModalModal$: NzModalSubject;
    /** 新建导入的模态框 */
    private newUploadModalModal$: NzModalSubject;

    /**constructor构造函数
     *      1. http: 定义的服务请求
     *      2. modal; 佐罗自带的模态框服务
     *      3. document: 在angular中使用document
     *      4. router: 路由
     * */
    constructor(private http: HttpClientService, private modal: NzModalService,
                private message: NzMessageService,@Inject(DOCUMENT) private document: any,private router: Router) {
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
    }
    /**添加设备*/
    insertDevice() {
        this.modalTitle = '新增设备';
        this.operate = 0;
        this.showModalForData(null);
    }
    /**编辑设备*/
    editDevice() {
        this.modalTitle = '编辑设备';
        this.operate = 1;
        this.child.selectAll();
    }
    /**删除设备*/
    deleteDevice() {
        if (this.child.gridApi.getSelectedRows().length === 0) {
            this.message.warning('请选择需要删除的行');
        } else {
            this.showModalForConfirm('确认删除这些数据？');
        }
    }
    /**导入组件*/
    uploadComponent() {
        let requestArgs: RequestArgs = new RequestArgs();
        requestArgs.systemName = 'wlanscope';
        requestArgs.url = '/api/v1/ap_info/import_ap_info';

        const obj = {
            header: this.requestArgs.header,
            url: this.http.getUrl(requestArgs),
            isMulImport: true,
            title:'上传文件'
        };

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
            if (result === 'onOk') {
                if (this.type) {
                    this.getApUseInfo();
                    this.getTableData();
                } else {
                    this.getDeviceManagementTableData(this.businessId);
                }
            }
        })
    }
    /**用于监听子组件的全选时间*/
    selectRow(options: any) {
        const len = options.length;
        if (len <= 0) {
            this.message.warning('请选择一行进行编辑！');
        } else if ( len > 1) {
            this.message.warning('只能对单行进行编辑！');
        } else {
            this.showModalForData(<DeviceModalInterface> options[0]['data'],options[0]);
        }
    }
    /**显示设备管理组件模态框
     *      1. data  是传递给设备管理模态框组件的数据
     *      2.type 布尔值  true 设备资产管理平台 false 设备管理
     *      3.operate 判断是新增 or 编辑(0 新增 1 编辑)
     * */
    showModalForData(data: DeviceModalInterface, rowNode?: any) {
        const modalConfig = {
            title: this.modalTitle,
            content : PlantAssetModalComponent,
            onOk() {},
            onCancel() {},
            footer         : false,
            maskClosable : false,
            componentParams: {
                operate: this.operate,
                name: data,
                flag: this.type,
                business: this.businessList,
                busiId: this.businessId
            }
        };

        this.newDeviceListModal$ = this.modal.open(modalConfig);
        this.newDeviceListModal$.subscribe(result => {
            let tmp = result.split("|");
            if (tmp.length ===2) {
                switch (tmp[0]) {
                    case 'add':
                        this.child.addRow([JSON.parse(tmp[1])]);
                        this.allDeviceSum = this.allDeviceSum + 1;
                        break;
                    case 'edit':
                        let data = this.type ?  setPlatFormRow(rowNode.data, JSON.parse(tmp[1])) : setDeviceRow(rowNode.data, JSON.parse(tmp[1]));
                        this.child.editRow(data);
                        break;
                }
            }
        })
    }
    /**显示删除组件模态框
     *      1. message  是传递给设备管理模态框组件的数据
     * */
    showModalForConfirm(message: string) {
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

        this.newConfirmModalModal$ = this.modal.open(modalConfig);
        this.newConfirmModalModal$.subscribe(result => {
            if (result === 'onOk') {
                let data = [];
                for (let obj of this.child.gridApi.getSelectedRows()) {
                    data.push(obj['apId']);
                }
                this.requestArgs.systemName = "wlanscope";
                this.requestArgs.url = '/api/v1/ap_info/delete_batch';
                this.requestArgs.body = data;
                this.http.httpPost(this.requestArgs).subscribe(
                    res => {
                        switch (res.code) {
                            case 0 :
                                this.allDeviceSum = this.allDeviceSum - this.child.gridApi.getSelectedRows().length;
                                this.child.singleDelete();
                                break;
                            case 1103:
                                this.message.error('令牌无效！返回登录页面');
                                this.router.navigateByUrl('login');
                                break;
                            default:
                                this.message.error('数据删除失败！');
                                this.message.error(res.msg);
                                break;
                        }
                    }
                );
            }
        })
    }
    /**右键删除*/
    public rightEventDel() {
        this.showModalForConfirm('确认删除这些数据？');
    }
    /**右键编辑*/
    public rightEventEdit() {
        this.child.selectAll();
    }
    /**双击table表格*/
    // public doubleClick(data: any) {
    //     this.modalTitle = '编辑设备';
    //     this.operate = 1;
    //     this.showModalForData(<DeviceModalInterface> data['data'], data);
    // }
    /**点击模板下载按钮事件*/
    templateDownload() {
        this.requestArgs.systemName = "system";
        this.requestArgs.url = '/ewifi/system/console/ap_resource/export_ap_edit_mode_excel_by_wlanscope';
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
    /**设备管理表格数据*/
    getDeviceManagementTableData(businessId) {
        this.requestArgs.systemName = 'wlanscope';
        this.requestArgs.url = "/api/v1/ap_info/"+businessId+"/list";
        this.http.httpGet(this.requestArgs)
            .subscribe(
                res => {
                    switch (res.code) {
                        case 0 :
                            this.allDeviceSum = res.result.length;
                            this.tableRowData = res.result;
                            break;
                        case 1103:
                            this.message.error('令牌无效！返回登录页面');
                            this.router.navigateByUrl('login');
                            break;
                        default:
                            this.message.error(res.msg);
                            break;
                    }
                });
    }
    /**资产管理平台表格数据*/
    getTableData() {
        this.requestArgs.systemName = 'wlanscope';
        this.requestArgs.url = '/api/v1/ap_info';
        this.http.httpGet(this.requestArgs).subscribe(
            res => {
                switch (res.code) {
                    case 0 :
                        this.tableRowData = res.result;
                        break;
                    case 1103:
                        this.message.error('令牌无效！返回登录页面');
                        this.router.navigateByUrl('login');
                        break;
                    default:
                        this.message.error(res.msg);
                        break;
                }
            }
        )
    }
    /**获取Ap使用情况以及申购情况*/
    getApUseInfo() {
        this.requestArgs.systemName = 'wlanscope';
        this.requestArgs.url = '/api/v1/ap_info/use_info';
        this.http.httpGet(this.requestArgs).subscribe(
            res => {
                switch (res.code) {
                    case 0 :
                        this.allDeviceSum = res.result['deviceNum'];
                        this.useDeviceSum = res.result['useDeviceNum'];
                        break;
                    case 1103:
                        this.message.error('令牌无效！返回登录页面');
                        this.router.navigateByUrl('login');
                        break;
                    default:
                        this.message.error(res.msg);
                        break;
                }
            }
        )
    }
    /**
     * 销毁组件或指令
     * */
    ngOnDestroy(): void {
        if (this.newDeviceListModal$ !== undefined) {
            this.newDeviceListModal$.destroy();
        }
        if (this.newConfirmModalModal$ !== undefined) {
            this.newConfirmModalModal$.destroy();
        }
        if (this.newUploadModalModal$ !== undefined) {
            this.newUploadModalModal$.destroy();
        }
    }
    /**页面数据初始化*/
    ngOnInit() {
        this.windowHeight = window.innerHeight-200;
    }

}
