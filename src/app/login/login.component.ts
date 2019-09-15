import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {HttpClientService} from "../shared/service/httpClient.service";
import {RequestArgs} from "../shared/model/request-args";
import {ValidateModel} from "./model/validate.model";
import {Subscription} from "rxjs/Subscription";
import {MenuModel} from "../layouts/model/menu.model";
import {NoAuthErrorComponent} from "../plugins/component/error/noAuth-error/noAuth-error.component";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/timer';


/**
 * 登录组件
 * @class LoginComponent
 */
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit,OnDestroy {
    /**验证码*/
    public validateCode: string;
    /**登录返回的信息*/
    public loginMessage: any;
    /**http请求*/
    public requestArgs: RequestArgs;
    /**取消订阅 登录请求*/
    private login$: Subscription;
    /**取消订阅 验证码请求*/
    private validData$: Subscription;
    public indexZ = "qwertyu";

    constructor(
        private router: Router, private http: HttpClientService
    ) {
        this.requestArgs = new RequestArgs();
        this.requestArgs.systemName = "system";
        console.log("MjAxOC0wNy0yNyBWMS4xLjMtUjE=");
    }
    /** 广告图切换*/
    array = [ "../../assets/img/ad1.png", "../../assets/img/ad2.png", "../../assets/img/ad3.png"];

    // array = null;

    /** 登录*/
    loginEvent(value) {
        this.requestArgs.body = value;
        this.requestArgs.url = "/ewifi/system/console/login";
        this.login$ = this.http.httpPost(this.requestArgs)
            .subscribe(
                res => {
                    this.loginMessage = res;
                    /**当密码或者验证码输错时，验证码自动刷新。*/
                    if (res.code !== 0) {
                        this.getValidate();
                    }
                }
        );
    }

    /** 登录成功事件*/
    loginSuccessEvent() {
        this.requestArgs.systemName = "system";
        this.requestArgs.url = '/ewifi/system/console/permission/find_user_menu_permission';
        this.requestArgs.header = {'ticket':this.loginMessage.result.ticket };
        this.requestArgs.body = {'permissionSystem': 'wlanscope'};
        this.http.httpPost(this.requestArgs)
            .subscribe(
                res => {
                    if (res.code === 0) {
                        if (res.result.length) {
                            let menuModel: MenuModel = new MenuModel();
                            let value = menuModel.getFirstLink(res.result);
                            this.router.navigateByUrl(menuModel[value][2]);
                        } else {
                            this.router.navigateByUrl('noAuth');
                        }
                    }
                }
            );
    }

    /**获取验证码*/
    private getValidate() {
       Observable.timer(0, 1800000).subscribe(
           (i) => {
               this.requestArgs.url = "/ewifi/system/console/captcha";

               this.validData$ = this.http.httpPost(this.requestArgs)
                   .subscribe(
                       res => {
                           if (res.code === 0) {
                               const test1: ValidateModel = new ValidateModel(<ValidateModel> res.result);
                               this.validateCode = 'data:image/png;base64,' + test1.getCaptchaImg;
                           } else {
                               this.router.navigateByUrl('/systemError');
                           }
                       }
                   );
           }
       );

    }

    /**点击验证码,切换验证码*/
    validateCodeEvent() {
        this.getValidate();
    }
    /**取消订阅*/
    ngOnDestroy(): void {
        if (this.login$ != undefined) {
            this.login$.unsubscribe();
        }

        if (this.validData$ != undefined) {
            this.validData$.unsubscribe();
        }
    }
    /**页面数据初始化*/
    ngOnInit() {
        this.getValidate();
    }
}

