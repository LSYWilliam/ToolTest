import {Injectable, ViewChild} from '@angular/core';
import {HttpClientService} from "../../../../../shared/service/httpClient.service";
import {RequestArgs} from "../../../../../shared/model/request-args";
import {WorkShiftManagement} from "../model/work-shift-management.model";
import {NzMessageService, NzModalService, NzModalSubject} from "ng-zorro-antd";
import {WorkShiftModel} from "../model/work-shift.model";
import {CommonUtilService} from "../../../../../shared/service/common-util.service";
import {TableComponent} from "../../../../../plugins/component/table/table.component";

@Injectable()
export class WorkShiftManagementService {
    @ViewChild(TableComponent) child: TableComponent;
    tableInput:any;
    tableData:any;
    srcRequestArgs:any;
    requestArgs: RequestArgs = new RequestArgs();
    metaData:any;

    /**订阅模态框*/
    subscription$: NzModalSubject;
    operationFlag: string;

    constructor(private http: HttpClientService, public modalService: NzModalService,
                public _message: NzMessageService,public commonUtilService: CommonUtilService) {
        this.tableInput = new WorkShiftManagement().aggridTableInput;
        // this.metaData = new WorkShiftManagement().metaData;
        this.srcRequestArgs = new RequestArgs();
        this.srcRequestArgs.header = {'ticket': sessionStorage.getItem('ticket'),'Content-Type':'application/json'};
        this.srcRequestArgs.url="/flight/api/find/all";
        this.srcRequestArgs.systemName = "attendance";

        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
        this.getWorkShiftList();
    }

    /**
     * 查询班次
     */
    getWorkShiftList() {
        this.http.httpGet(this.srcRequestArgs).subscribe(res=> {
            if(res.code===0) {
                this.tableData=res.result;
            } else {
                this.tableData=[];
                if(res.code!==9) {
                    this._message.create('info', res.msg);
                }
            }
        });
    }

    /**
     * 增加班次
     * @param {WorkShiftModel} item
     */
    addWorkShift(item:WorkShiftModel) {
        this.requestArgs.body = {
            'flightName': item.flightName,
            'flightAmTime': item.flightAmTime,
            'flightLateTime': item.flightLateTime,
            'flightPmTime': item.flightPmTime,
            'flightAbsentTime': item.flightAbsentTime
        };
        this.requestArgs.url = "/flight/api/save_or_update";
        this.requestArgs.systemName = "attendance";
        this.http.httpPost(this.requestArgs).subscribe(res=> {
            if(res.code===0) {
                this._message.create('info', res.msg);
                this.getWorkShiftList();
                this.subscription$.destroy();
            } else {
                this._message.create('info', res.msg);
            }
        });
    }

    /**
     * 编辑班次
     * @param {WorkShiftModel} item
     */
    editWorkShift(item:WorkShiftModel) {
        this.requestArgs.body = {
            'id': item.id,
            'flightName': item.flightName,
            'flightAmTime': item.flightAmTime,
            'flightLateTime': item.flightLateTime,
            'flightPmTime': item.flightPmTime,
            'flightAbsentTime': item.flightAbsentTime
        };
        this.requestArgs.url = "/flight/api/save_or_update";
        this.requestArgs.systemName = "attendance";
        this.http.httpPost(this.requestArgs).subscribe(res=> {
            if(res.code===0) {
                this._message.create('info', res.msg);
                this.getWorkShiftList();
                this.subscription$.destroy();
            } else {
                this._message.create('info', res.msg);
            }
        });
    }

    /**
     * 删除班次
     * @param {WorkShiftModel} item
     */
    delWorkShift(ids) {
        this.requestArgs.body = ids;
        this.requestArgs.url = "/flight/api/delete";
        this.requestArgs.systemName = "attendance";
        this.http.httpPost(this.requestArgs).subscribe(res=> {
            if(res.code===0) {
                this._message.create('info', res.msg);
                this.getWorkShiftList();
            } else {
                this._message.create('info', res.msg);
            }
        });
    }

}
