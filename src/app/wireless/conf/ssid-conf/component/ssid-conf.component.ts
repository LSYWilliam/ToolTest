import {Component, OnDestroy, ViewChild} from '@angular/core';
import {routerTransition} from "../../../../animations/route-animations";
import {RequestArgs} from "../../../../shared/model/request-args";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClientService} from "../../../../shared/service/httpClient.service";
import {SsidConfInterface, SsidConfModel} from "../model/ssid-conf.model";
import {NzMessageService} from "ng-zorro-antd";
import {Subscription} from "rxjs/Subscription";
import {SsidItemComponent} from "../../../../shared/component/ssid-item/ssid-item.component";

/**
 * 当日概况模块
 * @class OverviewComponent
 */
@Component
({
    selector: 'app-ssid-conf',
    templateUrl: './ssid-conf.component.html',
    styleUrls: ['./ssid-conf.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})

export class SsidConfComponent implements OnDestroy {
    @ViewChild(SsidItemComponent) viewChildren: SsidItemComponent;
    /**初始化数据*/
    public initData: SsidConfInterface;
    /**网络id*/
    public netId: string;
    /**ssid*/
    // public ssid: string;
    /**ssid名称*/
    public ssidName: string;
    /**每一个ssid的全部数据*/
    private saveData: any;
    /**获取路由参数*/
    private routeParams: Subscription;

    private validateFlag = false;
    /** http请求参数 */
    private requestArgs: RequestArgs = new RequestArgs();

    constructor(private http: HttpClientService, public router: Router, private activatedRoute: ActivatedRoute, public message: NzMessageService) {
        this.requestArgs.systemName = "wlanscope";
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
        let ssid: string = '';
        /** 从URL上获得SSID，并获取该SSID的详细信息 */
        this.routeParams = activatedRoute.paramMap.subscribe(
            res => {
                const ssid = res.get('ssid');
                this.netId = res.get('netId');
                this.requestArgs.url = '/api/v1/wireless/getSsidInfo/' + ssid;
                this.http.httpGet(this.requestArgs).subscribe(
                    res => {
                        if (res.code === 0) {
                            this.initData = <SsidConfInterface> res.result;
                            this.ssidName = this.initData.ssidName;
                        } else {
                            this.router.navigateByUrl('/systemError');
                        }
                    }
                );
            }
        );
    }

    /** 回退按钮事件 */
    public goBack() {
        this.router.navigate(['/ssid-details/', this.netId]);
    }

    /** 从子组件获取数据 */
    outData(data: SsidConfModel) {
        this.saveData = data.getData();
    }

    outValidateFlag(data: boolean) {
        this.validateFlag = data;
    }

    /** 点击保存按钮事件 */
    public saveGlobalData() {
        if (this.validateFlag || this.validateSSID()) {
            this.message.error('部分数据不符合要求，请输入正确的数据再保存！');
            return;
        }
        this.requestArgs.url = '/api/v1/wireless/save';
        this.requestArgs.body = this.saveData;
        this.http.httpPost(this.requestArgs).subscribe(
            res => {
                if (res.code === 0) {
                    this.message.success('保存成功！');
                    this.goBack();
                } else {
                    this.message.error('保存失败！');
                    this.message.error(res.msg);
                }
            }
        );
    }

    /**取消订阅*/
    ngOnDestroy() {
        this.routeParams.unsubscribe();
    }

    public validateSSID() {
        this.viewChildren.markAsDirtyFlag();
        let flag = false;
        for (let item in this.saveData.validateFlagStack) {
            if (this.saveData.validateFlagStack[item]) {
                flag = true;
            }
        }
        return flag;
    }
}
