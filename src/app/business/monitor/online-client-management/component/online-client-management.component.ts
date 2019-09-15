import {Component, OnInit} from '@angular/core';
import {OnlineClientManagementService} from "../service/online-client-management.service";
import {OnlineClientHeadModel} from "../model/online-client-head.model";
import {routerTransition} from "../../../../animations/route-animations";

@Component({
    selector: 'app-online-client-management',
    templateUrl: './online-client-management.component.html',
    styleUrls: ['./online-client-management.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})
export class OnlineClientManagementComponent extends OnlineClientManagementService implements OnInit {
    /** 定义个windowHeight类型 */
    public windowHeight: number;

    ngOnInit() {
        this.windowHeight = window.innerHeight-200;
    }

    selectRadioValue(value) {
        switch(value) {
            case 'authUser':
                this.userKind="认证";
                this.child.gridApi.setColumnDefs(new OnlineClientHeadModel(false).tableInput.tableHeaderData);
                this.getUserData(value, this.paramKind, this.id);
                break;
            case 'associatedUser':
                this.userKind="关联";
                this.child.gridApi.setColumnDefs(new OnlineClientHeadModel(true).tableInput.tableHeaderData);
                this.getUserData(value, this.paramKind, this.id);
                break;
        }
    }

    cellClickJump(data) {
        switch(data.colDef.field) {
            case 'operate' :
                this.commonUtilService.customConfirm("请确认要下线该用户吗？",()=> {
                    if(data.data['userMac']) {
                        super.userOffLine(data.data);
                    } else {
                        this.message.error("该用户不存在正确的mac地址！");
                    }
                });
        }
    }
}
