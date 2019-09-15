import {HttpClientService} from "../../../../shared/service/httpClient.service";
import {RequestArgs} from "../../../../shared/model/request-args";
import {Injectable} from "@angular/core";

import {ActivatedRoute, Router} from "@angular/router";
import {DropDownsInterface} from "../../../../shared/component/dropdown/model/dropdowns.model";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {NetworkListResolverModel} from "../../../../shared/model/network-list-resolver.model";
import {AlertHeadModel} from "../../../../wireless/conf/alert-management/model/alert-head.model";

@Injectable()
export class SwitchDeviceManagementService {
    /**http请求*/
    public requestArgs: RequestArgs = new RequestArgs();
    /**商家列表数据*/
    public businessList: any;
    /**默认的商家名称*/
    public defaultBusiName: any;
    /**默认的商家名称*/
    public businessId: any;
    /**表格行数据*/
    public rowData: any;
    public useDeviceSum: number;
    public deviceSum: number;

    constructor(public http: HttpClientService, public modal: NzModalService, public activatedRoute: ActivatedRoute,
                public router: Router, public message: NzMessageService) {
        this.requestArgs.systemName = "wlanscope";
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
        this.getBusinessList();
        this.useDeviceSum = this.useDeviceSum||0;
        this.deviceSum = this.deviceSum||0;
    }

    /**获取 模态框中 商家下拉框列表的数据*/
    protected getBusinessList() {
        this.requestArgs.url = '/api/v1/businesses/all';
        this.http.httpGet(this.requestArgs).subscribe(
            res => {
                if (res.code === 0) {
                    let tmp: Array<DropDownsInterface> = [];
                    res.result.forEach(
                        glt => {
                            tmp.push(<DropDownsInterface> {id: glt["businessId"], name: glt["businessName"]});
                        }
                    );
                    this.businessList = tmp;
                    this.defaultBusiName = tmp[0].name;
                    this.businessId = tmp[0].id;
                    console.log(this.businessId);
                    console.log(typeof this.businessId);
                    this.getSwitchList();
                } else {
                    this.router.navigateByUrl('/business-list');
                }
            }
        );
    }

    /**获取 交换机列表的数据*/
    protected getSwitchList() {
        this.requestArgs.systemName = 'wlanscope';
        this.requestArgs.url = `/api/v1/switch_info/business/${this.businessId}`;
        this.http.httpGet(this.requestArgs).subscribe(
            res => {
                console.log(res);
                if (res.code === 0) {
                    this.rowData = res.result;
                    let tmpUseDeviceSum = 0;
                    this.rowData.forEach(glt => {
                        if (glt.switchBelong === "已申购") {
                            tmpUseDeviceSum++;
                        }
                    });
                    this.useDeviceSum = tmpUseDeviceSum>0?tmpUseDeviceSum:0;
                    this.deviceSum = this.rowData.length?this.rowData.length:0;
                } else {
                    this.rowData = [];
                    this.useDeviceSum = 0;
                    this.deviceSum = 0;
                }
            }
        );
    }
}
