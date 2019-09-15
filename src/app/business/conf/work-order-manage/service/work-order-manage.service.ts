import {Injectable, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {NzMessageService, NzModalService, NzModalSubject} from "ng-zorro-antd";
import {RequestArgs} from '../../../../shared/model/request-args';
import {HttpClientService} from '../../../../shared/service/httpClient.service';
import {FormBuilder} from "@angular/forms";
import {FilterWorkOrder} from "../model/filterWorkOrder";
import {ZorroPageTableComponent} from "../../../../plugins/component/zorro-page-table/zorro-page-table.component";

@Injectable()
export class WorkOrderManageService {
    /**表格是否有复选框*/
    public isCheckBox: boolean;
    public total: any;
    /**表格行数据*/
    public dataSet: Array<any> = [];
    /** 表格子组件 */
    @ViewChild(ZorroPageTableComponent) public child: ZorroPageTableComponent;
    /**实体类*/
    public requestArgs: RequestArgs = new RequestArgs();
    /**筛选静态数据 实体类*/
    public filterWorkOrder: FilterWorkOrder = new FilterWorkOrder();

    constructor(public http: HttpClientService,
                public router: Router,
                public modal: NzModalService,
                public fb: FormBuilder,
                public subject: NzModalSubject,
                public message: NzMessageService) {
        this.requestArgs.systemName = 'wlanscope';
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
        this.isCheckBox = true;
    }

    /**获取工单表格数据*/
    protected getWorkOrderTableData(number, size, sort) {
        this.requestArgs.url = '/api/wechat/small/program/web/order/list';
        this.requestArgs.body = {
            'businessName': this.filterWorkOrder.businessName,
            'responsibleName': this.filterWorkOrder.responsibleName,
            'workOrderStatus': this.filterWorkOrder.workOrderStatus,
            'workOrderType': this.filterWorkOrder.workOrderType,
            'number': number,
            'size': size,
            'sort': sort
        };
        this.http.httpPost(this.requestArgs).subscribe(res => {
            if (res.code === 0) {
                this.dataSet = res.result.content;
                this.total = res.result.totalElements;
            } else if (res.code === 9) {
                this.dataSet = [];
            } else if (res.code === 1103) {
                this.message.error('令牌无效！返回登录页面');
                this.router.navigateByUrl('login');
            }  else {
                this.dataSet = [];
                this.message.error(res.msg);
            }
        });
    }
    /**完成工单*/
    // protected finishedWorkOrderData(workOrderId) {
    //     this.requestArgs.url = '/api/wechat/small/program/web/order/finish/' + workOrderId;
    //     this.requestArgs.body =  {};
    //     return this.http.httpGet(this.requestArgs);
    // }

    protected finishedWorkOrderData(workOrderId) {
        this.requestArgs.url = '/api/wechat/small/program/web/order/finish';
        this.requestArgs.body =  {
            workOrderIds: workOrderId
        };
        return this.http.httpPost(this.requestArgs);
    }
    /**手动关闭*/
    // protected endWorkOrderData(workOrderId) {
    //     this.requestArgs.url = '/api/wechat/small/program/web/order/close/' + workOrderId;
    //     this.requestArgs.body =  {};
    //     return this.http.httpGet(this.requestArgs);
    // }

    protected endWorkOrderData(workOrderId) {
        this.requestArgs.url = '/api/wechat/small/program/web/order/close';
        this.requestArgs.body =  {
            workOrderIds: workOrderId
        };
        return this.http.httpPost(this.requestArgs);
    }
}
