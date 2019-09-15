import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as moment from "moment";

@Component({
    selector: 'app-visitor-certification-record-search',
    templateUrl: './visitor-certification-record-search.component.html',
    styleUrls: ['./visitor-certification-record-search.component.scss']
})
export class VisitorCertificationRecordSearchComponent implements OnInit {
    // startTime = null;
    // endTime = null;
    @Input() startTime;
    @Input() endTime;
    @Input() telephone;
    @Input() mac;
    @Output() output: EventEmitter<object> = new EventEmitter<object>();

    target: object = {
        startTime: this.startTime,
        endTime: this.endTime,
        telephone: this.telephone,
        mac: this.mac,
    };

    constructor() {
    }

    dataChange(value,field) {
        this.target[field] = value;
        this.output.emit(this.target);
    }

    clear() {
        this.startTime = "";
        this.endTime = "";
        this.mac = "";
        this.telephone = "";
        this.target = {
            startTime: this.startTime,
            endTime: this.endTime,
            mac: this.mac,
            telephone: this.telephone
        };
        this.output.emit(this.target);
    }

    /**
     * 改变起始日期
     * @param value
     * @private
     */
    _startValueChange = (value) => {
        this.startTime=value || this.startTime;
        this.target["startTime"] = this.startTime;
        if (this.startTime > this.endTime) {
            this.endTime = null;
        }
        if(this.endTime) {
            this.output.emit(this.target);
        }
    };

    /**
     * 改变终止日期
     * @param value
     * @private
     */
    _endValueChange = (value) => {
        this.endTime=value;
        this.target["endTime"] = this.endTime;
        if (this.startTime > this.endTime) {
            this.startTime = null;
        }
        this.output.emit(this.target);
    };

    /**
     * 禁止起始日期
     * @param value
     * @private
     */
    _disabledStartDate = (startValue) => {
        if (!startValue || !this.endTime) {
            return false;
        }
        return startValue.getTime() >= this.endTime.getTime();
    };

    /**
     * 禁止终止日期
     * @param value
     * @private
     */
    _disabledEndDate = (endValue) => {
        if (!endValue || !this.startTime) {
            return false;
        }
        return endValue.getTime() <= this.startTime.getTime();
    };

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

    ngOnInit() {
    }

}
