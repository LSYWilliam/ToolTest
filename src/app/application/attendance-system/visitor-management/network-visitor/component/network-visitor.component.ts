import {Component, OnInit} from '@angular/core';
import {NetworkVisitorService} from "../service/network-visitor.service";
import * as moment from 'moment';
import {routerTransition} from "../../../../../animations/route-animations";

@Component({
    selector: 'app-network-visitor',
    templateUrl: './network-visitor.component.html',
    styleUrls: ['./network-visitor.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})
export class NetworkVisitorComponent extends NetworkVisitorService implements OnInit {

    /**
     * 改变起始日期
     * @param value
     * @private
     */
    _startValueChange = (value) => {
        this._startDate=value || this._startDate;
        if (this._startDate > this._endDate) {
            this._endDate = null;
        }
    };

    /**
     * 改变终止日期
     * @param value
     * @private
     */
    _endValueChange = (value) => {
        this._endDate=value;
        if (this._startDate > this._endDate) {
            this._startDate = null;
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

    /**
     * 禁止终止日期
     * @param value
     * @private
     */
    _disabledEndDate = (endValue) => {
        if (!endValue || !this._startDate) {
            return false;
        }
        return endValue.getTime() <= this._startDate.getTime();
    };

    /**
     * 获取相同的日期
     * @returns {any | boolean}
     * @private
     */
    get _isSameDay() {
        return this._startDate && this._endDate && moment(this._startDate).isSame(this._endDate, 'day')
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

    /**
     * 查询
     */
    search() {
        this.srcRequestArgs.body.startTime=moment(this._startDate).format("YYYY-MM-DD");
        this.srcRequestArgs.body.endTime=moment(this._endDate).format("YYYY-MM-DD");
        this.child.refreshData(true);
    }

    ngOnInit() {
    }

}
