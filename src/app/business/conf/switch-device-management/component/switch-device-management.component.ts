import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {routerTransition} from '../../../../animations/route-animations';
import {SwitchDeviceManagementService} from "../service/switch-device-management.service";
import {StaticDataModel} from "../model/static-data.model";
import {TableComponent} from "../../../../plugins/component/table/table.component";
import {ConfirmModalComponent} from "../../../../shared/component/confirm-modal/confirm-modal.component";
import {NzModalSubject} from "ng-zorro-antd";
import {setSwitchRowData, SwitchModalInterface} from "../model/switch-modal.model";
import {SwitchDeviceModalComponent} from "./switch-modal/switch-device-modal.component";

/**
 * 交换机设备管理平台
 * @class SwitchDeviceManagementComponent
 */
@Component
({
    selector: 'app-switch-device-asset-management',
    templateUrl: './switch-device-management.component.html',
    styleUrls: ['./switch-device-management.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})

export class SwitchDeviceManagementComponent extends SwitchDeviceManagementService implements OnInit, OnDestroy {
    /** 定义个windowHeight类型 */
    public windowHeight: number;
    /**表格静态数据 实体类*/
    public staticDataModel: StaticDataModel = new StaticDataModel();
    /**在商户列表组件中引入table组件*/
    @ViewChild(TableComponent) child: TableComponent;
    /**模态框标题*/
    public modalTitle: any;
    /** 新建商家列表的模态框 */
    private newBusinessListModal$: NzModalSubject;
    /** 新建删除的模态框 */
    private newConfirmModalModal$: NzModalSubject;

    /**
     * 点击商家下拉框
     * */
    getDropDownBusiId(value) {
        this.businessId = value;
        this.businessList.forEach(res => {
            if (res.id === value) {
                this.defaultBusiName = res.name;
            }
        });
        this.getSwitchList();
    }

    /**新增事件*/
    create() {
        this.modalTitle = '创建交换机';
        this.showModalForData(null);
    }

    /**删除事件*/
    delete() {
        if (this.child.gridApi.getSelectedRows().length === 0) {
            this.message.warning('请选择需要删除的行');
        } else {
            this.showModalForConfirm('确认删除这些数据？');
        }
    }

    /**显示新增或者编辑模态框
     *      1.data 是传递给模态框的初始化数据
     *      2.rowNode 编辑模态框的时候，获取编辑那一行的数据
     * */
    showModalForData(data: SwitchModalInterface, rowNode?: any) {
        const modalConfig = {
            title: this.modalTitle,
            content: SwitchDeviceModalComponent,
            onOk() {
            },
            onCancel() {
            },
            footer: false,
            maskClosable: false,
            componentParams: {
                name: data,
                business: this.businessList,
                defaultBusinessName: data ? null : this.defaultBusiName
            }
        };
        this.newBusinessListModal$ = this.modal.open(modalConfig);
        this.newBusinessListModal$.subscribe(result => {
            if (result.length === 2) {
                switch (result[0]) {
                    case 'add':
                        this.child.addRow([JSON.parse(result[1])]);
                        this.useDeviceSum++;
                        this.deviceSum++;
                        break;
                    case 'edit':
                        let p_data = setSwitchRowData(rowNode.data, JSON.parse(result[1]));
                        this.child.editRow(p_data);
                        break;
                }
            }
        });
    }

    /**显示删除模态框*/
    showModalForConfirm(message: string) {
        const modalConfig = {
            content: ConfirmModalComponent,
            onOk() {
            },
            onCancel() {
            },
            footer: false,
            maskClosable: false,
            componentParams: {
                name: message
            }
        };

        this.newConfirmModalModal$ = this.modal.open(modalConfig);
        this.newConfirmModalModal$.subscribe(result => {
            if (result === 'onOk') {
                let data = [];
                for (let obj of this.child.gridApi.getSelectedRows()) {
                    data.push(obj['switchId']);
                }
                this.requestArgs.systemName = 'wlanscope';
                this.requestArgs.url = '/api/v1/switch_info/delete_batch';
                this.requestArgs.body = data;
                this.http.httpPost(this.requestArgs).subscribe(
                    res => {
                        switch (res.code) {
                            case 0 :
                                this.child.singleDelete();
                                this.deviceSum -= data.length;
                                this.useDeviceSum = ( this.useDeviceSum - data.length ) > 0?this.useDeviceSum - data.length :0;
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
        });
    }

    /**用于监听子组件的全选*/
    selectRow(options: any) {
        console.log(options);
        const len = options.length;
        if (len <= 0) {
            this.message.warning('请选择一行进行编辑！');
        } else if (len > 1) {
            this.message.warning('只能对单行进行编辑！');
        } else {
            this.showModalForData(<SwitchModalInterface> options[0]['data'], options[0]);
        }
    }

    /**编辑事件*/
    edit() {
        this.modalTitle = '编辑交换机';
        this.child.selectAll();
    }

    /**
     * 页面数据初始化
     *      1.getApUseInfo() 获取表格右上角设备使用情况
     *      2.getTableData() 获取设备资产管理平台table表格数据
     * */
    ngOnInit() {
        this.windowHeight = window.innerHeight - 200;
    }

    ngOnDestroy() {
        if (this.newConfirmModalModal$ !== undefined) {
            this.newConfirmModalModal$.destroy();
        }
        if (this.newBusinessListModal$ !== undefined) {
            this.newBusinessListModal$.destroy();
        }
    }
}
