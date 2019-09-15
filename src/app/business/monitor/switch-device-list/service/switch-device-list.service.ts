import {HttpClientService} from "../../../../shared/service/httpClient.service";
import {RequestArgs} from "../../../../shared/model/request-args";
import {Injectable} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {NetworkListResolverModel} from "../../../../shared/model/network-list-resolver.model";

@Injectable()
export class SwitchDeviceListService {
    /**http请求*/
    public requestArgs: RequestArgs = new RequestArgs();
    /**网络列表数据*/
    public networkList: any;
    /**默认的网络名称*/
    public defaultNetName: any;
    /**表格行数据*/
    public rowData: any;

    constructor(public http: HttpClientService, public modal: NzModalService, public activatedRoute: ActivatedRoute,
                public router: Router, public message: NzMessageService) {
        this.requestArgs.systemName = "wlanscope";
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
        this.networkList = new NetworkListResolverModel(activatedRoute,router).networkList;
        if (this.networkList) {
            this.defaultNetName = this.networkList[0].name;
            let pNetId = this.networkList[0].id;
            this.getSwitchList(parseInt(pNetId, 0));
        }
    }

    /**根据网络id获取交换机列表的数据*/
    protected getSwitchList(id) {
        this.requestArgs.systemName = 'wlanscope';
        this.requestArgs.url = `/api/v1/switch_info/net/${id}`;
        this.http.httpGet(this.requestArgs).subscribe(
            res => {
                if (res.code === 0) {
                     this.rowData = res.result;
                } else if (res.code === 1103||res.code === 9) {
                    this.rowData = [];
                }
            }
        );
    }
}
