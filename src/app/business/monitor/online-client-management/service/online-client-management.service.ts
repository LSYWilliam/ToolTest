import {Injectable, ViewChild} from '@angular/core';
import {OnlineClientHeadModel} from "../model/online-client-head.model";
import {OnlineClientManagementModel} from "../model/online-client-management.model";
import {HttpClientService} from "../../../../shared/service/httpClient.service";
import {NzMessageService} from "ng-zorro-antd";
import {RequestArgs} from "../../../../shared/model/request-args";
import {TableComponent} from "../../../../plugins/component/table/table.component";
import {ActivatedRoute} from "@angular/router";
import {CommonUtilService} from "../../../../shared/service/common-util.service";
import { Location } from '@angular/common';

@Injectable()
export class OnlineClientManagementService {
    @ViewChild(TableComponent) child: TableComponent;

    public requestArgs: RequestArgs = new RequestArgs();
    public onlineClientHeadModel: OnlineClientHeadModel = new OnlineClientHeadModel(false);
    public onlineClientManagementModel: OnlineClientManagementModel = new OnlineClientManagementModel();
    public radioValue = "authUser";
    public userKind = "认证";
    public userNumber = 0;
    /**ap or net*/
    public paramKind;
    /**apid or netid*/
    public id;
    /**src url*/
    public url;

    constructor(private http: HttpClientService,
                private route: ActivatedRoute,
                public message: NzMessageService,
                private location: Location,
                public commonUtilService: CommonUtilService) {

        this.onlineClientManagementModel.tableData = [];

        this.requestArgs.systemName = 'wlanscope';
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket'), 'Content-Type': 'application/json;charset=UTF-8'};

        if(this.location.path()==="/online-client-management") {
            this.paramKind = "business";
            this.id = "";
            this.url = "";
        } else {
            this.route.paramMap.subscribe(
                res => {
                    this.paramKind = res.get('type');
                    this.id = res.get('id');
                    this.url = res.get('url');
                }
            );
        }

        this.getUserData('authUser', this.paramKind, this.id);
    }

    public getUserData(userKind: string, paramKind: string, netId: any) {
        this.onlineClientManagementModel.tableData = [];
        this.userNumber = 0;
        switch (userKind) {
            case 'authUser':
                this.requestArgs.url = `/api/v1/overview/${paramKind}/authentication_client/${netId}`;
                break;
            case 'associatedUser':
                this.requestArgs.url = `/api/v1/overview/${paramKind}/connect_client/${netId}`;
                break;
        }
        this.http.httpGet(this.requestArgs).subscribe(res => {
            if (res.code === 0) {
                this.onlineClientManagementModel.tableData = res.result;
                this.userNumber = res.result.length || 0;
            } else {
                this.onlineClientManagementModel.tableData = [];
                this.userNumber = 0;
            }
        });
    }

    public userOffLine(item) {
        this.requestArgs.url = "/api/v1/overview/client/offline";
        this.requestArgs.body = {
            "userMac": item.userMac,
            "apSn": item.apSn,
            "wlanId": item.wlanId,
            "authType": item.authType
        };
        this.http.httpPost(this.requestArgs).subscribe(res => {
            if (res.code === 0) {
                this.message.info(res.msg);
                this.getUserData(this.radioValue, this.paramKind, this.id);
            } else if (res.code !== 9) {
                this.message.info(res.msg);
            }
        });
    }
}
