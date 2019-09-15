import {Component, OnInit } from '@angular/core';
import {routerTransition} from '../../../../../animations/route-animations';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EquipmentAssetModalModel} from "../../model/equipment-asset-modal.model";
import {NzMessageService, NzModalSubject} from "ng-zorro-antd";
import {Router} from "@angular/router";
import {HttpClientService} from "../../../../../shared/service/httpClient.service";
import {RequestArgs} from "../../../../../shared/model/request-args";

/**
 * 设备资产管理平台
 * @class OnlineUserListComponent
 */
@Component
({
    selector: 'app-equipment-asset-modal',
    templateUrl: './equipment-asset-modal.component.html',
    styleUrls: ['./equipment-asset-modal.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})

export class EquipmentAssetModalComponent implements OnInit  {
    /**表单验证*/
    public validateForm: FormGroup;
    public assetForm: any;
    /**设备资产管理模态框数据实体类*/
    public data: EquipmentAssetModalModel = new EquipmentAssetModalModel();
    /**请求头*/
    public requestArgs: RequestArgs = new RequestArgs();
    constructor(private subject: NzModalSubject, private fb: FormBuilder, private http: HttpClientService,
                private message: NzMessageService, private router: Router) {
        this.requestArgs.systemName = "wlanscope";
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
        const regSn= /^[A-Za-z0-9]{18}$/;
        this.assetForm = ['assetName','assetSn', 'assetModel', 'assetModelDescription','assetMac'];
        this.validateForm = this.fb.group({
            assetName:[ null, [ Validators.required,
                Validators.minLength(2),
                Validators.maxLength(32)] ],
            assetSn:[ null,[Validators.required,Validators.pattern(regSn)]  ],
            assetModel:[ true, [Validators.required,
                Validators.minLength(6),
                Validators.maxLength(32)]  ],
            assetModelDescription:[true, [ Validators.maxLength(128)]  ],
            assetMac:[ null, [ Validators.required,
                Validators.minLength(2),
                Validators.maxLength(32)] ],
        });
    }
    /**序列号input框失去焦点*/
    blur() {
        this.requestArgs.url = '/api/asset/model?assetSn='+ this.data.assetSn;
        this.http.httpGet(this.requestArgs)
            .subscribe(
                res => {
                    switch (res.code) {
                        case 0 :
                            this.data.assetModel = res.result.model;
                            this.data.assetModelDescription = res.result.describe;
                            break;
                        case 1103:
                            this.message.error('令牌无效！返回登录页面');
                            this.router.navigateByUrl('login');
                            break;
                        default:
                            this.message.error('获取数据失败！');
                            this.message.error(res.msg);
                            break;
                    }
                }
            );
    }
    /**点击模态框确定按钮*/
    handleOk() {
        if (!this.validate()) {
            this.subject.next(['add', this.data]);
            this.subject.destroy('onOk');
        }
    }
    /**点击模态框取消按钮*/
    handleCancel() {
        this.subject.next(['onCancel', null]);
        this.subject.destroy('onCancel');
    }
    /**
     * 验证表单是否输入正确
     * */
    private validate(): boolean {
        let status: boolean = false;
        for (let obj of this.assetForm) {
            this.validateForm.controls[obj].markAsDirty();
            if (this.validateForm.controls[obj].invalid) {
                status = true;
            }
        }
        return status;
    }
    /**
     * 页面数据初始化
     *      1.getApUseInfo() 获取表格右上角设备使用情况
     *      2.getTableData() 获取设备资产管理平台table表格数据
     * */
    ngOnInit() {

    }
}
