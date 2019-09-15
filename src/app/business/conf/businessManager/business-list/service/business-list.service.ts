import {Injectable, ViewChild} from '@angular/core';
import {HttpClientService} from "../../../../../shared/service/httpClient.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RequestArgs} from "../../../../../shared/model/request-args";
import {BusinessListModel} from "../model/business-list.model";
import {TableComponent} from "../../../../../plugins/component/table/table.component";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {AdapterGroupListResolverModel} from "../../../../../shared/model/adapter-group-list-resolver.model";

@Injectable()
export class BusinessListService {
    /**在父组件中调用table组件*/
    @ViewChild(TableComponent) child: TableComponent;
    /**实体类*/
    public requestArgs: RequestArgs = new RequestArgs();
    private adapterGroupList;

    /**商户列表实体类*/
    public businessListModel: BusinessListModel = new BusinessListModel();
    constructor(public http: HttpClientService,public router: Router,
                public modal: NzModalService,public message: NzMessageService,public activatedRoute: ActivatedRoute) {
        this.requestArgs.systemName = 'wlanscope';
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
        this.adapterGroupList = new AdapterGroupListResolverModel(activatedRoute, router,message).adapterGroupList;
    }
    /**获取商家表格数据*/
    protected getBusinessTableData() {
        this.requestArgs.url = "/api/v1/businesses";
        this.http.httpGet(this.requestArgs)
            .subscribe(
                res => {
                    if (res.code === 0) {
                        this.businessListModel.businessTableData = res.result;
                    } else if (res.code ===9) {
                        this.businessListModel.businessTableData = [];
                    }  else {
                        alert(res.msg);
                    }
                });
    }
}
