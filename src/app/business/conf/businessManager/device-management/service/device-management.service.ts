import {Injectable, ViewChild} from '@angular/core';
import {HttpClientService} from "../../../../../shared/service/httpClient.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TableComponent} from "../../../../../plugins/component/table/table.component";
import {DeviceManagementModel} from "../model/device-management.model";
import {BusinessListResolverModel} from "../../../../../shared/model/business-list-resolver.model";
import {RequestArgs} from "../../../../../shared/model/request-args";


@Injectable()
export class BusinessListService {
    /**表格的总数据*/
    public totalDataLength: any;
    /**http请求*/
    public requestArgs: RequestArgs = new RequestArgs();
    /**商家Id*/
    public businessId: any;
    /**设备管理 实体类*/
    public deviceManagementModel: DeviceManagementModel = new DeviceManagementModel();
    /**在父组件中引入table组件*/
    @ViewChild(TableComponent) child: TableComponent;
    constructor(private http: HttpClientService,public router: Router,private activatedRoute: ActivatedRoute) {
        this.businessLinkList(this.activatedRoute, this.router);
        if(this.deviceManagementModel.dropDowns) {
            this.businessId =this.deviceManagementModel.dropDowns[0]['id'];
        }
        this.requestArgs.systemName = 'wlanscope';
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
    }
    /**获取商家列表下拉框数据*/
    protected businessLinkList(activatedRoute: ActivatedRoute,router: Router) {
        this.deviceManagementModel.dropDowns = new BusinessListResolverModel(activatedRoute, router).businessList;
    }
    /** 获取设备管理列表表格数据 */
    protected getDeviceManagementTableData(businessId) {
        this.requestArgs.url = "/api/v1/ap_info/"+businessId+"/list";
        this.http.httpGet(this.requestArgs)
            .subscribe(
                res => {
                    switch(res.code) {
                        case 0:
                            this.totalDataLength = res.result.length;
                            this.deviceManagementModel.deviceManagementTableData = res.result;
                            break;
                        case 9:
                            this.totalDataLength = 0;
                            this.deviceManagementModel.deviceManagementTableData = [];
                            break;
                    }
                });
    }
}
