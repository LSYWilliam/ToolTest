import {Injectable, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {CommonUtilService} from "../../../../shared/service/common-util.service";
import {HttpClientService} from "../../../../shared/service/httpClient.service";
import {RequestArgs} from "../../../../shared/model/request-args";
import {DingInfoResolverModel} from "../../../../shared/model/ding-info-resolver.model";
import {ActivatedRoute} from "@angular/router";

@Injectable()
export class BusinessDingTalkService {
    @ViewChild('contentLoading') contentLoading: TemplateRef<any>;
    @ViewChild('contentSuccess') contentSuccess: TemplateRef<any>;
    @ViewChild('contentError') contentError: TemplateRef<any>;
    id;
    isVisibleMiddle = false;
    contentBody = this.contentLoading;
    oldDingCorpId;
    oldDingCorpSecret;
    dingCorpId;
    dingCorpSecret;
    disabledButton = false;
    businessInfo;

    constructor(public fb: FormBuilder, private http: HttpClientService, public _message: NzMessageService,
                public commonUtilService: CommonUtilService, public modalService: NzModalService, private activatedRoute: ActivatedRoute) {
        this.businessInfo = new DingInfoResolverModel(activatedRoute).businessInfo;
        console.log(this.businessInfo);
        if (this.businessInfo.reserve1) {
            this.oldDingCorpId = this.businessInfo.reserve1;
        }
        if (this.businessInfo.reserve2) {
            this.oldDingCorpSecret = this.businessInfo.reserve2;
        }
        // this.getRegisterInfo();
    }

    /**
     * 保存钉钉配置信息
     * @param param
     */
    config(param) {
        let requestArgs: RequestArgs = new RequestArgs();
        requestArgs.systemName = 'wlanscope';
        requestArgs.header = {'ticket': sessionStorage.getItem('ticket'), 'Content-Type': 'application/json;charset=UTF-8'};
        requestArgs.url = "/api/v1/businesses/save_or_update";
        requestArgs.body = {
            reserve1: param.dingCorpId,
            reserve2: param.dingCorpSecret
        };
        this.http.httpPost(requestArgs).subscribe(
            res => {
                if (res.code === 0 || res.code === 9) {
                    this._message.info(res.msg);
                    this.commonUtilService.customConfirm("是否要同步钉钉数据吗？", () => {
                        this.contentBody = this.contentLoading;
                        this.isVisibleMiddle = true;
                        this.trans();
                    });
                } else {
                    this._message.info(res.msg);
                }
            }
        );
    }

    trans() {
        let requestArgs: RequestArgs = new RequestArgs();
        requestArgs.systemName = 'wlanscope';
        requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
        requestArgs.url = "/api/v1/businesses/push/all/from/ding";
        this.http.httpPost(requestArgs).subscribe(
            res => {
                if (res.code === 0 || res.code === 9) {
                    setTimeout(() => {
                        this.contentBody = this.contentSuccess;
                    }, 3000);
                    this._message.info(res.msg);
                    setTimeout(() => {
                        if (this.isVisibleMiddle) {
                            this.isVisibleMiddle = false;
                        }
                    }, 6000);
                } else {
                    setTimeout(() => {
                        this.contentBody = this.contentError;
                    }, 2000);
                    this._message.info(res.msg);
                    setTimeout(() => {
                        if (this.isVisibleMiddle) {
                            this.isVisibleMiddle = false;
                        }
                    }, 4000);
                    this._message.info(res.msg);
                }
            }
        );
    }

    // protected getRegisterInfo() {
    //     let requestArgs: RequestArgs = new RequestArgs();
    //     requestArgs.systemName = 'wlanscope2';
    //     requestArgs.url = "/business/api/query/one";
    //     requestArgs.header = {'ticket': sessionStorage.getItem('ticket'), 'Content-Type': 'application/json;charset=UTF-8'};
    //     this.http.httpGet(requestArgs).subscribe(
    //         res => {
    //             if (res.code === 0) {
    //                 if (res.result.dingCorpId) {
    //                     this.oldDingCorpId = res.result.dingCorpId;
    //                 }
    //                 if (res.result.dingCorpSecret) {
    //                     this.oldDingCorpSecret = res.result.dingCorpSecret;
    //                 }
    //             }
    //         }
    //     );
    // }


}
