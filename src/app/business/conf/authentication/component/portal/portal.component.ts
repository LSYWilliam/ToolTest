import {Component, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild} from '@angular/core';
import {routerTransition} from "../../../../../animations/route-animations";
import {RequestArgs} from '../../../../../shared/model/request-args';
import {HttpClientService} from "../../../../../shared/service/httpClient.service";
import {NzMessageService, NzModalService, NzModalSubject} from "ng-zorro-antd";
import {TableComponent} from "../../../../../plugins/component/table/table.component";
import { AuthenticationInterface, setPortalRow, setRadiusRow } from "../../model/authentication.model";
import {AuthenticationModalComponent} from "../authentication-modal/authentication-modal.component";
import {ConfirmModalComponent} from "../../../../../shared/component/confirm-modal/confirm-modal.component";

/**
 * 认证计费-portal
 * @class PortalComponent
 */
@Component
({
    selector: 'app-portal',
    templateUrl: './portal.component.html',
    styleUrls: ['./portal.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})

export class PortalComponent implements OnChanges, OnDestroy  {
    /** type类型 */
    @Input() type: boolean;
    /** 表格静态数据 */
    @Input() tableHeader: any;
    /** 模态框名称 */
    public modalTitle: string;
    /** 表格组件 */
    @ViewChild(TableComponent) childPortal: TableComponent;
    /** 表格数据 */
    public tableData: any;
    /** http请求头 */
    public requestArgs: RequestArgs = new RequestArgs();
    /** 查看白名单模态框是否显示 */
    public isViewVisible: boolean;
    /** 白名单名称 */
    public whiteListName: string;
    /** 白名单内容 */
    public whiteListValue: Array <string>;

    private modal$: NzModalSubject;
    /**
     * 构造方法
     * @param http 注入到http
     *      modal 注入到modal
     *      message 注入到message
     * @description
     *      获取到http请求头部参数
     * */
    constructor(private http: HttpClientService, private modal: NzModalService, private message: NzMessageService) {
        this.requestArgs.systemName = "wlanscope";
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
    }

    /**
     * 数据重新绑定时响应
     * @param changes
     * @description
     *      1、判断时候含有属性type
     *      2、type不等于undefined
     *      3、获取数据
     * */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.hasOwnProperty('type')) {
            if (changes['type'].currentValue != undefined) {
                let value = changes['type'].currentValue;
                this.modalTitle = value ? 'Portal服务器': 'Radius服务器';
                this.getTableData();
            }
        }
    }

    /**
     * 展示Portal模态框
     * */
    public addPortal() {
       this.showModalForData(null);
    }

    /**
     * 展示Portal模态框
     * */
    public doubleClick(data: any) {
        this.showModalForData(<AuthenticationInterface> data['data'], data);
    }

    /**
     * 编辑Portal
     * */
    public editPortal() {
        this.childPortal.selectAll();
    }

    /** 表格单击事件
     * @param data
     * @description
     *      1、点击表格
     *      2、判断表头的field的
     *      3、根据field，执行其相应的方法*/
    viewSelect(data) {
        switch (data.colDef.field) {
            case 'view':
                this.isViewVisible = true;
                // console.log(data.data);
                this.whiteListName = data.data.portalName;
                let whiteId = data.data.id;
                this.requestArgs.url = '/api/v1/portal/' + whiteId;
                this.http.httpGet(this.requestArgs).subscribe(
                    res => {
                        if (res.code === 0) {
                            this.whiteListValue = res.result.whiteList;
                        } else {
                            this.whiteListValue = ['白名单为空'];
                        }
                    }
                );
                break;
        }
    }

    /** 关闭模态框 */
    handleViewCancel() {
        this.isViewVisible = false;
    }

    /**
     * 删除Portal
     * */
    public deletePortal() {
        if (this.childPortal.gridApi.getSelectedRows().length === 0) {
            this.message.warning('请选择需要删除的行');
        } else {
            this.showModalForConfirm('确认删除这些数据？');
        }
    }

    /**
     * 用于监听子组件的全选时间
     * */
    selectRow(options: any) {
        const len = options.length;
        if (len <= 0) {
            this.message.warning('请选择一行进行编辑！');
        } else if ( len > 1) {
            this.message.warning('只能对单行进行编辑！');
        } else {
            this.requestArgs.url = '/api/v1/portal/' + options[0]['data'].id;
            this.http.httpGet(this.requestArgs).subscribe(
                res => {
                    if (res.code === 0) {
                        options[0]['data'].whiteList = res.result.whiteList;
                        this.showModalForData(<AuthenticationInterface> options[0]['data'],options[0]);
                    } else {
                        options[0]['data'].whiteList = [];
                        this.showModalForData(<AuthenticationInterface> options[0]['data'],options[0]);
                    }
                }
            );

        }
    }

    /**
     * 打开模态框
     * @param data
     * @param rowNode
     * @description
     *      1、展示模态框
     *      2、根据传入的参数判断添加或编辑
     * */
    showModalForData(data: AuthenticationInterface, rowNode?: any) {
        const modalConfig = {
            title: this.modalTitle,
            content : AuthenticationModalComponent,
            onOk() {},
            onCancel() {},
            footer         : false,
            maskClosable : false,
            componentParams: {
                name: data,
                flag: this.type
            }
        };

        this.modal$ = this.modal.open(modalConfig);
        this.modal$.subscribe(result => {
            let tmp = result.split("|");
            if (tmp.length ===2) {
                switch (tmp[0]) {
                    case 'add':
                        this.childPortal.addRow([JSON.parse(tmp[1])]);
                        break;
                    case 'edit':
                        let data = this.type ? setPortalRow(rowNode.data, JSON.parse(tmp[1])) : setRadiusRow(rowNode.data, JSON.parse(tmp[1]));
                        this.childPortal.editRow(data);
                        break;
                }
            }
        });
    }

    /**
     * 是否删除
     * @param message
     * @description
     *      1、打开提示框
     *      2、判断是否为onOK
     *      3、删除
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

        const subscription$ = this.modal.open(modalConfig);
        subscription$.subscribe(result => {
            if (result === 'onOk') {
                let data = [];
                for (let obj of this.childPortal.gridApi.getSelectedRows()) {
                    data.push(obj['id']);
                }
                this.requestArgs.url = this.type ? '/api/v1/portal' : '/api/v1/radius';
                this.requestArgs.body = { 'idList' : data };
                this.http.httpDelete(this.requestArgs).subscribe(
                    res => {
                        if (res.code === 0) {
                            this.childPortal.singleDelete();
                            this.message.success('删除成功!');
                        } else {
                            this.message.error('删除失败！');
                            this.message.error(res.msg);
                        }
                    }
                );
            }
        });
    }

    /**
     * 提示框
     * */
    public rightEventDel() {
        this.showModalForConfirm('确认删除这些数据？');
    }

    /**
     * 获取表格中选中复选框的数据
     * */
    public rightEventEdit() {
        this.childPortal.selectAll();
    }

    /**
     * 获取表格数据
     * @description
     *      获取Portal数据
     * */
    private getTableData() {
        this.requestArgs.url = this.type ? '/api/v1/portal' : '/api/v1/radius';
        this.http.httpGet(this.requestArgs)
            .subscribe(
                res => {
                    switch (res.code) {
                        case 0:
                            this.tableData = res.result;
                            break;
                        case 9:
                            this.tableData = [];
                            break;
                        default:
                            this.message.error('获取数据失败！');
                            this.message.error(res.msg);
                    }
                });
    }

    ngOnDestroy(): void {
        if (this.modal$ != undefined) {
            this.modal$.destroy();
        }
    }
}
