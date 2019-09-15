import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {routerTransition} from "../../../../../animations/route-animations";
import {AssetDetailsHeaderModel} from "../../model/asset-details-header.model";
import {RequestArgs} from "../../../../../shared/model/request-args";
import {HttpClientService} from "../../../../../shared/service/httpClient.service";

/**
 * 商户列表模态框模块
 * @class AssetDetailsModalComponent
*/
@Component
({
    selector: 'app-asset-details-modal',
    templateUrl: './asset-details-modal.component.html',
    styleUrls: ['./asset-details-modal.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})

export class AssetDetailsModalComponent implements OnChanges,OnInit  {
    @Input() public dataSet: any;
    public pageSize: any;
    public pageIndex: any;
    public total: any;
    public isCheckBox: boolean;

    private assetSn: any;
    /**http请求*/
    public requestArgs: RequestArgs = new RequestArgs();
    /**表格静态数据 实体类*/
    public staticDataModel: AssetDetailsHeaderModel = new AssetDetailsHeaderModel();

    @Input()
    set name(value: any) {
        this.assetSn = value[1];
        if (value[0]) {
            if (value[0].result.content && value[0].result.content.length) {
                this.dataSet = value[0].result.content;
                this.total = value[0].result.totalElements;
            } else {
                this.dataSet = [];
                this.total = 0;
            }
        } else {
            this.dataSet = [];
            this.total = 0;
        }
    }

    constructor(public http: HttpClientService) {
        this.isCheckBox = false;
        this.pageSize = 5;
        this.requestArgs.systemName = "wlanscope";
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
    }
    /**表格索引值大小改变的事件*/
    pageIndexEvent(value) {
        this.pageIndex = --value;
        this.getDetailsData(this.assetSn, this.pageIndex, this.pageSize );
    }
    /**获取详情数据接口*/
    getDetailsData(assetSN, number, size ) {
        this.requestArgs.url = '/api/asset/details';
        this.requestArgs.body = {
            "assetSN": assetSN,
            "number": number,
            "size": size
        };
        return this.http.httpPost(this.requestArgs).subscribe( res => {
            if (res.code === 0) {
                this.dataSet = res.result.content;
                this.total = res.result.totalElements;
            } else {
                this.dataSet = [];
                this.total = 0;
            }
        });
    }
    ngOnChanges(): void {

    }
    /**模态框数据初始化
     *      1.getThreeLinkData获取全国省市区内容
     *      2.setBusinessData设置模态框初始化数据
     *      3.status新增还是编辑
     * */
    ngOnInit() {

    }
}
