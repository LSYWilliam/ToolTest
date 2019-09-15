import {
    Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges
} from '@angular/core';
import {QueryDataModel} from "../../model/query-data.model";
import * as moment from 'moment';
import {NzMessageService} from "ng-zorro-antd";
import {RequestArgs} from "../../../../../../shared/model/request-args";
import {HttpClientService} from "../../../../../../shared/service/httpClient.service";



@Component({
    selector: 'app-query-criteria',
    templateUrl: './query-criteria.component.html',
    styleUrls: ['./query-criteria.component.scss'],
})

export class QueryCriteriaComponent implements OnChanges, OnInit {
    @Input() topicID: string;
    @Output() searchPara = new EventEmitter<QueryDataModel>();
    @Output() emptyPara = new EventEmitter<QueryDataModel>();
    public queryData: QueryDataModel = new QueryDataModel();
    /**是否禁用时间*/
    public dataDisabled: boolean = true;
    /**http请求*/
    private requestArgs: RequestArgs = new RequestArgs();
    // /**开始时间*/
    // _startDate = null;
    // /**结束时间*/
    // _endDate = null;
    /**存放时间的数组*/
    timeArray = [];

    constructor(private message: NzMessageService,private http: HttpClientService) {
        this.requestArgs.systemName = 'sensation';
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};

        this.queryData._startDate = null;
        this.queryData._endDate = null;

    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.hasOwnProperty('topicID')) {
            let topic = changes['topicID'].currentValue;
            if (topic != undefined) {

            }
        }
    }

    updateChecked(status: boolean) {
        if (status) {
            this.queryData.setAllChecked();
        } else {
            this.queryData.setSingleChecked();
        }
    }

    setRadio() {
        this.dataDisabled = this.queryData.dateRadioValue === "A";
        this.queryData._startDate = null;
        this.queryData._endDate = null;
        this.queryData.dateRange = [null,null];
    }


    search() {
        if (this.queryData.dateRadioValue !== "A" && (this.queryData.dateRange === undefined || this.queryData.dateRange === null)) {
            this.message.warning("请选择日期!",{nzDuration:2000});
        } else {
            this.searchPara.emit(this.queryData);
        }
    }
    /**
     * 改变起始值
     * @param value
     * @private
     */
    _startValueChange = (value) => {
        this.queryData._startDate = value || this.queryData._startDate;
        if (this.queryData._startDate > this.queryData._endDate) {
            this.queryData._endDate = null;
        }
        this.timeArray[0] = this.queryData._startDate;
        this.queryData.dateRange = this.timeArray;
    };

    /**
     * 改变终止值
     * @param value
     * @private
     */
    _endValueChange = (value) => {
        this.queryData._endDate = value;
        if (this.queryData._startDate > this.queryData._endDate) {
            this.queryData._startDate = null;
        }
        let differ = moment(this.queryData._endDate).diff(this.queryData._startDate, "days") + 1;
        if (differ > 30) {
            this.message.warning("时间段范围不能超过30天!",{nzDuration:2000});
            this.queryData._startDate = null;
            this.queryData._endDate = null;
        }
        this.timeArray[1] = this.queryData._endDate;
        this.queryData.dateRange = this.timeArray;
    };

    /**
     * 禁止起始日期
     * @param value
     * @private
     */
    _disabledStartDate = (startValue) => {
        if (!startValue || !this.queryData._endDate) {
            return false;
        }
        return startValue.getTime() >= this.queryData._endDate.getTime();
    };
    _disabledEndDate = (endValue) => {
        if (!endValue || !this.queryData._startDate) {
            return false;
        }
        return endValue.getTime() <= this.queryData._startDate.getTime();
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


    emptyData() {
        this.queryData.initData();
        this.queryData._startDate = null;
        this.queryData._endDate = null;
        this.emptyPara.emit(this.queryData);
    }
    ngOnInit() {

    }

}
