import { Injectable } from '@angular/core';
import {HttpClientService} from "../../../../../shared/service/httpClient.service";
import {RequestArgs} from "../../../../../shared/model/request-args";
import {OnlineStaffModel} from "../model/online-staff.model";
import {OnlineStaffResolverModel} from "../../../../../shared/model/online-staff-resolver.model";
import {ActivatedRoute} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd";

@Injectable()
export class OnlineStaffService {

    staffNum: number;
    requestArgs = new RequestArgs();
    options:any;

    constructor(protected http: HttpClientService,private activatedRoute: ActivatedRoute,public _message: NzMessageService) {
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket'),'Content-Type':'application/json'};
        let data = new OnlineStaffResolverModel(activatedRoute).onlineUsersData;
        let yList,xList;
        if(data) {
            yList=data.yList;
            xList=data.xSet;
            this.staffNum = data.total;
        }
        const draw = new OnlineStaffModel(xList,yList);
        this.options = draw.option;
    }
}
