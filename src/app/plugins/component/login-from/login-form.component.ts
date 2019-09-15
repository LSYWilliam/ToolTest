import {Component, Input, OnChanges, OnInit, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserModel} from '../../entity/user.model';
import {Md5} from 'ts-md5/dist/md5';
import {NzMessageService} from 'ng-zorro-antd';

/**
 * 登录组件
 * @class LoginComponent
 */
@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss']
})

export class LoginFormComponent implements OnChanges, OnInit {
    /**从父组件获取验证码数据*/
    @Input() public validateCode: any;
    /**从父组件获取登录数据*/
    @Input() public loginMessage: any;
    /**验证码事件*/
    @Output() validateCodeEvent: EventEmitter<any> = new EventEmitter<any>();
    /**点击登录事件*/
    @Output() loginEvent: EventEmitter<any> = new EventEmitter<any>();
    /**登录成功事件*/
    @Output() loginSuccessEvent: EventEmitter<any> = new EventEmitter<any>();
    /** 表单组 */
    public validateForm: FormGroup;
    /**验证码的Base64*/
    public validate: string;
    /** 用户实体 */
    private userModel: UserModel;
    /**密码后面的小眼睛是否显示还是隐藏*/
    public openFlag=false;
    /**密码是否显示还是隐藏  password隐藏  text显示*/
    public isShowPassword="password";

    constructor(private fb: FormBuilder, private _message: NzMessageService) {
        this.userModel = new UserModel();
    }

    /**登录*/
    logIn() {
        if ( this.judgeFrom()) {
            this.transformPassWordTOMD5();
            this.userModel._ticket = sessionStorage.getItem('captchaTicket');
            this.loginEvent.emit(this.userModel);
        }
    }

    /**
     * 判断表单属性是否正确。
     * @returns  boolean，正确返回true，错误返回false。
     */
    judgeFrom(): boolean {
        /** 判断表单属性是否正确*/
        if (this.validateForm.controls['userName'].valid
                    && this.validateForm.controls['password'].valid
                    && this.validateForm.controls['code'].valid ) {
            /** 表达属性塞入userModel实体*/
            this.userModel._username = this.validateForm.controls['userName'].value;
            this.userModel._password = this.validateForm.controls['password'].value;
            this.userModel._code = this.validateForm.controls['code'].value.toLowerCase();
            return true;
        } else {
            this.cleanFrom();
            return false;
        }
    }

    /** 销毁表单属性 */
    cleanFrom() {
        this.validateForm.controls['password'].markAsDirty();
        this.validateForm.controls['password'].setValue(null);
        this.validateForm.controls['code'].markAsDirty();
        this.validateForm.controls['code'].setValue(null);
    }

    /** 将密码转换为MD5 */
    transformPassWordTOMD5() {
        this.userModel._password = Md5.hashStr(this.userModel._password);
    }

    /**点击刷新验证码*/
    refreshValidate() {
        this.validateCodeEvent.emit();
    }

    /**
     * 显示或者显示密码
     */
    isOpenEyes(value) {
        this.openFlag = value ? false : true;
        this.isShowPassword = value ? "password" : "text";
    }

    /**监听组件表格内容是否改变的 生命周期函数*/
    ngOnChanges() {
        /** 接收到了父组件传递过来的登录数据*/
        if (this.loginMessage) {
            switch (this.loginMessage.code) {
                case 0:
                    this.loginSuccessEvent.emit();
                    sessionStorage.setItem("ticket", this.loginMessage.result.ticket);
                    sessionStorage.setItem("userName", this.userModel._username);
                    this.loginMessage = null;
                    break;
                default:
                    this._message.create('error', this.loginMessage.msg, {nzDuration: 3000});
                    this.cleanFrom();
                    this.loginMessage = null;
                    break;
            }
        }
    }
    ngOnInit() {
        /** 设置validateForm的参数 */
        this.validateForm = this.fb.group({
            userName: [ null, [ Validators.required ] ],
            password: [ null, [ Validators.required ] ],
            code: [ null, [ Validators.required ] ]
        });
        /** 页面刚加载进来的时候 获取验证码 并且设置ticket */
    }
}

