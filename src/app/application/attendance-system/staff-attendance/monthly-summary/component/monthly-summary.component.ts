import {Component, OnDestroy, OnInit} from '@angular/core';
import {MonthlySummaryService} from "../service/monthly-summary.service";
import * as moment from "moment";
import {routerTransition} from "../../../../../animations/route-animations";
import {MonthlySummaryHead} from "../model/monthly-summary-head.model";

@Component({
    selector: 'app-monthly-summary',
    templateUrl: './monthly-summary.component.html',
    styleUrls: ['./monthly-summary.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})
export class MonthlySummaryComponent extends MonthlySummaryService implements OnInit, OnDestroy {

    /**
     * 改变起始值
     * @param value
     * @private
     */
    _valueChange = (value) => {
        this._searchMonth = value;
        this.search();
    };

    disabledMonth(current: Date): boolean {
        return current && moment(current).day(0).valueOf() > moment().valueOf();
    }

    /**
     * 查询
     */
    search() {
        if(!this._searchMonth) {
            this._searchMonth = new Date();
        }
        this.srcRequestArgs.body.month = moment(this._searchMonth).format("YYYY-MM");
        this.monthlySummaryHead = new MonthlySummaryHead(this.openModal, this.getLastDay(this._searchMonth), this.getHoliday(this._searchMonth),
            this.editStatus,this.http);
        this.tableInput = this.monthlySummaryHead.tableInput;

        this.child.refreshData(true);
    }

    /**
     * 数据表格下载功能按钮
     */
    loadButton() {
        this.DownLoadDataFile();
    }

    ngOnInit() {
    }

    ngOnDestroy(): void {
        if (this.subscription$ !== undefined) {
            this.subscription$.destroy();
        }
    }

}
