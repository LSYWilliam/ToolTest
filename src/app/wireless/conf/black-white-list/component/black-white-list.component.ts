import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {routerTransition} from "../../../../animations/route-animations";
import {StaticDataModel} from "../model/static-data.model";
import {BlackWhiteListService} from "../service/black-white-list.service";
import {BlackWhiteModalComponent} from "./black-white-modal/black-white-modal.component";
import {NameListModel} from "../model/name-list.model";
import {TableComponent} from "../../../../plugins/component/table/table.component";
import {ConfirmModalComponent} from "../../../../shared/component/confirm-modal/confirm-modal.component";
import {UploadModalComponent} from "../../../../shared/component/upload-modal/upload-modal.component";
import {NzModalSubject} from "ng-zorro-antd";
import {RequestArgs} from "../../../../shared/model/request-args";
/**
 * 黑白名单列表模块
 * @class BlackWhiteListComponent
 */
@Component
({
    selector: 'app-black-white-list',
    templateUrl: './black-white-list.component.html',
    styleUrls: ['./black-white-list.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})

export class BlackWhiteListComponent extends BlackWhiteListService implements OnInit, OnDestroy {
    /**静态数据模型*/
    public windowHeight: number;
    public staticDataModel: StaticDataModel = new StaticDataModel();
    @ViewChild(TableComponent) childTable: TableComponent;
    private editModel$ : NzModalSubject;
    private delModel$ : NzModalSubject;
    private upLoadModel$ : NzModalSubject;

    ngOnInit () {
        this.windowHeight = window.innerHeight-170;
    }

    /** 回退按钮事件 */
    public goBack() {
        this.router.navigateByUrl('ssid-details');
    }
    /**点击新增按钮触发的事件*/
    public addEvent() {
        const name: string = this.pageType === '1'? '新增白名单' : '新增黑名单';
        this.rowData.id = this.listCount + 1;
        this.rowData.mac = '';
        this.rowData.note = '';
        this.showModalForComponent(this.rowData, name);
    }
    /**点击编辑按钮触发的事件*/
    public editEvent() {
        this.childTable.selectAll();
    }
    /**点击鼠标右键触发的事件*/
    public rightEventDel(){
        this.showModalForConfirm('确认删除这些数据？');
    }
    /**双击鼠标触发的时间*/
    public doubleClick(data: any) {
        const name: string = this.pageType === '1'? '新增白名单' : '新增黑名单';
        this.rowData.id = data['data']['id'];
        this.rowData.mac = data['data']['mac'];
        this.rowData.note = data['data']['note'];
        this.showModalForComponent(this.rowData, name,data);
    }
    /**点击右键菜单中的编辑按钮*/
    public rightEventEdit(){
        this.childTable.selectAll();
    }
    /**点击删除按钮触发的事件*/
    public deleteEvent() {
        if (this.childTable.gridApi.getSelectedRows().length === 0) {
            this.message.warning('请选择需要删除的行');
        } else {
            this.showModalForConfirm('确认删除这些数据？');
        }
    }

    /**用于监听子组件的全选时间*/
    selectRow(options: any) {
        const len = options.length;
        if (len <= 0) {
            this.message.warning('请选择一行进行编辑！');
        } else if ( len > 1) {
            this.message.warning('只能对单行进行编辑！');
        } else {
            const name: string = this.pageType === '1'? '新增白名单' : '新增黑名单';
            this.rowData.id = options[0]['data']['id'];
            this.rowData.mac = options[0]['data']['mac'];
            this.rowData.note = options[0]['data']['note'];
            this.showModalForComponent(this.rowData, name,options[0]);
        }
    }

    /**模板下载*/
    templateDownload() {
        this.requestArgs.url = '/api/v1/blackAndWhite/download';
        this.requestArgs.responseType = "blob";
        const name: string = this.pageType === '1'? '白名单' : '黑名单';
        this.template(this.requestArgs, name);
    }

    /**导入组件*/
    uploadComponent() {
        let requestArgs: RequestArgs = new RequestArgs();
        requestArgs.systemName = 'wlanscope';
        requestArgs.url = '/api/v1/blackAndWhite/upload/'+ this.ssidId;
        const obj = {
            header: {'ticket': sessionStorage.getItem('ticket')},
            url: this.http.getUrl(requestArgs),
            isMulImport: true,
            title:'上传文件'
        };
        this.showUploadModal(obj);
    }

    /**
     * 打开新增或编辑modal框方法
     * @param data any
     *              表格中被点击的那一行数据
     * @param titleName string
     *              模态框标题名称
     * @param rowData any
     *         行数据
     */
    showModalForComponent(data: NameListModel,titleName: string, rowData? : any) {
        const modalConfig = {
            title          : titleName,
            content        : BlackWhiteModalComponent,
            onOk() {},
            onCancel() {},
            footer         : false,
            maskClosable : false,
            componentParams: {
                name: data
            }
        };

        this.editModel$ = this.modalService.open(modalConfig);
        this.editModel$.subscribe(result => {
            let tmp = result.split('|');
            if (tmp.length === 2) {
                let data = JSON.parse(tmp[1]);
                switch (tmp[0]) {
                    case 'add':
                        this.childTable.addRow([{'note': data['note'], 'id': data['id'], 'mac': data['mac']}]);
                        this.listCount = this.listCount + 1;
                        break;
                    case 'edit':
                        let update = rowData.data;
                        update['note'] = data['note'];
                        update['id'] = data['id'];
                        update['mac'] = data['mac'];
                        this.childTable.editRow(update);
                        break;
                }
            }
        })
    }
    /**
     * 打开删除modal框方法
     * @param message any
     *         删除模态框的标题
     */
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

        this.delModel$ = this.modalService.open(modalConfig);
        this.delModel$.subscribe(result => {
            if (result === 'onOk') {
                let data = [];
                for (let obj of this.childTable.gridApi.getSelectedRows()) {
                    data.push(obj['id']);
                }
                this.requestArgs.url = '/api/v1/blackAndWhite/delete';
                this.requestArgs.body = data ;
                this.deleteBlackWhiteListData(this.requestArgs, this.childTable);
                this.listCount = this.listCount - 1;
            }
        })
    }
    /**
     * 打开导入modal框方法
     * @param obj any
     *         导入数据
     */
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

        this.upLoadModel$ = this.modalService.open(modalConfig);
        this.upLoadModel$.subscribe(result => {
            if (result === 'onOk') {
                this.getBlackWhiteLis(this.requestArgs);
            }
        })
    }

    /**
     * 销毁组件或指令
     * */
    ngOnDestroy(): void {
        if (this.editModel$ != undefined) {
            this.editModel$.destroy();
        }

        if (this.delModel$ != undefined) {
            this.delModel$.destroy();
        }

        if (this.upLoadModel$ != undefined) {
            this.upLoadModel$.destroy();
        }

        // this.subscribe$.unsubscribe();
    }
}
