import {Component, OnInit, ViewChild} from '@angular/core';
import {MyAttentionService} from "../service/my-attention.service";
import {routerTransition} from "../../../../../animations/route-animations";
import {StaticDataModel} from "../model/static-data.model";
import {NzMessageService, NzModalService, NzModalSubject} from "ng-zorro-antd";
import {TableComponent} from "../../../../../plugins/component/table/table.component";


@Component({
    selector: 'app-my-attention',
    templateUrl: './my-attention.component.html',
    styleUrls: ['./my-attention.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}

})
export class MyAttentionComponent extends MyAttentionService implements OnInit {

    public staticDataModel: StaticDataModel = new StaticDataModel();
    public topicData: any;
    /** 表格组件 */
    @ViewChild(TableComponent) childTable: TableComponent;
    private subscription$: NzModalSubject;
    /**1 删除 2关注*/
    public type: any;

    /**获取表格数据*/
    getData(url) {
        this.getTableList(url)
            .subscribe(
                res => {
                    if (res.code === 0) {
                        this.topicData = res.result;
                    } else {
                        this.topicData = [];
                    }
                }
            );
    }
    ngOnInit() {
        const url = this.flag === 0 ? '/crawler/crawler-focus-collect-info/find-list-collect-info' : '/crawler/crawler-focus-collect-info/gov-find-list-collect-info';
       this.getData(url);
    }

    /**招标信息按钮*/
    biddingInfo() {
        this.flag = 0;
        this.bidBtnType = 'primary';
        this.govBtnType = 'default';
        const url = this.flag === 0 ? '/crawler/crawler-focus-collect-info/find-list-collect-info' : '/crawler/crawler-focus-collect-info/gov-find-list-collect-info';
        this.getData(url);
    }
    /**政府信息按钮*/
    govInfo() {
        this.flag = 1;
        this.bidBtnType = 'default';
        this.govBtnType = 'primary';
        const url = this.flag === 0 ? '/crawler/crawler-focus-collect-info/find-list-collect-info' : '/crawler/crawler-focus-collect-info/gov-find-list-collect-info';
        this.getData(url);
    }

    /**删除*/
    cancelAttention() {
        this.childTable.selectAll();
    }
    /**单个 或者 批量取消关注*/
    singleOrSomeCancelAttention(value) {
        const url = this.flag === 0 ? '/crawler/crawler-focus-collect-info/cancel-focus-collect-info': '/crawler/crawler-focus-collect-info/gov-cancel-focus-collect-info';
        this.cancelAttentionData(value, url)
            .subscribe(
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
    /**获取选中的数据*/
    selectAllEvent(value) {
        let array = [];
        for (let item of value) {
            array.push(item.data['collectId']);
        }
        if (array && array.length >0) {
            this.singleOrSomeCancelAttention(array);
        } else {
            this.message.warning('请先选择一行');
        }
    }

    /**点击表格的单元格事件*/
    delRowEvent(value) {
        if (value.event.target.className === 'attention') {
            this.singleOrSomeCancelAttention([value.data['collectId']]);
        }
    }
}
