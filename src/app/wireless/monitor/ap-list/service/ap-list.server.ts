import {Injectable} from "@angular/core";
import {NetworkListResolverModel} from "../../../../shared/model/network-list-resolver.model";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClientService} from "../../../../shared/service/httpClient.service";
import {RequestArgs} from "../../../../shared/model/request-args";
import {ApListModel} from "../model/ap-list.model";
import {ApListTableInterface} from "../model/ap-list-table.interface";
import {ApListTableModel} from "../model/ap-list-table.model";
import {NzMessageService, NzModalService} from "ng-zorro-antd";

@Injectable()
export class ApListServer {
    /** 定义ApListModel类型的变量 */
    public apListModel: ApListModel = new ApListModel();

    /**
     * 构造函数
     * @param http HttpClientService
     *                  http请求方法
     * @param router  activatedRoute
     *                 路由方法
     *
     */
    constructor(public http: HttpClientService,
                public router: Router,
                public modalService: NzModalService,
                private activatedRoute: ActivatedRoute,
                public message: NzMessageService) {
        this.getNetworkList(this.activatedRoute, this.router);
    }

    /**
     * 获取跳转到AP详情的页面的方法
     * @param id:    string
     *        apSn : string
     * @description
     *      跳转到AP详情页面
     */
    protected getApIdJump(id: string, apSn: string) {
        this.router.navigate(["/ap-details/" , id, "/ap-list", apSn],
            {skipLocationChange: true });
    }

    /**
     * 获取网络名称的方法
     * @param activatedRoute router
     *                      http请求参数， 路由方法
     */
    protected getNetworkList(activatedRoute: ActivatedRoute, router: Router) {
        this.apListModel.dropDowns = new NetworkListResolverModel(activatedRoute,router).networkList;
    }

    /**
     * 获取网络设备数的方法
     * @param requestArgs RequestArgs
     *        netId       string
     */
    protected getApCount(requestArgs: RequestArgs, netId: string) {
        requestArgs.url = '/api/v1/wireless/getApCount/' + netId;
        this.http.httpGet(requestArgs)
            .subscribe(
                res => {
                    if (res.code === 0) {
                        this.apListModel.apNum = res.result.apCounts;
                    }
                });
    }

    /**
     * 获取AP列表的方法
     * @param requestArgs RequestArgs
     *        netId       string
     */
    protected getApList(requestArgs: RequestArgs, netId: string) {
        requestArgs.url = "/api/v1/wireless/getApList/" + netId;
        this.http.httpGet(requestArgs).subscribe(
            res => {
                let data = [];
                for (let obj of res.result) {
                    data.push(new ApListTableModel(<ApListTableInterface> obj).toString());
                }
                this.apListModel.tableData = data;
            }
        );
    }
}
