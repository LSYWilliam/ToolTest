import {Inject, Injectable, OnDestroy, ViewChild} from "@angular/core";
import {HttpClientService} from "../../../../shared/service/httpClient.service";
import {RequestArgs} from "../../../../shared/model/request-args";
import {ActivatedRoute, Router} from '@angular/router';
import {TableComponent} from "../../../../plugins/component/table/table.component";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {NameListModel} from "../model/name-list.model";
import {DOCUMENT} from "@angular/common";

@Injectable()
export class BlackWhiteListService implements OnDestroy{
    /**名单的名称 白名单和黑名单*/
    public pageName: string;
    /**名单的类型 1：白名单  2：黑名单*/
    public pageType: string;
    /**黑白名单表格总数据*/
    public listCount: number;
    /**ssid的id*/
    public ssidId: number;
    /**初始化黑白名单列表数据*/
    public initList: any;
    /**黑白名单表格数据*/
    public rowData: NameListModel;
    /**取消订阅*/
    private routeParams: any;
    /**请求实体类*/
    protected requestArgs: RequestArgs = new RequestArgs();
    /**在父组件中引入子组件*/
    @ViewChild(TableComponent) public child: TableComponent;
    constructor(public http: HttpClientService, public router: Router,private activatedRoute: ActivatedRoute, public message: NzMessageService,
                public modalService: NzModalService, @Inject(DOCUMENT) private document: any) {
        this.requestArgs.systemName = "wlanscope";
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};

        /** 从URL上获得SSID，并获取该SSID的详细信息 */
        this.routeParams = activatedRoute.paramMap.subscribe(
            res => {
                this.pageType = res.get('type');
                this.ssidId = Number.parseInt(res.get('id'));
                this.rowData = new NameListModel(Number.parseInt(res.get('id')),Number.parseInt(res.get('type')));
                /** 1白名单  2 黑名单 */
                this.pageType ==='1' ? this.pageName = res.get('name') + '-白名单' : this.pageName = res.get('name') + '-黑名单';
                this.requestArgs.url = '/api/v1/blackAndWhite/getList/' + res.get('id') + '/' + res.get('type');
                this.getBlackWhiteLis(this.requestArgs);
            }
        );
    }

    /**获取黑白名单列表数据*/
    protected getBlackWhiteLis(requestArgs: RequestArgs) {
        this.http.httpGet(requestArgs).subscribe(
            res => {
                if (res.code === 0) {
                    this.listCount = res.pagination['totalElements'];
                    this.initList = res.result;
                } else {
                    this.router.navigateByUrl('/systemError');
                }
            }
        )
    }

    /**删除黑白名单列表数据*/
    protected deleteBlackWhiteListData(requestArgs: RequestArgs, table: any) {
        this.http.httpDelete(requestArgs).subscribe(
            res => {
                if (res.code === 0) {
                    table.singleDelete();
                    this.message.success('删除成功！');
                } else {
                    this.message.error('删除失败！');
                    this.message.error(res.msg);
                }
            }
        );
    }

    /**模板下载*/
    template(requestArgs: RequestArgs, name) {
        this.http.httpGet2(requestArgs).subscribe(
            res => {
                let blob = new Blob([res], {type: "application/vnd.ms-excel"});
                let objectUrl = URL.createObjectURL(blob);
                let a = this.document.createElement('a');
                this.document.body.appendChild(a);
                a.setAttribute('style', 'display:none');
                a.setAttribute('href', objectUrl);
                let filename = name + ".xlsx";
                a.setAttribute('download', filename);
                a.click();
                URL.revokeObjectURL(objectUrl);
            }
        )
    }

    /**取消订阅*/
    ngOnDestroy() {
        this.routeParams.unsubscribe();
    }

}
