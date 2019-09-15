import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {routerTransition} from "../../../../../../animations/route-animations";
import {AssetDetailsHeaderModel} from "../../model/asset-details-header.model";
import {RequestArgs} from "../../../../../../shared/model/request-args";
import {HttpClientService} from "../../../../../../shared/service/httpClient.service";



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
    public netId: any;


    /**http请求*/
    public requestArgs: RequestArgs = new RequestArgs();
    /**表格静态数据 实体类*/
    public staticDataModel: AssetDetailsHeaderModel = new AssetDetailsHeaderModel();
    @Input()
    set name(value: any) {
        this.netId = value[1];
        if (value[0] && value[0].result.length) {
            this.dataSet = value[0].result;
            this.total = value[0].pagination.totalElements;
            this.pageSize = 5;
        } else {
            this.dataSet = [];
            this.total = 0;
        }
    }
    constructor(public http: HttpClientService) {
        this.pageSize = 5;
        this.requestArgs.systemName = "wlanscope";
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
    }
    /**表格索引值大小改变的事件*/
    pageIndexEvent(value) {
        this.pageIndex = --value;
        this.getAssetDescData(this.netId, this.pageIndex, this.pageSize);

    }
    /**获取设备信息接口*/
    getAssetDescData(netId, number, size) {
        this.requestArgs.url = '/api/v1/wireless/getApList/' + netId + '?number=' + number + '&size=' + size;
        this.requestArgs.body = {};
        return this.http.httpGet(this.requestArgs).subscribe( res => {
            if (res.code === 0) {
                this.dataSet = res.result;
                this.total = res.pagination.totalElements;
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
