import {Injectable, ViewChild} from '@angular/core';
import {ZorroTableComponent} from "../../../../../shared/component/zorro-table/zorro-table.component";
import {HttpClientService} from "../../../../../shared/service/httpClient.service";
import {RequestArgs} from "../../../../../shared/model/request-args";
import {VisitorRegistrationHead} from "../model/visitor-registration-head.model";
import {NzMessageService, NzModalService, NzModalSubject} from "ng-zorro-antd";
import {VisitorRegistrationModel} from "../model/visitor-registration.model";
import {CommonUtilService} from "../../../../../shared/service/common-util.service";
import * as moment from "moment";

@Injectable()
export class VisitorRegistrationService {
    @ViewChild(ZorroTableComponent) child: ZorroTableComponent;
    tableInput:any;
    srcRequestArgs:any;
    requestArgs: RequestArgs = new RequestArgs();
    metaData:any;

    operationFlag: string;

    _startDate = null;
    _endDate = null;

    /**订阅模态框*/
    subscription$: NzModalSubject;

    constructor(private http: HttpClientService, public modalService: NzModalService,
                public _message: NzMessageService,public commonUtilService: CommonUtilService) {
        this.tableInput = new VisitorRegistrationHead().tableInput;
        this.metaData = new VisitorRegistrationHead().metaData;
        this.srcRequestArgs = new RequestArgs();
        this.srcRequestArgs.header = {'ticket': sessionStorage.getItem('ticket'),'Content-Type':'application/json'};
        this.srcRequestArgs.url="/hzfacade/ewifi/list-visitor-info";
        this.srcRequestArgs.systemName = "attendance";

        this.requestArgs = new RequestArgs();
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket'),'Content-Type':'application/json'};

        let firstDate = new Date();
        firstDate.setDate(1);
        this._startDate = firstDate;
        this._endDate = new Date();

        this.srcRequestArgs.body= {
            "startTime":moment(firstDate).format("YYYY-MM-DD"),
            "endTime":moment(new Date()).format("YYYY-MM-DD")
        };

    }

    /**
     * 增加访客服务
     * @param {VisitorRegistrationModel} item
     */
    addVisitor(item:VisitorRegistrationModel) {
        this.requestArgs.body = item;
        this.requestArgs.url = "/hzfacade/ewifi/do-add-visitor-info";
        this.requestArgs.systemName = "attendance";
        this.http.httpGet(this.requestArgs).subscribe(res=> {
            if(res.code===0) {
                this._message.create('info', res.msg);
                this.child.refreshData(false);
                this.subscription$.destroy();
            } else {
                this._message.create('error', res.msg);
            }
        });
    }

    /**
     * 编辑访客服务
     * @param {VisitorRegistrationModel} item
     */
    editVisitor(item:VisitorRegistrationModel) {
        this.requestArgs.body = item;
        this.requestArgs.url = "/hzfacade/ewifi/do-modify-visitor-info";
        this.requestArgs.systemName = "attendance";
        this.http.httpGet(this.requestArgs).subscribe(res=> {
            if(res.code===0) {
                this._message.create('info', res.msg);
                this.child.refreshData(false);
                this.subscription$.destroy();
            } else {
                this._message.create('error', res.msg);
            }
        });
    }

    /**
     * 删除访客服务
     * @param ids
     */
    delVisitor(ids) {
        this.requestArgs.body = {
            'visiteIds': ids.join(",")
        };
        this.requestArgs.url = "/hzfacade/ewifi/do-delete-visitor-list";
        this.requestArgs.systemName = "attendance";
        this.http.httpGet(this.requestArgs).subscribe(res=> {
            if(res.code===0) {
                this._message.create('info', res.msg);
                this.child.refreshData(false);
            } else {
                this._message.create('error', res.msg);
            }
        });
    }
}
