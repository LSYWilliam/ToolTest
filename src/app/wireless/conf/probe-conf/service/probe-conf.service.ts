import {Injectable, ViewChild} from "@angular/core";
import {NetworkListResolverModel} from "../../../../shared/model/network-list-resolver.model";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClientService} from "../../../../shared/service/httpClient.service";
import {RequestArgs} from "../../../../shared/model/request-args";
import {NzMessageService, NzModalService, NzModalSubject} from "ng-zorro-antd";
import {ProbeConfModel} from "../model/probe-conf.model";
import {ProbeConfOutModel} from "../../../../shared/component/probe-conf/model/probe-conf-out.model";
import {TableComponent} from "../../../../plugins/component/table/table.component";


/**
 * 无线-配置-探针管理数据获取类
 * @class ProbeConfService
 */

@Injectable()
export class ProbeConfService {
    @ViewChild(TableComponent) child: TableComponent;
    /** 页面Model */
    public probeConfModel: ProbeConfModel = new ProbeConfModel();
    /** http请求参数 */
    public requestArgs: RequestArgs = new RequestArgs();
    /**网络ID*/
    public netID: string;
    /**是否显示加载中 false: 不显示  true: 显示  */
    public nzSpinning: boolean = false;
    /**企业ID*/
    public businessId: string;
    /**订阅模态框*/
    subscription$: NzModalSubject;
    delSubscription$: NzModalSubject;

    /**
     * 构造函数
     * @param http HttpClientService
     *              注入http客户端服务
     * @param activatedRoute  ActivatedRoute
     *              注入路由服务
     * @param modalService NzModalService
     *              注入佐罗模态服务
     * @param router  Router
     *              注入路由服务
     * @param _message  错误提示框
     *              注入路由服务
     * @description
     *      1、设置统一请求参数的系统名称与ticket
     *      2、类实例化的时候获取网络列表的下拉菜单值
     */
    constructor(private router: Router,
                private http: HttpClientService,
                private activatedRoute: ActivatedRoute,
                public modalService: NzModalService,
                public _message: NzMessageService) {
        this.requestArgs.systemName = "wlanscope";
        // this.requestArgs.systemName = "test";
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
        this.getNetworkList(this.activatedRoute, this.router);
        if (this.probeConfModel.dropDowns != null) {
            this.netID = this.probeConfModel.dropDowns[0].id;
        }
    }

    /**
     * 获取网络列表下拉菜单的内容
     * @param activatedRoute  ActivatedRoute
     *              路由服务
     * @param router  Router
     *             路由服务
     */
    protected getNetworkList(activatedRoute: ActivatedRoute, router: Router) {
        this.probeConfModel.dropDowns = new NetworkListResolverModel(activatedRoute, router).networkList;
    }

    /**
     * 获取探针管理全局设置的参数
     */
    protected getGlobalProbeConfValue() {
        this.nzSpinning = true;
        this.requestArgs.url = `/api/v1/net_probe_config/business/${this.businessId}`;
        this.http.httpGet(this.requestArgs).subscribe(
            res => {
                this.nzSpinning = false;
                if (res.code === 0) {
                    console.log(res.result);
                    this.probeConfModel.tableData = res.result;
                } else {
                    this.probeConfModel.tableData = [];
                }
            }
        );
    };

    /**
     * 商户详细信息查询
     */
    protected getRegisterInfo() {
        let requestArgs = new RequestArgs();
        requestArgs.systemName = "wlanscope";
        requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
        requestArgs.url = "/api/v1/businesses/detail";
        this.http.httpGet(requestArgs).subscribe(
            res => {
                if (res.code === 0) {
                    this.businessId = res.result.businessId;
                    this.getGlobalProbeConfValue();
                }
            }
        );
    }

    /**
     * 提交用户修改后的全局配置属性
     * @param globalConf  ProbeConfOutModel
     *              修改后的属性值
     */
    protected patchGlobalConf(globalConf: ProbeConfOutModel) {
        this.nzSpinning = true;
        this.requestArgs.body = globalConf.getPatchData();
        this.requestArgs.url = '/api/v1/net_probe_config/' + this.netID;

        this.http.httpPatch(this.requestArgs).subscribe(
            res => {
                if (res.code === 0) {
                    this.probeConfModel.tableData = res.result;
                }
            }
        );
    }
}
