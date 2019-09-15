import {Component, OnInit, ViewChild} from '@angular/core';
import {MyRecycleBinService} from "../service/my-recycle-bin.service";
import {routerTransition} from "../../../../../animations/route-animations";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {DropDownsInterface} from "../../../../../shared/component/dropdown/model/dropdowns.model";
import {ReceiveModel} from "../../../../../shared/model/receive.model";
import {ActivatedRoute, Router} from "@angular/router";
import {StaticDataModel} from "../model/static-data.model";
import * as moment from 'moment';
import {TableComponent} from "../../../../../plugins/component/table/table.component";

@Component({
    selector: 'app-my-attention',
    templateUrl: './my-recycle-bin.component.html',
    styleUrls: ['./my-recycle-bin.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}

})

export class MyRecycleBinComponent extends MyRecycleBinService implements OnInit {
    @ViewChild(TableComponent) private childTable: TableComponent;
    public staticDataModel: StaticDataModel = new StaticDataModel();
    public dateRange: any;

    private startDate: string;
    private endDate: string;
    _startDate = null;
    _endDate = null;

    ngOnInit() {
        const bidUrl = '/crawler/crawler-delete-collect-info/find-list-collect-info';
        this.setTableData(bidUrl);
    }
    /**招标信息按钮*/
    biddingInfo() {
        this.flag = 0;
        this.bidBtnType = 'primary';
        this.govBtnType = 'default';
        const bidUrl = '/crawler/crawler-delete-collect-info/find-list-collect-info';
        const url = "/crawler/crawler-theme-info/find-theme-info-list";
        this.dealChangeTableData(url,bidUrl);
    }
    /**政府信息按钮*/
    govInfo() {
        this.flag = 1;
        this.bidBtnType = 'default';
        this.govBtnType = 'primary';
        const govUrl = '/crawler/crawler-delete-collect-info/gov-find-list-collect-info';
        const url = "/crawler/crawler-theme-info/gov-find-theme-info-list";
       this.dealChangeTableData(url,govUrl);
    }
    /**table表格数据处理*/
    dealChangeTableData(url,govUrl) {
        this.getGovSelectData(url).subscribe(res => {
            if (res.code === 0) {
                let list = [];
                res.result.forEach(
                    res => {
                        list.push(<DropDownsInterface>{id: res['teId'], name: res['teName']});
                    }
                );
                if (list.length > 0) {
                    this.topicList = list;
                    this.topicID = list[0]['id'];
                } else {
                    this.router.navigateByUrl('/manage-my-sniffer');
                }
                this.setTableData(govUrl);
            }
        });
    }
    getTopicID(data: string) {
        this.topicID = data;
        const url = this.flag === 0 ? '/crawler/crawler-delete-collect-info/find-list-collect-info' : '/crawler/crawler-delete-collect-info/gov-find-list-collect-info';
        this.setTableData(url);
    }

    cancelDel() {
        let row = this.getSelectRow();
        if (this.checkSelectRow(row)) {
            let data = [];
            row.forEach(val => data.push(val['collectId']));
            const url = this.flag === 0 ? '/crawler/crawler-delete-collect-info/cancel-delete-collect-info' : '/crawler/crawler-delete-collect-info/gov-cancel-delete-collect-info';
                this.cancelDelete(data, url)
                .subscribe(
                    res => {
                        if (res.code === 0) {
                            this.childTable.singleDelete();
                            this.message.info("撤销成功！");
                        } else {
                            this.message.error("撤销失败！");
                            this.message.error(res.msg);
                        }
                    }
                );
        }
    }

    delete() {
        let row = this.getSelectRow();
        if (this.checkSelectRow(row)) {
            let data = [];
            row.forEach(val => data.push(val['collectId']));

            const url = this.flag === 0 ? '/crawler/crawler-delete-collect-info/hard-delete-collect-info' : '/crawler/crawler-delete-collect-info/gov-hard-delete-collect-info';
            this.deleteComplete(data, url)
                .subscribe(
                    res => {
                        if (res.code === 0) {
                            this.childTable.singleDelete();
                            this.message.info("彻底删除成功！");
                        } else {
                            this.message.error("彻底删除失败！");
                            this.message.error(res.msg);
                        }
                    }
                );
        }
    }

    private getSelectRow() {
        return this.childTable.gridApi.getSelectedRows();
    }

    private checkSelectRow(row: any) {
        if (row.length > 0) {
            return true;
        } else {
            this.message.warning("请选择要操作的行!");
            return false;
        }
    }

    /** 这个接口有问题，数据定义的与呈现的数据不符 */
    private setTableData(url) {
        this.getTableList(url, this.topicID, this.startDate, this.endDate)
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

    /**
     * 改变起始值
     * @param value
     * @private
     */
    _startValueChange = (value) => {
        this._startDate = value || this._startDate;
        if (this._startDate > this._endDate) {
            this._endDate = null;
        }

        if (this._startDate && this._endDate) {
            const url = this.flag === 0 ? '/crawler/crawler-delete-collect-info/find-list-collect-info' : '/crawler/crawler-delete-collect-info/gov-find-list-collect-info';
            this.setTableData(url);
        }
    };

    /**
     * 改变终止值
     * @param value
     * @private
     */
    _endValueChange = (value) => {
        this._endDate = value;
        if (this._startDate > this._endDate) {
            this._startDate = null;
        }
        let differ = moment(this._endDate).diff(this._startDate, "days") + 1;
        if (differ > 30) {
            this.message.warning("时间段范围不能超过30天!",{nzDuration:2000});
            this._startDate = null;
            this._endDate = null;
        }

        if (this._startDate && this._endDate) {
            const url = this.flag === 0 ? '/crawler/crawler-delete-collect-info/find-list-collect-info' : '/crawler/crawler-delete-collect-info/gov-find-list-collect-info';
            this.setTableData(url);
        }
    };

    /**
     * 禁止起始日期
     * @param value
     * @private
     */
    _disabledStartDate = (startValue) => {
        if (!startValue || !this._endDate) {
            return false;
        }
        return startValue.getTime() >= this._endDate.getTime();
    };
    _disabledEndDate = (endValue) => {
        if (!endValue || !this._startDate) {
            return false;
        }
        return endValue.getTime() <= this._startDate.getTime();
    };

    /**
     * 判断是否是同一天
     * @returns {any | boolean}
     * @private
     */
    get _isSameDay() {
        return this._startDate && this._endDate && moment(this._startDate).isSame(this._endDate, 'day');
    }

    /**
     * 获取终止日期
     * @returns {{nzHideDisabledOptions: boolean}}
     * @private
     */
    get _endTime() {
        return {
            nzHideDisabledOptions: true,
        };
    }

}
