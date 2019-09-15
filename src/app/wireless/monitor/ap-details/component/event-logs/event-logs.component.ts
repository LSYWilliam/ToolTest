import {Component, OnInit, AfterViewInit, Input} from '@angular/core';
import {HttpClientService} from "../../../../../shared/service/httpClient.service";
import {RequestArgs} from "../../../../../shared/model/request-args";
import {EventListModel} from "../../model/event-log/event-list.model";
import {UserTerminalModel} from "../../model/event-log/user-terminal.model";

/**
 * 事件日志
 * @class EventLogsComponent
 */
@Component
({
    selector: 'app-ap-details-event-logs',
    templateUrl: './event-logs.component.html',
    styleUrls: ['./event-logs.component.scss']
})

export class EventLogsComponent implements OnInit {
    public radioValue: string;
    private _apID: string;
    private _apSn: string;
    private requestArgs: RequestArgs = new RequestArgs();
    public eventListModel: EventListModel = new EventListModel();
    public userTerminalModel: UserTerminalModel = new UserTerminalModel();
    public enevtLogData: any;
    public userLogData: any;
    public _isSpinning: boolean;
    /**
     * 获取apID
     * */
    @Input() set setApID(value: string) {
        this._apID = value;
    }
    /**
     * 获取ap 序列号
     * */
    @Input() set setApSn(value: string) {
        this._apSn = value;
    }
    /**
     * 构造方法
     * @description
     *      1、获取ticket
     * */
    constructor (private http: HttpClientService) {
        this.requestArgs.systemName = 'wlanscope';
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
    }

    /**
     * 方法初始化
     * @description
     *      1、事件日志表格
     * */
    ngOnInit() {
        this._isSpinning = true;
        this.getEventLog();
        this.getUserLog();
    }

    /**
     * 获取事件日志
     * */
    private getEventLog() {
        let timeparam = -7;
        this.requestArgs.url = "/api/v1/wireless/getUserLog/" + this._apSn + "/" + timeparam;
        this.http.httpGet(this.requestArgs)
            .subscribe(
                res => {
                    if (res.code === 0) {
                        this.enevtLogData = res.result;
                    } else if (res.code === 9) {
                        this.enevtLogData = [];
                    } else {
                        this.enevtLogData = [];
                    }
                    this._isSpinning = false;
                }
            );
    }

    /**
     * 获取事件日志
     * */
    private getUserLog() {
        this.requestArgs.url = "/api/v1/ap_alarm/up_down/" + this._apSn;
        this.http.httpGet(this.requestArgs)
            .subscribe(
                res => {
                    if (res.code === 0) {
                        this.userLogData = res.result;
                    } else if (res.code === 9) {
                        this.userLogData = [];
                    } else {
                        this.userLogData = [];
                    }
                    this._isSpinning = false;
                }
            );
    }
}
