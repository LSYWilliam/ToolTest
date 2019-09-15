import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {routerTransition} from '../../../../../animations/route-animations';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RequestArgs} from '../../../../../shared/model/request-args';
import {WorkOrderModel, WorkOrderModelInterface} from '../../model/work-order.model';
import {WorkOrderManageService} from "../../service/work-order-manage.service";


/**
 * 商户列表模态框模块
 * @class WorkOrderModalComponent
*/
@Component
({
    selector: 'app-work-order-modal',
    templateUrl: './work-order-modal.component.html',
    styleUrls: ['./work-order-modal.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})

export class WorkOrderModalComponent extends WorkOrderManageService implements OnChanges,OnInit  {

    /** 表单验证 */
    validateForm: FormGroup;

    /**接收传递给模态框初始化的数据*/
    public value: WorkOrderModelInterface;
    /**工单列表模态框数据实体类*/
    public data: WorkOrderModel = new WorkOrderModel();

    /**接收传递给模态框初始化的数据*/
    @Input() set name(value: any) {
        this.value = value;
    }
    /** 模态框类型 */
    @Input() types: number;
    /** 企业列表 */
    @Input() businessList: Array<any>;
    /** 设备型号列表 */
    @Input() deviceModelList: Array<any>;
    /** 责任人列表 */
    @Input() responsibleList: Array<any>;

    /** 设备清单 */
    public deviceInventory: any[] = [];
    public deviceInventoryId: any[] = [];

    /** 设备数量 */
    public exceedNumFlag: boolean;

    /** 选中数量验证 */
    public selectDeviceInput: boolean;

    /**http请求*/
    public requestArgs: RequestArgs = new RequestArgs();


    /** 编辑工单的状态 */
    wordSelectStatus(event) {
        if (event === false) {
            this.data.workStatus = '处理中';
        } else {
            this.data.workStatus = '已完结';
        }
    }

    /** 检测是否输入数据 */
    getFormControl(name) {
        return this.validateForm.controls[ name ];
    }

    /**
     * 验证表单是否输入正确
     * */
    private validate(): boolean {
        let status: boolean = false;
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[ i ].markAsDirty();
            if (this.validateForm.controls[ i ].invalid) {
                status = true;
            }
        }
        return status;
    }

    /**
     * 点击模块框确定按钮的事件
     * @description
     *        1、判断是否有修改内容
     *        2、没有修改内容，则页面显示提示信息
     *        3、否则将用户修改的数据提交至服务器
     *        4、并关闭模态框
     */
    handleOk() {
        /** 表单校验成功 */
        if (!this.validate()) {
            switch (this.types) {
                case 0:
                    /** 新增 */
                    break;
                case 1:
                    /** 编辑 */
                    break;
                case 3:
                    /** 结束工单 */
                    this.decodeWorkOrderData() ? this.endData() : null;
                    break;
            }
        }
    }

    /** 点击退出后的事件，关闭模态框 */
    handleCancel() {
        this.subject.destroy('onCancel');
    }

    /**结束工单数据*/
    endData() {
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
        this.requestArgs.systemName = 'wlanscope';
        this.requestArgs.url = '/api/iam/install/web/order/finish';
        this.requestArgs.body = this.data.getWorkOrderEnd();
        this.http.httpPost(this.requestArgs)
            .subscribe(
                res => {
                    switch (res.code) {
                        case 0 :
                            this.message.success(res.msg);
                            let data: any = JSON.stringify(res.result);
                            this.subject.next(['end', data]);
                            this.subject.destroy('onOk');
                            break;
                        case 1103:
                            this.message.error(res.msg);
                            this.router.navigateByUrl('login');
                            break;
                        default:
                            this.message.error(res.msg);
                            break;
                    }
                }
            );
    }

    /**判断编辑工单数据的时候，模态框内容是否更改
     *      1. 若更改了，返回true; 否则弹出警告
     * */
    private decodeWorkOrderData():boolean {
        if (this.data.workStatusTest === true) {
            this.data.workStatus = '已完结';
        } else {
            this.data.workStatus = '处理中';
        }
        if (this.types === 1) {
            if (this.data.workStatus === this.value.workStatus  &&
                this.data.workFeedback === this.value.workFeedback) {
                this.message.warning('数据无变化，无须提交');
                return false;
            } else {
                return true;
            }
        }

        if (this.types === 3) {
            if (this.data.workStatus === this.value.workStatus  &&
                this.data.workFeedback === this.value.workFeedback) {
                this.message.warning('数据无变化，无须提交');
                return false;
            } else {
                return true;
            }
        }

    }

    /**
     * 数据更改时检测
     * */
    ngOnChanges(): void {

    }

    /**模态框数据初始化
     *      1.getThreeLinkData获取全国省市区内容
     *      2.setBusinessData设置模态框初始化数据
     *      3.status新增还是编辑
     * */
    ngOnInit() {
        if (this.types === 3) {
            this.data.setWorkData(this.value);
        }

        switch (this.types) {
            case 3:
                this.validateForm = this.fb.group({
                    workStatusTest     : [ null, [ Validators.required ] ],
                    workFeedback       : [ null, [ Validators.required ] ]
                });
                break;
        }

    }
}
