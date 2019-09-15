import {Injectable, ViewChild} from '@angular/core';
import {AlertManagementDropDownsModel} from "../model/alert-management-drop-downs.model";
import {ActivatedRoute, Router} from "@angular/router";
import {NetworkListResolverModel} from "../../../../shared/model/network-list-resolver.model";
import {AlertListModel} from "../model/alert-list.model";
import {RequestArgs} from "../../../../shared/model/request-args";
import {HttpClientService} from "../../../../shared/service/httpClient.service";
import {AlertHeadModel} from "../model/alert-head.model";
import {NzMessageService} from "ng-zorro-antd";
import {TreeTableComponent} from "../../../../plugins/component/tree-table/tree-table.component";
import {AlertReceiverListModel, AlertReceiverMember} from "../model/alert-receiver-list.model";
import {AlertReceiverTableComponent} from "../component/alert-receiver-table/alert-receiver-table.component";
import {TwoExchangeListModel} from "../model/two-exchange-list.model";
import {RegisterInfoModel} from "../../../../business/conf/business-information/model/register-info.model";
import {BusinessInfomationInterface} from "../../../../business/conf/business-information/model/business-infomation.interface";
import {TwoExchangeTableComponent} from "../component/two-exchange-table/two-exchange-table.component";

@Injectable()
export class AlertManagementService {
    @ViewChild(TreeTableComponent) child: TreeTableComponent;
    @ViewChild(AlertReceiverTableComponent) receiverChild: AlertReceiverTableComponent;
    @ViewChild(TwoExchangeTableComponent) exchangeTableChild: TwoExchangeTableComponent;

    public alertManagementDropDownsModel: AlertManagementDropDownsModel = new AlertManagementDropDownsModel();
    public alertListModel: AlertListModel;
    public oldAlertListModel: AlertListModel;
    public requestArgs:RequestArgs = new RequestArgs();
    public requestArgs2:RequestArgs = new RequestArgs();
    public businessId: number;
    public netId: number;
    public treeTableInput: TreeTableInterface;
    public alertReceiverListModel:AlertReceiverListModel;
    public twoExchangeListModel: TwoExchangeListModel = new TwoExchangeListModel();
    public registerInfo: RegisterInfoModel = new RegisterInfoModel();

    public conditionExpression: string;
    public chosedItems: any;

    constructor(protected http: HttpClientService, public activatedRoute: ActivatedRoute,route: Router
        ,public _message: NzMessageService) {
        this.alertManagementDropDownsModel.dropDowns = new NetworkListResolverModel(activatedRoute,route).networkList;
        if (this.alertManagementDropDownsModel.dropDowns != null) {
            let pNetId = 0 + this.alertManagementDropDownsModel.dropDowns[0].id;
            this.netId = parseInt(pNetId, 0);
            let alertHeadModel = new AlertHeadModel();
            this.treeTableInput=alertHeadModel.tableInput;

            this.requestArgs.systemName = 'wlanscope';
            this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket'),'Content-Type':'application/json;charset=UTF-8'};
            this.requestArgs2.systemName = 'system';
            this.requestArgs2.header = {'ticket': sessionStorage.getItem('ticket'),'Content-Type':'application/json;charset=UTF-8'};
            this.getAlertList();
        }
    }

    /**
     * 获取告警列表
     */
    public getAlertList() {
        this.requestArgs.url = `/api/v1/alarm/list/${this.netId}`;
        this.requestArgs.body = {};
        this.http.httpGet(this.requestArgs).subscribe(res => {
            if(res.code===0) {
                if(this.oldAlertListModel) {
                    let tmp:AlertListModel = res.result;
                    this.alertListModel=this.copyAlertContact(tmp,this.oldAlertListModel);
                } else {
                    this.alertListModel=res.result;
                }
                this.conditionExpression="firstShow";
            } else {
                this.alertListModel = new AlertListModel();
                this.alertListModel.alertItem=[];
                this._message.error(res.msg);
            }
        });
    }

    /**
     * 获取告警人员列表
     */
    public getAlertMemberList() {
        this.requestArgs.url = "/api/v1/businesses/detail";
        this.requestArgs.body = {};
        this.http.httpGet(this.requestArgs).subscribe(
            res => {
                if (res.code === 0) {
                    this.registerInfo.setData(<BusinessInfomationInterface> res.result);
                    this.businessId = this.registerInfo.businessId;
                    this.requestArgs2.body = {'businessId': this.businessId };
                    this.requestArgs2.url = "/ewifi/system/console/user/user_list";
                    this.requestArgs2.systemName = 'system';
                    this.http.httpPost(this.requestArgs2).subscribe(ult => {
                        if(ult.code===0) {
                            this.alertReceiverListModel=ult.result;
                        } else {
                            this._message.error(ult.msg);
                        }
                    });
                }
            }
        );
    }

    public saveAlertConfService(rowData) {
        this.requestArgs.body = rowData;
        this.requestArgs.url=`/api/v1/alarm/save/${this.netId}`;
        this.http.httpPost(this.requestArgs).subscribe(res => {
            if(res.code===0) {
                this._message.info("保存成功！");
                this.getAlertList();
            } else {
                this._message.error(res.msg);
            }
        });
    }

    /**
     * 批量保存新增告警人员
     */
    public addAlertReceiver(alarmIds: Array<number>, userIds: Array<number>) {
        this.requestArgs.body = {
            'ids' :alarmIds,
            'receivers':userIds
        };
        this.requestArgs.url="/api/v1/alarm/receiver/add_batch";
        this.http.httpPost(this.requestArgs).subscribe(res => {
            if(res.code===0) {
                this._message.info("增加成功！");
                this.getAlertList();
            } else {
                this._message.error(res.msg);
            }
        });
    }

    /**
     * 批量移除告警接收人
     * @param {Array<any>} alarmUserIds
     */
    public removeAlertReceiver(alarmIds: Array<number>, userIds: Array<number>) {
        this.requestArgs.body = {
            'ids' :alarmIds,
            'receivers':userIds
        };
        this.requestArgs.url="/api/v1/alarm/receiver/delete_batch";
        this.http.httpPost(this.requestArgs).subscribe(res => {
            if(res.code===0) {
                this._message.info("移除成功！");
                this.getAlertList();
                // this.conditionExpression="firstShow";
            } else {
                this._message.error(res.msg);
            }
        });
    }

    /**
     * 获取单个告警接收人
     * @param {number} alarmId
     */
    public getSingleAlertReceiver(alarmId:number) {
        this.requestArgs.url=`/api/v1/alarm/receiver/${alarmId}`;
        this.requestArgs.body = {};
        this.http.httpGet(this.requestArgs).subscribe(res => {
            if(res.code===0) {
                this.twoExchangeListModel=res.result;
                this.oldAlertListModel = this.alertListModel;
                this.conditionExpression="editSingleAlertMember";
            } else {
                this._message.error(res.msg);
            }
        });
    }

    /**
     * 修改单个告警接收人
     * @param {number} alarmId
     * @param {Array<AlertReceiverMember>} selectedList
     */
    public updateSingleAlertReceiver(alarmId:number,selectedList:Array<number>) {
        this.requestArgs.body = {
            'id':alarmId,
            'receivers':selectedList
        };
        this.requestArgs.url="/api/v1/alarm/receiver/update";
        this.http.httpPost(this.requestArgs).subscribe(res => {
            if(res.code===0) {
                this._message.info("保存成功！");
                this.getAlertList();
                this.conditionExpression="firstShow";
            } else {
                this._message.error(res.msg);
            }
        });
    }

    protected copyAlertContact(p_new,p_old) {
        for(let i in p_old) {
            for(let j in p_old[i].participants) {
                p_new[i].participants[j].threshold=p_old[i].participants[j].threshold;
                p_new[i].participants[j].isEmailDes=p_old[i].participants[j].isEmailDes;
                p_new[i].participants[j].isEmail=p_old[i].participants[j].isEmail;
            }
        }
        return p_new;
    }
}
