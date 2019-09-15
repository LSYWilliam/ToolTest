import {Component, OnInit, ViewChild} from '@angular/core';
import {routerTransition} from "../../../../animations/route-animations";
import {StaticDataModel} from "../model/static-data.model";
import {BusinessInformationService} from "../service/business-information.service";
import {UserStaticDataModel} from "../model/user-static-data.model";

/**
 * 企业信息模块
 * @class BusinessInformationComponent
*/
@Component
({
    selector: 'app-business-information',
    templateUrl: './business-information.component.html',
    styleUrls: ['./business-information.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})

export class BusinessInformationComponent extends BusinessInformationService implements OnInit  {
    /** 定义个windowHeight类型 */
    public windowHeight: number;
    /**企业信息table表格静态数据*/
    public staticData : StaticDataModel = new StaticDataModel();
    /**企业信息点击查看按钮的用户table表格静态数据*/
    public userStaticData: UserStaticDataModel = new UserStaticDataModel();
    /**判断显示的 企业信息 or 用户信息*/
    public show: boolean;
    /**用户信息的回退按钮*/
    switchPage(status : boolean) {
        this.show = status;
    }
    /**页面数据初始化*/
    ngOnInit() {
        this.windowHeight = window.innerHeight-380;
        this.show = true;
        this.getRegisterInfo();
    }
}
