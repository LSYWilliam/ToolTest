import {Injectable, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {TableComponent} from '../../../../plugins/component/table/table.component';
import {RequestArgs} from '../../../../shared/model/request-args';
import {HttpClientService} from '../../../../shared/service/httpClient.service';
import {InstallRecordListModel} from "../model/install-record-list.model";

@Injectable()
export class InstallRecordService {

    /**在父组件中调用table组件*/
    @ViewChild(TableComponent) child: TableComponent;

    /**实体类*/
    public requestArgs: RequestArgs = new RequestArgs();

    /** 表格数据 */
    public installRecordListModel: InstallRecordListModel = new InstallRecordListModel();

    /** 企业列表 */
    public businessList: Array<any> = [];

    constructor(public http: HttpClientService, public router: Router,
                public modal: NzModalService, public message: NzMessageService) {}

    /**获取安装记录表格数据*/
    protected getInstallRecordTableData(data?: any) {
        // this.requestArgs.systemName = 'test';
        // this.requestArgs.url = 'assets/data/work-order/getInstallRecordList.json';
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
        this.requestArgs.systemName = 'wlanscope';
        this.requestArgs.url = '/api/iam/install/web/record';
        this.requestArgs.body = data;
        this.http.httpPost(this.requestArgs)
            .subscribe(
                res => {
                    console.log(JSON.stringify(data));
                    console.log(res);
                    if (res.code === 0) {
                        this.installRecordListModel.installRecordTableData = res.result;
                    } else if (res.code ===9) {
                        this.installRecordListModel.installRecordTableData = [];
                    } else if (res.code === 1103) {
                        this.message.error('令牌无效！返回登录页面');
                        this.router.navigateByUrl('login');
                    } else {
                        this.installRecordListModel.installRecordTableData = [];
                    }
                });
    }

    /**获取企业列表数据*/
    protected getBusinessListData() {
        // this.requestArgs.url = 'assets/data/work-order/getBusinessList.json';
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
        this.requestArgs.systemName = 'wlanscope';
        this.requestArgs.url = '/api/iam/install/web/business';
        this.http.httpGet(this.requestArgs)
            .subscribe(
                res => {
                    if (res.code === 0) {
                        console.log(res.result);
                        this.businessList = res.result;
                    } else if (res.code ===9) {
                        this.businessList = [];
                    }  else {
                        this.businessList = [];
                    }
                });
    }

}
