import { Component, Input } from '@angular/core';
import {RequestArgs} from "../../../../../shared/model/request-args";
import {SsidInfoModel} from "../../model/ssid-info.model";
import {DropDownsInterface} from "../../../../../shared/component/dropdown/model/dropdowns.model";
import {HttpClientService} from "../../../../../shared/service/httpClient.service";
import {NzMessageService} from "ng-zorro-antd";
import {Router} from "@angular/router";

/** SSID内容组件
 * @class SsidElementComponent
 */
@Component({
  selector: 'app-ssid-element',
  templateUrl: './ssid-element.component.html',
  styleUrls: ['./ssid-element.component.css']
})

export class SsidElementComponent {
    /** SSID呈现的数据 */
    @Input() public confInfo: SsidInfoModel;
    @Input() public message : NzMessageService;
    @Input() public netId: string;

    /** 下拉菜单模型 */
    public dropDown : Array<DropDownsInterface>;
    private requestArgs: RequestArgs = new RequestArgs();

    constructor(private http: HttpClientService,private route: Router) {
        /** 生成下拉菜单数据 */
        let dropDownInfo : Array<DropDownsInterface> = [];
        dropDownInfo.push(<DropDownsInterface>{ id: '0', name: '未开启'});
        dropDownInfo.push(<DropDownsInterface>{id: '1', name: '已开启'});
        this.dropDown = dropDownInfo;
        /** 统一请求信息 */
        this.requestArgs.systemName = "wlanscope";
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
    }

    /** 点击黑白名单编辑事件
     * @param flag string
     *             点击类型 1白名单  2 黑名单
     */
    public openListEdit(flag: string) {
        this.route.navigate(["/black-white-list/" , this.confInfo.id, this.confInfo.ssidName, flag],
            {skipLocationChange: true });
    }

    /** 点击黑白名单是否开启事件
     * @param id string
     *            下拉条的ID
     * @param flag string
     *             点击类型 1白名单  2 黑名单
     */
    public setEnable(id: string, flag: string) {
        this.requestArgs.url = '/api/v1/wireless/setBlackWhiteEnable/' + this.confInfo.id + '/' + flag + '/' + id;
        this.http.httpGet(this.requestArgs).subscribe(
            res => {
                const type = flag==='1'? '白名单' : '黑名单';
                const enable = id === '1'? '开启' : '关闭' ;
                if (res.code === 0) {
                    this.message.success(type + enable + '成功');
                } else {
                    this.message.error(type + enable + '失败!');
                    this.message.error(res.msg);
                }
            }
        );
    }

    /** 点击编辑按钮事件 */
    public openEdit() {
        this.route.navigate(["/ssid-conf/", this.confInfo.id, this.netId],
            {skipLocationChange: true });
    }

    /** 开启或关闭SSID事件
     * @description
     *       请求SSID事件，成功时提示成功，否则提示失败
     */
    public getIsOpenOrClose() {
        const ssidStatus = this.confInfo.ssidStatus? '1':'0';
        this.requestArgs.url = '/api/v1/wireless/setSsidEnable/' + this.confInfo.id + '/' + ssidStatus;
        this.http.httpGet(this.requestArgs).subscribe(
            res => {
                const type = this.confInfo.ssidStatus? '开启':'关闭';
                if (res.code === 0) {
                    this.message.success('SSID' + type + '成功');
                } else {
                    this.confInfo.ssidStatus = ! this.confInfo.ssidStatus;
                    this.message.error('SSID' + type + '失败!');
                    this.message.error(res.msg);
                }
            }
        )
    }
}
