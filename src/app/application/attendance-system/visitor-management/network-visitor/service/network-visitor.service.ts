import {Injectable, ViewChild} from '@angular/core';
import {HttpClientService} from "../../../../../shared/service/httpClient.service";
import {RequestArgs} from "../../../../../shared/model/request-args";
import {NetworkVisitorHead} from "../model/network-visitor-head.model";
import {ZorroTableComponent} from "../../../../../shared/component/zorro-table/zorro-table.component";
import * as moment from "moment";
import {AccessTypeModel} from "../model/access-type.model";
import {NzMessageService} from "ng-zorro-antd";
import {ActivatedRoute} from "@angular/router";
import {AccessTypeResolverModel} from "../../../../../shared/model/access-type-resolver.model";

@Injectable()
export class NetworkVisitorService {
    @ViewChild(ZorroTableComponent) child: ZorroTableComponent;
    tableInput:any;
    srcRequestArgs:any;
    requestArgs: RequestArgs = new RequestArgs();
    metaData:any;
    networkVisitorHead: NetworkVisitorHead;
    accessTypeModel: AccessTypeModel = new AccessTypeModel();

    _startDate = null;
    _endDate = null;

    constructor(private http: HttpClientService, public _message: NzMessageService, private activatedRoute: ActivatedRoute,) {
        const accessTypeList = new AccessTypeResolverModel(activatedRoute).accessTypeList;
        this.accessTypeModel.dropDowns = accessTypeList;
        this.networkVisitorHead = new NetworkVisitorHead(this.accessTypeModel.dropDowns);
        this.tableInput = this.networkVisitorHead.tableInput;
        this.metaData = this.networkVisitorHead.metaData;

        this.srcRequestArgs = new RequestArgs();
        this.srcRequestArgs.header = {'ticket': sessionStorage.getItem('ticket'),'Content-Type':'application/json'};
        this.srcRequestArgs.url="/hzfacade/ewifi/visitor-join-info-list";
        this.srcRequestArgs.systemName = "attendance";

        let firstDate = new Date();
        firstDate.setDate(1);
        this._startDate = firstDate;
        this._endDate = new Date();

        this.srcRequestArgs.body= {
            "startTime":moment(firstDate).format("YYYY-MM-DD"),
            "endTime":moment(new Date()).format("YYYY-MM-DD")
        };
    }
}
