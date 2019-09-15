import {Component, Input, OnInit,  ViewChild} from '@angular/core';
import {NzMessageService, NzModalSubject} from "ng-zorro-antd";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import * as moment from 'moment';
import {Router} from "@angular/router";
import {TableComponent} from "../../../../../plugins/component/table/table.component";
import {SwitchModalInterface, SwitchModalModel} from "../../model/switch-modal.model";
import {RequestArgs} from "../../../../../shared/model/request-args";
import {HttpClientService} from "../../../../../shared/service/httpClient.service";

@Component
({
    selector: 'app-switch-device-modal',
    templateUrl: './switch-device-modal.component.html',
    styleUrls: ['./switch-device-modal.component.scss'],
})

export class SwitchDeviceModalComponent implements OnInit  {
    /**商家下拉框的默认值*/
    public defaultBusiName: any;
    /**模态框表单验证*/
    public validateForm: FormGroup;
    /**模态框表单要验证的某些项*/
    public deviceForm: any;
    /** true 设备资产管理平台，false 设备资产管理 */
    public type: boolean;
    /**设备(资产)管理(平台)模态框或者表格数据 接口*/
    public value: SwitchModalInterface;
    /**设备(资产)管理(平台)模态框或者表格数据 实体类*/
    public data: SwitchModalModel = new SwitchModalModel();
    /**请求头*/
    public requestArgs: RequestArgs = new RequestArgs();
    /** 0新增，1编辑 */
    public status: number;
    /** 判断点击的是 新增 or 编辑 */
    private editOrAdd: number;
    /** 父组件引入table组件 */
    @ViewChild(TableComponent) child: TableComponent;
    /**商家列表数据*/
    public businessList: any;
    /**获取商家Id*/
    public businessId: any;
    /**组件输入商户列表数据*/
    /**组件输入模态框数据*/
    @Input()
    set name(value: SwitchModalInterface) {
        this.value = value;
        if (value) {
            this.data.businessId = value.businessId;
            this.data.businessName = value.businessName;
            this.defaultBusiName = value.businessName;
        }
    }

    @Input()
    set business(value: any) {
        this.businessList = value;
        if (this.value === null) {
            this.defaultBusiName = value[0].name;
            this.data.businessId = value[0].id;
            this.data.businessName = this.defaultBusiName;
        }
    }

    @Input()
    set defaultBusinessName(value: any) {
        if (value !== null) {
            this.defaultBusiName = value;
        }
        this.data.businessName = this.defaultBusiName;
        if(this.businessList) {
            this.businessList.forEach(res=> {
                if(this.defaultBusiName === res.name) {
                    this.data.businessId = res.id;
                }
            });
        }

        console.log(this.defaultBusiName);
        console.log(this.businessList);
    }


    /**constructor构造函数
     *      1. http: 定义的服务请求
     *      2. subject; 在弹出component中实例化NzModalSubject对象后可以通过next方法向外传输数据
     *      3. fb: 佐罗中响应式表单
     *      4. message: 佐罗中Message 全局提示
     *      5. router: 路由
     * */
    constructor(private subject: NzModalSubject, private http: HttpClientService,private fb: FormBuilder, private message: NzMessageService,
                private router: Router) {
        const reg= /^[A-Fa-f0-9]{2}[:][A-Fa-f0-9]{2}[:][A-Fa-f0-9]{2}[:][A-Fa-f0-9]{2}[:][A-Fa-f0-9]{2}[:][A-Fa-f0-9]{2}$/;
        const regSn= /^[A-Za-z0-9]{18}$/;
        const regName = /^[A-Za-z0-9_\u4e00-\u9fa5]+$/;
        this.requestArgs.systemName = 'system';
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
        // this.deviceForm = ['apName','apSN','apMac','factoryTime'];
        this.deviceForm = ['switchName','switchSn','switchMac','factoryTime'];
        this.validateForm = this.fb.group({
            switchName:[ null, [ Validators.required,
                Validators.minLength(2) ,
                Validators.maxLength(32),Validators.pattern(regName)] ],
            switchSn:  [ null,[Validators.required,Validators.pattern(regSn)] ],
            switchModel:  [ true, [Validators.required,
                Validators.minLength(6),
                Validators.maxLength(32)] ],
            switchModelDescription:[ true, [ Validators.maxLength(128)] ],
            switchMac: [ null, [
                Validators.pattern(reg),
                Validators.required ] ],
            factoryTime: [null,[Validators.required ]]
        });

    }
    /**
     * 验证表单是否输入正确
     * */
    private validate(): boolean {
        let status: boolean = false;
        for (let obj of this.deviceForm) {
            this.validateForm.controls[obj].markAsDirty();
            if (this.validateForm.controls[obj].invalid) {
                status = true;
            }
        }
        return status;
    }
    /**判断编辑模态框数据的时候，模态框内容是否更改
     *      1. 若更改了，返回true; 否则弹出警告
     * */
    private decodeDeviceData():boolean {
        if (this.data.switchName === this.value.switchName &&
            this.data.switchSn === this.value.switchSn &&
            this.data.businessName === this.value.businessName &&
            this.data.switchMac === this.value.switchMac &&
            this.data.factoryTime === this.value.factoryTime) {
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
            if (this.status === 0) {
                this.addData();
            } else {
                /** 编辑 */
                this.decodeDeviceData()? this.editData(): null;
            }
        }
    }

    /** 点击退出后的事件，关闭模态框 */
    handleCancel() {
        this.subject.destroy('onCancel');
    }

    /**添加数据*/
    private addData() {
        // this.requestArgs.url = '/ewifi/system/console/ap_resource/insert_by_wlanscope';
        this.requestArgs.systemName = 'wlanscope';
        this.requestArgs.url = '/api/v1/switch_info/add';
        this.requestArgs.body =  this.data.getSwitchDeviceData();
        this.http.httpPost(this.requestArgs)
            .subscribe(
                res => {
                    console.log(res);
                    switch (res.code) {
                        case 0 :
                            this.message.success('增加成功！');
                            let data: string = JSON.stringify(res.result);
                            this.subject.next(['add', data]);
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
    /**编辑数据*/
    private editData() {
        this.data.factoryTime = moment(this.data.factoryTime).format('YYYY-MM-DD HH:mm');
        // this.requestArgs.url = '/ewifi/system/console/ap_resource/update_by_wlanscope';
        this.requestArgs.systemName = 'wlanscope';
        this.requestArgs.url = '/api/v1/switch_info/update';
        this.requestArgs.body = this.data.getSwitchDeviceData();
        this.http.httpPost(this.requestArgs)
            .subscribe(
                res => {
                    switch (res.code) {
                        case 0 :
                            // let data = JSON.stringify(this.requestArgs.body);
                            let data = JSON.stringify(res.result);
                            this.subject.next(['edit', data]);
                            this.subject.destroy('onOk');
                            break;
                        case 1103:
                            this.message.error('令牌无效！返回登录页面');
                            this.router.navigateByUrl('login');
                            break;
                        default:
                            this.message.error('数据编辑失败！');
                            this.message.error(res.msg);
                            break;
                    }
                }
            );

    }
    /**设备序列号失去焦点,获取设备型号和说明*/
    blur() {
        if((!this.data.switchSn)||this.data.switchSn==="") {
            return;
        }
        // const body = {
        //     switchSn: this.data.switchSn
        // };
        this.requestArgs.url = `/api/v1/switch_info/model/${this.data.switchSn}`;
        this.requestArgs.systemName = 'wlanscope';
        // this.requestArgs.body = body;
        this.http.httpGet(this.requestArgs)
            .subscribe(
                res => {
                    console.log(res);
                    switch (res.code) {
                        case 0 :
                            this.data.switchModel = res.result.switchModel;
                            this.data.switchModelDescription = res.result.description;
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
    /**点击商家列表下拉框*/
    getDropDownBusiName(value) {
        this.data.businessName = value;
    }
    getDropDownBusiId(value) {
        this.data.businessId = value;
    }
    /**页面初始化数据
     *      1. type布尔类型 true 设备资产管理平台，false 设备资产管理
     *      2. status  0新增，1编辑
     *      3. setPlatFormData()方法 设置设备资产管理平台模态框数据的
     *      4. setDeviceData()方法 设置设备资产管理模态框数据的
     * */
    ngOnInit() {
        if (this.value != null) {
            console.log(this.value);
            this.data.setSwitchDeviceData(this.value);
            this.status = 1;
        } else {
            this.status = 0;
        }
    }
}
