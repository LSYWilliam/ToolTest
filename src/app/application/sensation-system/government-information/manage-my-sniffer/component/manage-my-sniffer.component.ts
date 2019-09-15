import {Component, OnInit, ViewChild} from '@angular/core';
import {ManageMySnifferService} from "../service/manage-my-sniffer.service";
import {routerTransition} from "../../../../../animations/route-animations";
import {StaticDataModel} from "../model/static-data.model";
import {TableComponent} from "../../../../../plugins/component/table/table.component";
import {ConfirmModalComponent} from "../../../../../shared/component/confirm-modal/confirm-modal.component";

@Component({
    selector: 'app-manage-my-sniffer',
    templateUrl: './manage-my-sniffer.component.html',
    styleUrls: ['./manage-my-sniffer.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})

export class ManageMySnifferComponent extends ManageMySnifferService implements OnInit {
    /**表格静态数据 实体类*/
    public staticDataModel: StaticDataModel = new StaticDataModel();
    public topicData: any = [];
    public newConfirmModalModal$: any;

    @ViewChild(TableComponent) private childTable: TableComponent;

    ngOnInit() {
        this.getTopicData().subscribe(
            res => {
                if (res.code === 0) {
                    this.topicData = res.result;
                } else {
                    this.topicData = [];
                    // this.message.error(res.msg);
                }
            }
        );
    }

    /**新建 我的主题*/
    createTopic() {
        this.jumpToUrl("新建", "1");
    }

    editTopic() {
        let rowSelect = this.getSelectTableRows();
        if (rowSelect.length === 0) {
            this.message.warning("请选择一行需要编辑的数据！");
        } else if (rowSelect.length > 1) {
            this.message.warning("只能对单行数据进行编辑！");
        } else {
            this.jumpToUrl('编辑',rowSelect[0]['teId']);
        }
    }

    deleteTopic() {
        let rowSelectRow = this.getSelectTableRows();
        if (rowSelectRow.length > 0) {
            this.showModalForConfirm('确认删除这些数据？');
        } else {
            this.message.warning("请选择要删除的行！");
        }
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
                for (let obj of this.childTable.gridApi.getSelectedRows()) {
                    data.push(obj['teId']);
                }
                this.delTopicData(data).subscribe(
                    res => {
                        if (res.code === 0) {
                            this.childTable.singleDelete();
                            this.message.info("删除成功！");
                        } else {
                            this.message.error("删除失败！");
                            this.message.error(res.msg);
                        }
                    }
                );
            }
        })
    }

    private getSelectTableRows() {
        return this.childTable.gridApi.getSelectedRows();
    }

    private jumpToUrl(status: string, data: any) {
        this.router.navigate(["/edit-sniffer", status, data, "/manage-my-sniffer"],
            {skipLocationChange: true });
    }
}
