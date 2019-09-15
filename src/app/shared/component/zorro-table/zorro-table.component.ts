import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClientService} from "../../service/httpClient.service";
import {RequestArgs} from "../../model/request-args";
import {NzMessageService} from "ng-zorro-antd";

@Component({
    selector: 'app-zorro-table',
    templateUrl: './zorro-table.component.html',
    styleUrls: ['./zorro-table.component.css']
})
export class ZorroTableComponent implements OnInit {

    /**表头元数据*/
    @Input() headerData: Array<any>;
    /**表元数据*/
    @Input() metaData: any;

    /**数据接口信息*/
    @Input() srcRequestArgs: RequestArgs;

    @Input() dataProcess: any;
    /**选中的数据*/
    @Output() selectedData: EventEmitter<any> = new EventEmitter<any>();

    @Output() dropDownDataEvent: EventEmitter<any> = new EventEmitter<any>();

    searchValue = {};
    nzVisible;

    /**页面数据初识赋值*/
    _current = 1;
    _pageSize = 10;
    _total = 1;
    _dataSet = [];
    _loading = true;
    _sortValue = null;
    _filterGender = [
        {name: 'male', value: false},
        {name: 'female', value: false}
    ];
    _allChecked = false;
    _indeterminate = false;

    constructor(private http: HttpClientService, public _message: NzMessageService) {

    }

    /**
     * 排序
     * @param value
     */
    sort(value) {
        this._sortValue = value;
        this.refreshData();
    }

    /**
     * 重置
     */
    reset() {
        this._filterGender.forEach(item => {
            item.value = false;
        });
        this.refreshData(true);
    }

    /**
     * 刷新数据
     * @param {boolean} reset
     */
    refreshData(reset = false) {
        if (reset) {
            this._current = 1;
        }
        this._loading = true;

        Object.assign(this.srcRequestArgs.body, {
            "pageNo": this._current - 1,
            "pageSize": this.srcRequestArgs.body.pageSize ? this.srcRequestArgs.body.pageSize : this._pageSize
        });

        let subscription;
        if (this.metaData.requestType && this.metaData.requestType === "post") {
            subscription = this.http.httpPost(this.srcRequestArgs);
        } else {
            subscription = this.http.httpGet(this.srcRequestArgs);
        }
        subscription.subscribe(res => {
            if (res.code === 0) {
                let pagination = res.pagination;
                this._loading = false;
                if (typeof pagination !== "undefined") {
                    this._total = pagination.totalElements;
                }

                if (typeof this.dataProcess !== "undefined") {
                    res.result.map(glt => {
                        this.dataProcess(glt);
                    });
                }
                res.result.forEach(glt => {
                    if (glt["usrMobile"]) {
                        glt["usrMobile"] = glt["usrMobile"].replace(glt["usrMobile"].substring(3, 9), "******");
                    }
                    if (glt["userMobile"]) {
                        glt["userMobile"] = glt["userMobile"].replace(glt["userMobile"].substring(3, 9), "******");
                    }
                });
                this._dataSet = res.result;
            } else {
                this._loading = false;
                this._dataSet = [];
                this._total = 0;
                if (res.code !== 9) {
                    this._message.create('error', res.msg);
                }
            }
        });
    }

    /**
     * 当前分页数据回调，返回当前分页数据的内容
     * @param $event
     * @private
     */
    _displayDataChange($event) {
        this._dataSet = $event;
        this._refreshStatus();
    }

    search(meta, target) {
        this.srcRequestArgs.body[meta] = target ? target : "";
        this.refreshData(true);
        this.nzVisible = false;
    }

    _refreshStatus() {
        const allChecked = this._dataSet.every(value => value.disabled || value.checked);
        const allUnChecked = this._dataSet.every(value => value.disabled || !value.checked);
        this._allChecked = allChecked;
        this._indeterminate = (!allChecked) && (!allUnChecked);
    }

    _checkAll(value) {
        if (value) {
            this._dataSet.forEach(data => {
                if (!data.disabled) {
                    data.checked = true;
                }
            });
        } else {
            this._dataSet.forEach(data => data.checked = false);
        }
        this._refreshStatus();
    }

    selectData() {
        this.selectedData.next(this._dataSet.filter(value => value.checked));
    }

    pageChangedFunction(value) {
        this._current = value;
        this.refreshData(false);
    }

    ngOnInit() {
        if (!this.srcRequestArgs) {
            this.srcRequestArgs = new RequestArgs();
        }
        if (!this.metaData) {
            this.metaData = {
                checked: true,
                requestType: "get"
            };
        }
        if (typeof this.metaData.checked === undefined) {
            this.metaData.checked = true;
        }
        if (typeof this.metaData.requestType === undefined) {
            this.metaData.requestType = "post";
        }

        this.srcRequestArgs.header = {'ticket': sessionStorage.getItem('ticket'), 'Content-Type': 'application/json'};
        if (!this.srcRequestArgs.body) {
            this.srcRequestArgs.body = {
                "pageNo": this._current - 1,
                "pageSize": this._pageSize
            };
        }

        let bodyLength = Object.getOwnPropertyNames(this.srcRequestArgs.body).length;
        if (bodyLength === 0) {
            this.srcRequestArgs.body = new Object();
            Object.assign(this.srcRequestArgs.body, {
                "pageNo": this._current - 1,
                "pageSize": this._pageSize
            });
        }
        if (!this.srcRequestArgs.body["pageNo"]) {
            this.srcRequestArgs.body.pageNo = this._current - 1;
        }
        if (!this.srcRequestArgs.body["pageSize"]) {
            this.srcRequestArgs.body.pageSize = this._pageSize;
        }

        if (typeof this.srcRequestArgs.url === "undefined" || this.srcRequestArgs.url === "") {
            this._loading = false;
            this._dataSet = [];
            return;
        }

        this.refreshData();
    }

    dropDownData(value, data, flag) {
        let object = {
            value, data, flag
        };
        console.log(object);
        this.dropDownDataEvent.next(object);
    }
}
