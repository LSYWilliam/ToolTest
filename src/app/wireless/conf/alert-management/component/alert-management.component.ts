import {Component, OnInit, ViewChild} from '@angular/core';
import {routerTransition} from "../../../../animations/route-animations";

import {AlertManagementService} from "../service/alert-management.service";


/**
 * 当日概况模块
 * @class OverviewComponent
*/
@Component
({
    selector: 'app-alert-management',
    templateUrl: './alert-management.component.html',
    styleUrls: ['./alert-management.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})

export class AlertManagementComponent extends AlertManagementService implements OnInit  {

    public rowData: any;
    public operationFlag: string;

    /**警报类型*/
    public editSingleAlertSpan: string;

    /**警报ID*/
    public chosedAlertId: number;

    public addFlag: boolean;
    public editSpan: string;

    public receiverOperFlag: string;

    public jumpConfPage( flag: string) {
        this.operationFlag=flag;
        this.child.selectSubNodes();
    }

    public getDropDown(value) {
        this.netId=value;
        this.getAlertList();
    }

    /**
     * 获取树表的选中项
     * @param items
     */
    public selectSubItems(items) {
        let array = [];
        let ids = [];
        for( let item of items ) {
            array.push(item.data);
            ids.push(item.data.id);
        }
        this.chosedItems = ids;
        const len = array.length;
        if (len === 0) {
            this._message.create('error', "至少要选中一行，才能进行操作！");
            return;
        }

        switch (this.operationFlag) {
            case 'add':
                this.addAlertMember(ids);
                break;
            case 'del':
                this.delAlertMember(ids);
                break;
        }
    }

    saveAlertConf() {
        this.child.outputTableData();
    }

    saveAlertData(value) {
        let tmpArray=[];
        value.forEach(res=> {
            if(res.participants) {
                tmpArray.push(res);
            }
        });
        this.saveAlertConfService(tmpArray);
    }

    addAlertMember(ids) {
        this.oldAlertListModel = this.alertListModel;
        this.conditionExpression="editAlertMember";
        this.editSpan="增加警报接收人";
        this.addFlag=true;
        this.getAlertMemberList();
    }

    delAlertMember(ids) {
        this.oldAlertListModel = this.alertListModel;
        this.conditionExpression="editAlertMember";
        this.editSpan="删除警报接收人";
        this.addFlag=false;
        this.getAlertMemberList();
    }

    /**
     * 点击表格跳转
     * @description
     *      1、获取netId
     *      2、跳转到网络详情
     */
    public cellClickJump(data) {
        switch(data.colDef.field) {
            case 'receiversDes' :
                this.chosedAlertId=data.data.id;
                this.editSingleAlertSpan=data.node.parent.data.typeDes+"-"+data.data.typeDes;
                this.getSingleAlertReceiver(this.chosedAlertId);

                break;
        }
    }

    add() {
        this.receiverOperFlag="add";
        this.receiverChild.child.selectAll();
    }

    del() {
        this.receiverOperFlag="del";
        this.receiverChild.child.selectAll();
    }

    getAlertReceiverData(items) {
        let ids = [];
        for( let item of items ) {
            ids.push(item.userId);
        }
        switch (this.receiverOperFlag) {
            case 'add':
                this.addAlertReceiver(this.chosedItems,ids);
                break;
            case 'del':
                this.removeAlertReceiver(this.chosedItems,ids);
                break;
        }

    }

    save() {
        this.exchangeTableChild.outputTableData();
    }

    exchangeTableOutputData(value) {
        this.updateSingleAlertReceiver(this.chosedAlertId,value);
    }

    goBack() {
        this.conditionExpression="firstShow";
    }

    ngOnInit() {
        this.conditionExpression="firstShow";
    }

}
