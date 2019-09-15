import {Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService, NzModalService } from "ng-zorro-antd";
import { HttpClientService } from '../../../../shared/service/httpClient.service';
import { RequestArgs } from '../../../../shared/model/request-args';
import { TableComponent } from "../table.component";

/**
 * table效果组件 -- AP固件版本管理（平台）详情页 - 停用
 * @class
 */
@Component({
    selector: 'app-disabled',
    templateUrl: './disabled.component.html',
    styleUrls: ['./disabled.component.scss']
})
export class DisabledComponent implements OnInit {
    public params: any;
    public colors: any;
    public requestArgs: RequestArgs = new RequestArgs();
    @ViewChild(TableComponent) child: TableComponent;

    constructor(private router: Router,
                private http: HttpClientService,
                private message: NzMessageService) {
        this.requestArgs.systemName = 'wlanscope';
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
    }

    agInit(params: any): void {
        this.params = params;
    }

    ngOnInit() {

    }

    /** 弹出框 - 警告说明 */
    // warning() {
    //     this.message.warning("这是已经停用的版本！");
    // }

    // /** 获取固件版本停用 */
    // protected getStop() {
    //     this.requestArgs.url = '/api/v1/ap_version/' + this.params.data['id'];
    //     this.http.httpPatch(this.requestArgs).subscribe(res => {
    //         if (res.code === 0) {
    //             console.log(res.msg);
    //             this.message.success("停用成功！");
    //             this.params.data.delFlag = 1;
    //             console.log(this.params.data);
    //             // console.log(this.child.gridApi.getSelectedRows());
    //             this.colors = 'rgb(191, 191, 191)';
    //         } else {
    //             this.message.error("停用失败！");
    //         }
    //     });
    // }

}
