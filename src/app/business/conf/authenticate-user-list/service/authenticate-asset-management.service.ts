import {HttpClientService} from "../../../../shared/service/httpClient.service";
import {RequestArgs} from "../../../../shared/model/request-args";
import {Injectable} from "@angular/core";

import {Router} from "@angular/router";

@Injectable()
export class AuthenticateAssetManagementService {
    /**http请求*/
    public requestArgs: RequestArgs = new RequestArgs();

    /**表格行数据*/
    public dataSet: Array<any> = [];
    /**表格头部重置数据*/
    public resetArray: Array<any> = [];
    /**表格是否有复选框*/
    public isCheckBox: boolean;

    constructor(private http: HttpClientService,public router: Router) {
        this.requestArgs.systemName = "wlanscope";
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};

        this.dataSet = [
            {
                iconClass: 'icon-ACwifi',
                account: 18726916989,
                apMac: "11:22:33:44:55:66",
                businessName: "企业",
                network: "B楼",
                employee: "员工1",
                verificationMethod: "短信",
                onlineTime: "2019-01-24 10:30",
                offlineDuration: "5h24min",
                offlineTime: "2019-01-25 15:24"
            },
            {
                iconClass: 'icon-ACwifi',
                account: 18726916989,
                apMac: "11:22:33:44:55:66",
                businessName: "企业",
                network: "B楼",
                employee: "员工2",
                verificationMethod: "短信",
                onlineTime: "2019-01-24 10:30",
                offlineDuration: "5h24min",
                offlineTime: "2019-01-25 15:24"
            },
            {
                iconClass: 'icon-ACwifi',
                account: 18726916989,
                apMac: "11:22:33:44:55:66",
                businessName: "企业",
                network: "B楼",
                employee: "员工3",
                verificationMethod: "短信",
                onlineTime: "2019-01-24 10:30",
                offlineDuration: "5h24min",
                offlineTime: "2019-01-25 15:24"
            },
            {
                iconClass: 'icon-ACwifi',
                account: 18726916989,
                apMac: "11:22:33:44:55:66",
                businessName: "企业",
                network: "B楼",
                employee: "员工4",
                verificationMethod: "短信",
                onlineTime: "2019-01-24 10:30",
                offlineDuration: "5h24min",
                offlineTime: "2019-01-25 15:24"
            }
        ]
        this.resetArray = [
            { id: 111, value: '短信认证', checked: false },
            { id:222, value: '微信认证', checked: false }
        ];
        this.isCheckBox = true;
    }

}
