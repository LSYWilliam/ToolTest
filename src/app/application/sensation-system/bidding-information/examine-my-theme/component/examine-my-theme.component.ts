import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ExamineMyThemeService} from "../service/examine-my-theme.service";
import {routerTransition} from "../../../../../animations/route-animations";
import {StaticDataModel} from "../model/static-data.model";
import {QueryDataModel} from "../model/query-data.model";
import {NzModalSubject} from "ng-zorro-antd";
import {SensationDelModalComponent} from "../../../../../shared/component/sensation-del-modal/sensation-del-modal.component";
import {TableComponent} from "../../../../../plugins/component/table/table.component";

@Component({
    selector: 'app-examine-my-theme',
    templateUrl: './examine-my-theme.component.html',
    styleUrls: ['./examine-my-theme.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}

})
export class ExamineMyThemeComponent extends ExamineMyThemeService implements OnInit, OnDestroy {
    /**表格静态数据 实体类*/
    public staticDataModel: StaticDataModel = new StaticDataModel();
    /** 表格组件 */
    @ViewChild(TableComponent) childTable: TableComponent;
    private subscription$: NzModalSubject;

    /**查询列表数据*/
    serachListData(queryPara) {
        this.getTopicData(queryPara, this.topicID)
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

    /**点击搜索按钮*/
    search(queryPara:QueryDataModel) {
        if (queryPara.dateRadioValue ==='B' && queryPara._startDate === null && queryPara._endDate === null ) {
            this.message.error('请选择时间!');
        }else {

            this.serachListData(queryPara);
        }
    }
    /**点击清空按钮*/
    empty(queryPara:QueryDataModel) {
        this.serachListData(queryPara);
    }

    getTopicID(id: any) {
        this.topicID = Number(id);
        let body = {
            pageNo:null,
            pageSize:null,
            teBeginTime:"",
            teEndTime:"",
            teId:this.topicID,
            teIndustry:"",
            teRecMonth:1,
            teRegion:"",
            teType:""
        };
        this.getTopicData2(body).subscribe(res => {
            if (res.code === 0) {
                this.topicData = res.result;
            } else {
                this.topicData = [];
            }
        });
    }

    /**点击表格的单元格事件*/
    delRowEvent(value) {
        if (value.event.target.className === 'icon-systemCircleClose') {
            this.showDelModal(value.data['collectId']);
        } else if (value.event.target.className.search('highlight')>0) {
           /**调用取消关注接口*/
            const url = "/crawler/crawler-focus-collect-info/cancel-focus-collect-info";
            this.isAttentionTopicData(value.data['collectId'],url).subscribe(res => {
                if (res.code ===0) {
                    this.message.info("取消关注成功！");
                    value.data['collectStatus'] = 0;
                    this.childTable.editRow(value.data);
                }
            });
        } else if (value.event.target.className.search('dark')>0 ) {
            /**调用关注接口*/
            const url = "/crawler/crawler-focus-collect-info/focus-collect-info";
            this.isAttentionTopicData(value.data['collectId'],url).subscribe(res => {
                if (res.code ===0) {
                    this.message.info("关注成功！");
                    value.data['collectStatus'] = 2;
                    this.childTable.editRow(value.data);
                }
            });
        }
    }

    showDelModal(collectID: string) {
        const modalConfig = {
            content        : SensationDelModalComponent,
            onOk() {},
            onCancel() {},
            footer         : false,
            maskClosable : false
        };

        this.subscription$ = this.modal.open(modalConfig);
        this.subscription$.subscribe(result => {
            let res = result.split("|");
            if (res.length === 2) {
                let data = [];
                for (let obj of this.childTable.gridApi.getSelectedRows()) {
                    data.push(obj['collectId']);
                }

                this.delTopicData(collectID, res[1])
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
        });
    }

    ngOnInit() {
        this.getTopicID(this.topicID);
    }

    ngOnDestroy(): void {
        if (this.subscription$ != undefined) {
            this.subscription$.destroy()
        }
    }
}
