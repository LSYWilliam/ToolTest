import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges
} from '@angular/core';
import {HttpClientService} from "../../service/httpClient.service";
import {RequestArgs} from "../../model/request-args";
import {DropDownsInterface} from "../dropdown/model/dropdowns.model";
/**
 * 折叠组件模块
 * @class FoldComponent
 */
@Component({
  selector: 'app-fold',
  templateUrl: './fold.component.html',
  styleUrls: ['./fold.component.scss']
})
export class FoldComponent implements OnChanges {
    /**网络下拉框数据 接口*/
    public dropDown: Array<DropDownsInterface> = [];
    /**网络下拉框默认值*/
    public inDefault: string;
    /**收起 or 折叠*/
    public folder: any;
    /**折叠的标题*/
    @Input() public foldTitle: string;
    /**是否折叠*/
    @Input() public isClosed: boolean;
    /**是否折叠*/
    @Input() public closed: number;
    /**组件输出 收起 or 折叠*/
    @Output() public status: EventEmitter<string> = new EventEmitter<string>();
    /**组件输出 克隆网络ID*/
    @Output() public cloneNetID : EventEmitter<string> = new EventEmitter<string>();
    constructor(private http: HttpClientService) {}
    /**点击网络下拉框某一项事件*/
    selectID(id: string) {
        this.cloneNetID.emit(id);
    }
    /**点击 收起 or 折叠*/
    downOrUp() {
        this.isClosed = !this.isClosed;
        this.folder = this.isClosed ? '收起': '展开';
        this.status.emit(this.folder);
    }
    /**监听组件表格内容是否改变的 生命周期函数*/
    ngOnChanges(changes: SimpleChanges): void {
        this.folder = this.isClosed ? '收起': '展开';

        if (changes.hasOwnProperty('foldTitle')) {
            let foldTitle = changes['foldTitle'].currentValue;
            if (foldTitle != undefined && foldTitle === '网络配置') {
                this.getDropDownData();
            }
        }
    }

    getDropDownData(defaultValue?: any) {
        let requestArgs: RequestArgs = new RequestArgs();
        requestArgs.systemName = "wlanscope";
        requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
        requestArgs.url = '/api/v1/net_info/configs';
        this.http.httpGet(requestArgs).subscribe(
            res => {
                if (res.code === 0) {
                    this.dropDown = [];
                    for (let obj of res.result) {
                        this.dropDown.push(<DropDownsInterface>{id: obj['netId'], name: obj['netConfigName']});
                    }
                    if (this.dropDown.length > 0) {
                        if(defaultValue) {
                            this.inDefault = defaultValue;
                        } else if(!this.inDefault) {
                            this.inDefault = this.dropDown[0]['name'];
                        }
                    } else {
                        this.inDefault = '默认网络配置';
                    }
                }
            }
        )
    }
}
