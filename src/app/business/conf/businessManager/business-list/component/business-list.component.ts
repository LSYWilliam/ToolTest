import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {routerTransition} from "../../../../../animations/route-animations";
import {TableComponent} from '../../../../../plugins/component/table/table.component';
import {BusinessListService} from '../service/business-list.service';
import {StaticDataModel} from "../model/static-data.model";
import {ConfirmModalComponent} from "../../../../../shared/component/confirm-modal/confirm-modal.component";
import {BusinessModalInterface, setBusinessRow} from "../model/businessModal.model";
import {BusinessModalComponent} from "./business-modal/business-modal.component";
import {NzModalSubject} from "ng-zorro-antd";
/**
 * 商户列表模块
 * @class BusinessListComponent
*/
@Component
({
    selector: 'app-business-list',
    templateUrl: './business-list.component.html',
    styleUrls: ['./business-list.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})

export class BusinessListComponent extends BusinessListService implements OnInit, OnDestroy  {
    /** 定义个windowHeight类型 */
    public windowHeight: number;
    /**edit-table表格行数据*/
    public rowData: any;
    /** 模态框名称 */
    public modalTitle: string;
    /**在商户列表组件中引入table组件*/
    @ViewChild(TableComponent) child: TableComponent;
    /**表格静态数据 实体类*/
    public staticDataModel: StaticDataModel = new StaticDataModel();

    /** 新建商家列表的模态框 */
    private newBusinessListModal$: NzModalSubject;
    /** 新建删除的模态框 */
    private newConfirmModalModal$: NzModalSubject;

    /**新增事件*/
    create() {
        this.modalTitle = '创建企业';
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
    /**编辑事件*/
    edit() {
        this.modalTitle = '编辑企业';
        this.child.selectAll();
    }
    /**显示新增或者编辑模态框
     *      1.data 是传递给模态框的初始化数据
     *      2.rowNode 编辑模态框的时候，获取编辑那一行的数据
     * */
    showModalForData(data: BusinessModalInterface, rowNode?: any) {
        const modalConfig = {
            title: this.modalTitle,
            content : BusinessModalComponent,
            onOk() {},
            onCancel() {},
            footer         : false,
            maskClosable : false,
            componentParams: {
                name: data
            }
        };
        this.newBusinessListModal$ = this.modal.open(modalConfig);
        this.newBusinessListModal$.subscribe(result => {
            // let tmp = result.split("|");
            // if (tmp.length ===2) {
            //     switch (tmp[0]) {
            //         case 'add':
            //             this.child.addRow([JSON.parse(tmp[1])]);
            //             break;
            //         case 'edit':
            //             let data = setBusinessRow(rowNode.data, JSON.parse(tmp[1]));
            //             this.child.editRow(data);
            //             break;
            //     }
            // }
            if (result.length ===2) {
                switch (result[0]) {
                    case 'add':
                        this.child.addRow([JSON.parse(result[1])]);
                        break;
                    case 'edit':
                        let data = setBusinessRow(rowNode.data, JSON.parse(result[1]));
                        this.child.editRow(data);
                        break;
                }
            }
        })
    }
    /**显示删除模态框*/
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
                    data.push(obj['businessId']);
                }
                this.requestArgs.systemName = 'system';
                this.requestArgs.url = '/ewifi/system/console/business/delete_by_wlanscope';
                this.requestArgs.body = { businessId : data[0] };
                this.http.httpPost(this.requestArgs).subscribe(
                    res => {
                        switch (res.code) {
                            case 0 :
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
    /**用于监听子组件的全选*/
    selectRow(options: any) {
        const len = options.length;
        if (len <= 0) {
            this.message.warning('请选择一行进行编辑！');
        } else if ( len > 1) {
            this.message.warning('只能对单行进行编辑！');
        } else {
            this.showModalForData(<BusinessModalInterface> options[0]['data'],options[0]);
        }
    }
    /**右键删除*/
    public rightEventDel(value) {
        this.showModalForConfirm('确认删除这些数据？');
    }
    /**右键编辑*/
    public rightEventEdit(value) {
        this.modalTitle = '编辑企业';
        this.child.selectAll();
    }
    /**双击table表格*/
    public doubleClick(data: any) {
        this.modalTitle = '编辑企业';
        this.showModalForData(<BusinessModalInterface> data['data'], data);
    }
    /**单元格点击事件*/
    // cellClickEvent(value) {
    //     console.log(value);
    //     switch(value.colDef.field) {
    //         case 'networkDetails':
    //             this.router.navigateByUrl('business-network-list');
    //             break;
    //     }
    // }
    /**动态获取表格数据*/
    getData() {
        this.getBusinessTableData();
    }
    /**
     * 销毁组件或指令
     * */
    ngOnDestroy(): void {
        if (this.newBusinessListModal$ !== undefined) {
            this.newBusinessListModal$.destroy();
        }
        if (this.newConfirmModalModal$ !== undefined) {
            this.newConfirmModalModal$.destroy();
        }
    }
    /**页面初始化数据*/
    ngOnInit() {
        this.windowHeight = window.innerHeight-200;
        this.getData();
    }
}
