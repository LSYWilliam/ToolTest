import {Injectable} from "@angular/core";
import {NetworkListResolverModel} from "../../../../shared/model/network-list-resolver.model";
import {ActivatedRoute, Router} from "@angular/router";
import {SsidDetailsModel} from "../model/ssid-details.model";
import {HttpClientService} from "../../../../shared/service/httpClient.service";
import {RequestArgs} from "../../../../shared/model/request-args";
import {SsidInfoInterface, SsidInfoModel} from "../model/ssid-info.model";
import {NzMessageService} from "ng-zorro-antd";
import {Subscription} from "rxjs/Subscription";

@Injectable()
export class SsidDetailsCopyService {
    /**网络ID*/
    public netID: string;
    public netName: string;
    /** http请求参数 */
    public requestArgs: RequestArgs = new RequestArgs();
    /**ssid清单实体类*/
    public ssidDetailsModel: SsidDetailsModel = new SsidDetailsModel();
    /**获取路由参数*/
    private routeParams: Subscription;

    constructor(private http: HttpClientService, private activatedRoute: ActivatedRoute, private route: Router, public message: NzMessageService) {
        this.routeParams = activatedRoute.paramMap.subscribe(
            res => {
                this.netID = res.get('netId');
            });
        // this.getNetworkList(this.activatedRoute, this.route);
        if ((!this.netID) && this.ssidDetailsModel.dropDowns != null) {
            this.netID = this.ssidDetailsModel.dropDowns[0]['id'];
            this.netName = this.ssidDetailsModel.dropDowns[0]['name'];
        }
        this.requestArgs.systemName = 'wlanscope';
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
    }

    /**获取网络列表下拉框数据*/
    protected getNetworkList(activatedRoute: ActivatedRoute, route: Router) {
        this.ssidDetailsModel.dropDowns = new NetworkListResolverModel(activatedRoute, route).networkList;
        if(this.ssidDetailsModel.dropDowns&&this.netID) {
            this.ssidDetailsModel.dropDowns.forEach(glt => {
                if (glt.id.toString() === this.netID.toString()) {
                    this.netName = glt.name;
                }
            });
        }
    }

    /** 获取SSID列表数据 */
    protected getSSIDList() {
        this.requestArgs.url = "/api/v1/wireless/getSsidList/" + this.netID;
        this.http.httpGet(this.requestArgs)
            .subscribe(
                res => {
                    if (res.code === 0) {
                        let tmp: Array<SsidInfoModel> = [];
                        for (let obj of res.result) {
                            let ssidInfoModel = new SsidInfoModel();
                            ssidInfoModel.setData(<SsidInfoInterface> obj);
                            tmp.push(ssidInfoModel);
                        }
                        this.ssidDetailsModel.ssidListData = tmp;
                    }
                });
    }
}
