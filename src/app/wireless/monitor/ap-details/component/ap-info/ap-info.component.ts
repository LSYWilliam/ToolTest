import {Component, Input, OnChanges, SimpleChanges, OnInit} from '@angular/core';
import {HttpClientService} from "../../../../../shared/service/httpClient.service";
import {RequestArgs} from "../../../../../shared/model/request-args";
import {ApInfoInterface, ApInfoModel} from "../../model/ap-info.model";

/**
 * AP详情
 * @class ApInfoComponent
 */
@Component
({
    selector: 'app-ap-details-ap-info',
    templateUrl: './ap-info.component.html',
    styleUrls: ['./ap-info.component.scss']
})

export class ApInfoComponent implements OnInit {
    private _apID: string;
    public apInfoModel: ApInfoModel = new ApInfoModel();
    public ssidList: boolean = false;
    public apName: any;
    public apStatusIcon: any;

    /** 获取AP ID */
    @Input()
    set setApID(value: string) {
        this._apID = value;
    }
    /**
     * 构造方法
     * @description
     *      1、将HttpClientService注入到http
     * */
    constructor(private http: HttpClientService) {}

    /**
     * 方法初始化
     * @description
     *      1、获取ticket
     *      2、获取AP详情
     * */
    ngOnInit() {
        let requestArgs: RequestArgs = new RequestArgs();
        requestArgs.systemName = 'wlanscope';
        requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
        requestArgs.url = '/api/v1/wireless/getApDetail/' + this._apID;
        this.http.httpGet(requestArgs).subscribe(
            res => {
                if (res.code === 0) {
                    this.apName = res.result.apName;
                    this.apStatusIcon = res.result.apStatusIcon;
                    this.apInfoModel.setData(<ApInfoInterface> res.result);
                    if (this.apInfoModel.ssidList.length > 0) {
                        this.ssidList = true;
                    }
                }
            }
        );
    }
}
