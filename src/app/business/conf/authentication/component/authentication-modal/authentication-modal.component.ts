import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {NzInputDirectiveComponent, NzMessageService, NzModalSubject} from "ng-zorro-antd";
import {HttpClientService} from "../../../../../shared/service/httpClient.service";
import {RequestArgs} from "../../../../../shared/model/request-args";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationInterface, AuthenticationModel} from "../../model/authentication.model";


/**
 * 认证计费-模态框
 * @class AuthenticationModalComponent
 */
@Component
({
    selector: 'authentication-frequency-modal',
    templateUrl: './authentication-modal.component.html',
    styleUrls: ['./authentication-modal.component.scss'],
})

export class AuthenticationModalComponent implements OnInit{

    public value: AuthenticationInterface;
    public type: boolean;
    public data: AuthenticationModel = new AuthenticationModel();
    public validateForm: FormGroup;
    public portalForm: any;
    public radiusForm: any;
    /** 0新增，1编辑 */
    private status : number;
    private requestArgs: RequestArgs = new RequestArgs();
    /** 是否显示警告提示 */
    public showWhite: boolean;
    /** 新增portal白名单 */
    public tags = [];
    public inputVisible = false;
    public inputValue: string;
    @ViewChild('input') public inputVals: ElementRef;
    @ViewChild('whiteListData') public whiteData: ElementRef;
    public whiteListData: string;

    @Input()
    set flag(value: any){
        this.type = value;
    }

    @Input()
    set name(value: AuthenticationInterface) {
        this.value = value;

    }

    /**
     * 将获取到的表格数据内容进行筛选
     * @param subject  NzModalSubject
     *          模态框返回数据
     * @param http  HttpClientService
     * @param fb  FormBuilder
     * @param message NzMessageService
     * @description
     *         生成告警信息的默认值
     */
    constructor(private subject: NzModalSubject, private http: HttpClientService,private fb: FormBuilder, private message: NzMessageService) {
        this.portalForm = ['name','ipAddress', 'secretKey','note','portalUrl','port'];
        this.radiusForm = ['name','ipAddress','secretKey','note','authPort','feePort'];

        this.requestArgs.systemName = "wlanscope";
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};

        const reg = '((25[0-5]|2[0-4]\\d|((1\\d{2})|([1-9]?\\d)))\\.){3}(25[0-5]|2[0-4]\\d|((1\\d{2})|([1-9]?\\d)))';
        // const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
        const urlReg = '(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]';
        this.validateForm = this.fb.group({
            name:       [ null, [ Validators.required,
                Validators.minLength(2) ,
                Validators.maxLength(32)]],
            ipAddress:  [ null, [ Validators.minLength(7),
                Validators.maxLength(15),
                Validators.required,
                Validators.pattern(reg)] ],
            whiteList:  [ null, [ Validators.minLength(7),
                Validators.maxLength(15),
                Validators.required,
                Validators.pattern(reg)] ],
            secretKey:  [ true, [Validators.required,
                Validators.minLength(6),
                Validators.maxLength(32),
                Validators.pattern(/^[a-zA-Z0-9]+$/)] ],
            portalUrl:  [ true, [Validators.required,
                Validators.minLength(1),
                Validators.maxLength(128),
                Validators.pattern(urlReg)] ],
            note:       [ true, [ Validators.maxLength(128)] ],
            port:       [ true, [
                Validators.required,
                Validators.minLength(2) ,
                Validators.maxLength(16),
                Validators.pattern('^[0-9]*[1-9][0-9]*$'),
                Validators.min(1),
                Validators.max(65535) ]
            ],
            authPort:   [ true, [ Validators.required,
                Validators.minLength(2) ,
                Validators.maxLength(16),
                Validators.pattern('^[0-9]*[1-9][0-9]*$'),
                Validators.min(1),
                Validators.max(65535) ] ],
            feePort:    [ true, [ Validators.required, Validators.pattern('^[0-9]*[1-9][0-9]*$'),
                Validators.min(1),
                Validators.max(65535) ] ]
        });
        this.showWhite = false;
    }

    /***/
    handleClose(removedTag: any): void {
        this.data.whiteList = this.data.whiteList.filter(tag => tag !== removedTag);
        // this.data.whiteList = this.tags;
        if (this.data.whiteList.length === 0) {
            this.showWhite = true;
        }
    }

    sliceTagName(tag: string): string {
        const isLongTag = tag.length > 20;
        return isLongTag ? `${tag.slice(0, 20)}...` : tag;
    }

    showInput(): void {
        this.inputVisible = true;
        setTimeout(() => {
            // this.validateForm.reset();
            this.inputVals.nativeElement.focus();
        }, 10);
    }

    handleInputConfirm(event): void {
        if (this.data.whiteList.indexOf(this.inputValue) !== -1) {
            this.message.error('IP不能相同!');
        } else {
            if (this.inputValue !== '' || this.inputValue !== undefined) {
                let reg = new RegExp('((25[0-5]|2[0-4]\\d|((1\\d{2})|([1-9]?\\d)))\\.){3}(25[0-5]|2[0-4]\\d|((1\\d{2})|([1-9]?\\d)))');
                if (reg.test(this.inputValue)) {
                    if (this.inputValue) {
                        this.data.whiteList.push(this.inputValue);
                        if (this.data.whiteList.length > 0) {
                            this.showWhite = false;
                        }
                        // this.validateForm.reset();
                    }
                } else {
                    this.message.error('IP不符合要求!');
                }
            }
        }
        // this.validateForm.reset();
        this.inputValue = '';
        this.inputVisible = false;
    }
    /***/

    public noWhitespaceValidator(control: FormControl) {
        let isWhitespace = (control.value || '').trim().length === 0;
        let isValid = !isWhitespace;
        return isValid ? null : { 'whitespace': true }
    }

    ngOnInit(): void {
        if (this.value != null) {
            this.type? this.data.setPortalData(this.value): this.data.setRadiusData(this.value);
            this.status = 1;
            this.whiteListData = JSON.stringify(this.value.whiteList);
        } else {
            this.status = 0;
            this.whiteListData = '';
        }
    }

    onKeyup(event: KeyboardEvent) { // with type info
        return event.keyCode>=48&&event.keyCode<=57;
    }

    onKeypress(event: KeyboardEvent) { // with type info
        return event.keyCode>=48&&event.keyCode<=57;
    }

    onBlur(event: KeyboardEvent) { // with type info
        (<HTMLInputElement>event.target).value = (<HTMLInputElement>event.target).value.replace(/[^\d]/g,'');
    }

    private validate(): boolean {
        let status: boolean = false;
        if (this.type) {
            for (let obj of this.portalForm) {
                this.validateForm.controls[obj].markAsDirty();
                if (this.validateForm.controls[obj].invalid) {
                    status = true;
                }
            }
            if (this.data.whiteList.length === 0 || this.data.whiteList.length === undefined || this.data.whiteList.length === null) {
                this.showWhite = true;
            }
        } else {
            for (let obj of this.radiusForm) {
                this.validateForm.controls[obj].markAsDirty();
                if (this.validateForm.controls[obj].invalid) {
                    status = true;
                }
            }
        }
        return status;
    }

    private decodePortalData():boolean {
        if (this.value.whiteList != null) {
            let whiteListArr = this.whiteData.nativeElement.innerHTML;
            let updateWhiteList = this.data.whiteList.join(',');
            if (this.data.name === this.value.portalName &&
                this.data.serverIp === this.value.portalIp &&
                this.data.shareKey === this.value.portalShareKey &&
                this.data.portalPort === this.value.portalAuthPort &&
                this.data.portalUrl === this.value.portalUrl &&
                updateWhiteList === whiteListArr &&
                this.data.remarks === this.value.remarks) {
                this.message.warning('数据无变化，无须提交！');
                return false;
            } else {
                return true;
            }
        } else {
            if (this.data.name === this.value.portalName &&
                this.data.serverIp === this.value.portalIp &&
                this.data.shareKey === this.value.portalShareKey &&
                this.data.portalPort === this.value.portalAuthPort &&
                this.data.portalUrl === this.value.portalUrl &&
                this.data.whiteList === this.value.whiteList &&
                this.data.remarks === this.value.remarks) {
                this.message.warning('数据无变化，无须提交！');
                return false;
            } else {
                return true;
            }
        }
    }

    private decodeRadiusData (): boolean {
        if (this.data.name === this.value.radiusName &&
            this.data.serverIp === this.value.masterServerIp &&
            this.data.shareKey === this.value.masterServerKey &&
            this.data.authPort === this.value.masterServerAuthPort &&
            this.data.feePort === this.value.masterServerFeePort &&
            this.data.remarks === this.value.remarks) {
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
                if (this.type) {
                    this.decodePortalData() ? this.editData() : null;
                } else {
                    this.decodeRadiusData()? this.editData(): null;
                }
            }
        }
    }

    /** 点击退出后的事件，关闭模态框 */
    handleCancel() {
        this.subject.destroy('onCancel');
    }

    private addData() {
        if (this.type === true) {
            if (this.data.whiteList.length > 0) {
                this.requestArgs.url = '/api/v1/portal';
                this.requestArgs.body = this.data.getPortalData();
                this.http.httpPost(this.requestArgs)
                    .subscribe(
                        res => {
                            if (res.code === 0) {
                                this.message.success('增加成功！');
                                let data: string = JSON.stringify(res.result);
                                this.subject.next('add|' + data);
                                this.subject.destroy('onOk');
                            } else {
                                this.message.error('数据添加失败！');
                                this.message.error(res.msg);
                            }
                        }
                    );
            } else {
                if (this.data.whiteList.length === 0) {
                    this.showWhite = true;
                }
            }
        } else {
            this.requestArgs.url = '/api/v1/radius';
            this.requestArgs.body = this.data.getRadiusData();
            this.http.httpPost(this.requestArgs)
                .subscribe(
                    res => {
                        if (res.code === 0) {
                            this.message.success('增加成功！');
                            let data: string = JSON.stringify(res.result);
                            this.subject.next('add|' + data);
                            this.subject.destroy('onOk');
                        } else {
                            this.message.error('数据添加失败！');
                            this.message.error(res.msg);
                        }
                    }
                );
        }
    }

    private editData() {
        if (this.type === true) {
            if (this.data.whiteList.length > 0) {
                this.requestArgs.url = '/api/v1/portal/' + this.data.id;
                this.requestArgs.body = this.data.getPortalData();
                this.http.httpPut(this.requestArgs)
                    .subscribe(
                        res => {
                            if (res.code === 0) {
                                this.message.success('编辑成功！');
                                let data = JSON.stringify(this.requestArgs.body);
                                this.subject.next('edit|' + data);
                                this.subject.destroy('onOk');
                            } else {
                                this.message.error('数据添加失败！');
                                this.message.error(res.msg);
                            }
                        }
                    );
            } else {
                if (this.data.whiteList.length === 0) {
                    this.showWhite = true;
                }
            }
        } else {
            this.requestArgs.url = '/api/v1/radius/' + this.data.id;
            this.requestArgs.body = this.data.getRadiusData();
            this.http.httpPut(this.requestArgs)
                .subscribe(
                    res => {
                        if (res.code === 0) {
                            this.message.success('编辑成功！');
                            let data = JSON.stringify(this.requestArgs.body);
                            this.subject.next('edit|' + data);
                            this.subject.destroy('onOk');
                        } else {
                            this.message.error('数据添加失败！');
                            this.message.error(res.msg);
                        }
                    }
                );
        }

    }
}
