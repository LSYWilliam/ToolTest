import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {routerTransition} from "../../../../../../animations/route-animations";
import {HttpClientService} from "../../../../../../shared/service/httpClient.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzMessageService, NzModalSubject} from "ng-zorro-antd";
import {BusinessModalInterface, BusinessModalModel} from "../../model/businessModal.model";
import {RequestArgs} from "../../../../../../shared/model/request-args";
import {Router} from "@angular/router";
/**
 * 商户列表模态框模块
 * @class AssetDetailsModalComponent
*/
@Component
({
    selector: 'app-business-modal',
    templateUrl: './business-modal.component.html',
    styleUrls: ['./business-modal.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})

export class BusinessModalComponent implements OnChanges,OnInit  {
    /**接收传递给模态框初始化的数据*/
    public value: BusinessModalInterface;
    /**表单验证*/
    public validateForm: FormGroup;
    /**表单中需要验证的项*/
    public businessForm: any;
    /** 0新增，1编辑 */
    private status: number;
    /**点击模态框确定按钮时，请求的 省*/
    private province: any;
    /**点击模态框确定按钮时，请求的 市*/
    private city: any;
    /**点击模态框确定按钮时，请求的 区*/
    private area: any;
    /**传递给three-link组件的 省*/
    public provinceLink:any;
    /**传递给three-link组件的 市*/
    public cityLink:any;
    /**传递给three-link组件的 区*/
    public areaLink:any;
    /**获取全国全部的省市区*/
    public threeLinkData: any;
    /**http请求*/
    private requestArgs: RequestArgs = new RequestArgs();
    /**商家列表模态框数据实体类*/
    public data: BusinessModalModel = new BusinessModalModel();
    @Output() public selectProCityArea = new EventEmitter<string>();
    /**接收传递给模态框初始化的数据*/
    @Input()
    set name(value: BusinessModalInterface) {
        this.value = value;
        if (value) {
            this.provinceLink = value['province'];
            this.cityLink = value['city'];
            this.areaLink = value['district'];
        }
    }
    constructor(private subject: NzModalSubject, private http: HttpClientService,private fb: FormBuilder, private message: NzMessageService,
                private router: Router) {
        this.businessForm = ['busiName','busiContact','busiTel','businessAddr'];
        /**手机号校验*/
        const reg = /^1([345789][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
        /**商家名称校验*/
        const regBusi =  /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
        /**联系人校验*/
        const regContact = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/;
        this.validateForm = this.fb.group({
            busiName:[ null, [ Validators.required,
                Validators.minLength(2),
                Validators.maxLength(32),
                Validators.pattern(regBusi)] ],
            busiContact:  [ null, [Validators.required,
                Validators.minLength(2),
                Validators.maxLength(16),
                Validators.pattern(regContact)] ],
            busiTel:  [ null, [Validators.required,
                Validators.pattern(reg)] ],
            businessAddr: [ null, [
                Validators.minLength(0),
                Validators.maxLength(64)] ]
        });
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
    }
    /**
     * 验证表单是否输入正确
     * */
    private validate(): boolean {
        let status: boolean = false;
        for (let obj of this.businessForm) {
            this.validateForm.controls[obj].markAsDirty();
            if (this.validateForm.controls[obj].invalid) {
                status = true;
            }
        }
        return status;
    }
    /**判断编辑商家数据的时候，模态框内容是否更改
     *      1. 若更改了，返回true; 否则弹出警告
     * */
    private decodeBusinessData():boolean {
        if (this.data.busiName === this.value.businessName &&
            this.data.busiContact === this.value.businessContact &&
            this.data.busiTel === this.value.businessTel &&
            this.data.province === this.value.province &&
            this.data.city === this.value.city &&
            this.data.district === this.value.district &&
            this.data.businessAddr === this.value.businessAddr ) {
            this.message.warning('数据无变化，无须提交！');
            return false;
        } else {
            return true;
        }
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
        if (! this.validate()) {
            this.data.completeAddress = String(this.data.province) + String(this.data.city) + String(this.data.district) + String(this.data.businessAddr);
            if (this.status === 0) {
                this.addData();
            } else {
                /** 编辑 */
                this.decodeBusinessData() ? this.editData() : null;
            }
        }
    }

    /** 点击退出后的事件，关闭模态框 */
    handleCancel() {
        this.subject.destroy('onCancel');
    }
    /**新增商家数据*/
    private addData() {
        this.requestArgs.systemName = "system";
        this.requestArgs.url = '/ewifi/system/console/business/create_by_wlanscope';
        this.requestArgs.body = this.data.getBusinessData();
        this.http.httpPost(this.requestArgs)
            .subscribe(
                res => {
                    switch (res.code) {
                        case 0 :
                            let data: string = JSON.stringify(res.result);
                            // this.subject.next('add|' + data);
                            this.subject.next(['add',data]);
                            this.subject.destroy('onOk');
                            break;
                        case 1103:
                            this.message.error('令牌无效！返回登录页面');
                            this.router.navigateByUrl('login');
                            break;
                        default:
                            this.message.error('数据添加失败！');
                            this.message.error(res.msg);
                            break;
                    }
                }
            );
    }
    /**编辑商家数据*/
    private editData() {
        this.requestArgs.systemName = "system";
        this.requestArgs.url ='/ewifi/system/console/business/update_by_wlanscope';
        this.requestArgs.body = this.data.getBusinessData();
        this.http.httpPost(this.requestArgs)
            .subscribe(
                res => {
                    switch (res.code) {
                        case 0 :
                            let data = JSON.stringify(this.requestArgs.body);
                            // this.subject.next('edit|' + data);
                            this.subject.next(['edit',data]);
                            this.subject.destroy('onOk');
                            break;
                        case 1103:
                            this.message.error('令牌无效！返回登录页面');
                            this.router.navigateByUrl('login');
                            break;
                        default:
                            this.message.error('数据修改失败！');
                            this.message.error(res.msg);
                            break;
                    }
                }
            );

    }
    /**选择三级联动里面的省市区，返回的数据*/
    dealProCityArea(value) {
        const value1 = JSON.parse(value);
        this.province = value1.hasOwnProperty('_province') ? value1._province.name : '';
        this.city = this.province && value1.hasOwnProperty('_city') ? value1._city.name : '';
        this.area = this.city && value1.hasOwnProperty('_area') ? value1._area.name : '';
        this.data.province = this.province;
        this.data.city = this.city;
        this.data.district = this.area;
    }
    /**获取三级联动组件里面的数据
     *      1. 即 判断省市区具体是哪个省 哪个市 哪个区
     * */
    outData(value) {
        this.dealProCityArea(value);
    }
    /**三级联动数据*/
    private getThreeLinkData() {
        this.requestArgs.systemName = "test";
        this.requestArgs.url = "assets/data/mock-data/area.json";
        this.http.httpGet(this.requestArgs).subscribe(res => {
            this.threeLinkData = res;
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
        this.getThreeLinkData();
        if (this.value != null) {
            this.data.setBusinessData(this.value);
            this.status = 1;
        } else {
            this.status = 0;
        }
    }
}
