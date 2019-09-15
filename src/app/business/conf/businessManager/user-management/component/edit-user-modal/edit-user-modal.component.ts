import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Role, UserElement} from "../../model/user-management.model";
import {NzModalSubject} from "ng-zorro-antd";
/**
 * 用户模态框模块
 * @class EditUserModalComponent
 */
@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.scss']
})
export class EditUserModalComponent implements OnInit {
    /**被选中的角色Id*/
    roleId;
    /**点击新增按钮，默认的角色Id*/
    defaultRoleId;
    /**点击新增按钮，默认的角色名称*/
    defaultRoleName;
    /**新增、编辑用户模态框相关函数*/
    validateForm: FormGroup;
    /**页面左上角下拉框选中商户ID*/
    businessId:any;
    /**密码后面的小眼睛是否显示还是隐藏*/
    openFlag=false;
    /**密码是否显示还是隐藏  password隐藏  text显示*/
    isShowPassword="password";
    /**user表单中需要验证的部分*/
    userForm:Array<string>;
    /**判断点击的是 新增 or 编辑*/
    @Input() modalTitleName:String;
    @Input() userElement:UserElement;
    /**点击新增 or 编辑的时候，获取角色列表数据*/
    @Input() roleList:Array<any>;

    constructor(private subject: NzModalSubject,public fb: FormBuilder) {
    }

    /**
     * 表单提交完成的数据
     * @param $event
     * @param value
     */
    submitForm = ($event, value) => {
        if(this.validate()) {
            return;
        }
        let pUser:UserElement=new Object();
        pUser.username=value.userName;
        pUser.password=value.password;
        pUser.contactName=value.contactName;
        pUser.peakConcurrentUsers=value.peakConcurrentUsers;
        pUser.contactEmail=value.contactEmail;
        pUser.contactTele=value.contactTele;
        pUser.roles=new Role();
        pUser.roles.id=this.roleId;
        pUser.roles.roleName=this.getNameFromArray(this.roleList,this.roleId);
        this.subject.next();
        let result=new Object();
        result["modalTitleName"]=this.modalTitleName;
        result["userElement"]=pUser;
        this.subject.next(JSON.stringify(result));

    }

    /**
     * 表单取消事件
     * @param {MouseEvent} $event
     */
    resetForm($event: MouseEvent) {
        this.subject.destroy('onCancel');
    }

    /**
     * 用户名认证
     * @param {FormControl} control
     * @returns {{[p: string]: boolean}}
     */
    userNameValidator = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return { required: true };
        } else if (!(/[0-9]/i.test(control.value)&&/[a-zA-Z]/i.test(control.value)
                &&!new RegExp("[\\u4E00-\\u9FFF]+","g").test(control.value))) {
            return { duplicated: true };
        }
    }
    /**
     * 获取表单控制项
     * @param name
     * @returns {any}
     */
    getFormControl(name) {
        return this.validateForm.controls[ name ];
    }

    /**
     * 邮件格式认证
     * @param {FormControl} control
     * @returns {{[p: string]: boolean}}
     */
    emailValidator = (control: FormControl): { [s: string]: boolean } => {
        const EMAIL_REGEXP = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
        if (control.value==="") {
        } else if (!EMAIL_REGEXP.test(control.value)) {
            return { error: true, email: true };
        }
    };

    /**电话号码验证*/
    phoneValidator = (control: FormControl): { [s: string]: boolean } => {
        if(control.value==="") {
        } else if (control.value.length!==11||!(/^[1][3,4,5,7,8,9][0-9]{9}$/.exec(control.value))) {
            return { phone: true, error: true };
        }
    }

    /**模态框角色下拉框*/
    getDropDown(value) {
        this.roleId=value;
    }
    /**判断验证是否通过*/
    private validate(): boolean {
        let status = false;
        for (let obj of this.userForm) {
            this.validateForm.controls[obj].markAsDirty();
            if (this.validateForm.controls[obj].invalid) {
                status = true;
            }
        }
        return status;
    }

    /**
     * 编辑时，给模态框赋值
     * @param value
     */
    updateModalValue(value) {
        if (value) {
            this.validateForm.patchValue({
                userName: value.username,
                /**保证password认证在编辑情况下通过*/
                contactEmail:value.contactEmail,
                peakConcurrentUsers:value.peakConcurrentUsers,
                contactName:value.contactName,
                contactTele:value.contactTele
            });
            this.defaultRoleId=value.roleId;
            this.defaultRoleName=this.getNameFromArray(this.roleList,this.defaultRoleId);
        }
    }

    /**
     * 模态框取消事件
     * @param {MouseEvent} $event
     */
    handleCancel($event: MouseEvent) {
        this.validateForm.reset();
        this.subject.destroy('onDestory');
    }

    /**
     * 模态框确定事件
     */
    handleOk() {
        this.validateForm.reset();
        this.subject.destroy('onOk');
    }

    /**
     * 从数组中获取对应的Name
     * @param array
     * @param key
     * @returns {null}
     */
    getNameFromArray(array,key) {
        for(let i of array) {
            if(i.id===key) {
                return i.name;
            }
        }
        return null;
    }

    /**
     * 显示或者显示密码
     */
    isOpenEyes(value) {
        this.openFlag = value ? false : true;
        this.isShowPassword = value ? "password" : "text";
    }
    /**初始化页面数据
     *      1. 校验form表单
     *      2. 设置模态框默认值
     * */
    ngOnInit() {
        this.userForm = ['userName','password','contactName','contactTele','contactEmail','peakConcurrentUsers'];
        let obj = {
            userName:['',[ Validators.required,Validators.minLength(2),Validators.maxLength(32),Validators.pattern(/^[a-zA-Z0-9]+$/) ]],
            contactName:['',[ Validators.required,Validators.minLength(2),Validators.maxLength(16),Validators.pattern(/^[a-zA-Z0-9\u4e00-\u9fa5]+$/) ]],
            contactTele:['',[ Validators.required,Validators.maxLength(11),this.phoneValidator ]],
            contactEmail:['',[ Validators.maxLength(64),this.emailValidator ]],
            peakConcurrentUsers:[1,[Validators.min(1),Validators.max(100) ]]
        };
        if(this.modalTitleName==="编辑") {
            let objEdit = Object.assign(obj,{
                password:['',[Validators.minLength(8),Validators.maxLength(32),Validators.pattern(/^[a-zA-Z0-9]+$/) ]]
            });
            this.validateForm = this.fb.group(objEdit);
            this.updateModalValue(this.userElement);
        } else {
           let objAdd = Object.assign(obj,
               {
                   password:['',[
                       Validators.minLength(8),
                       Validators.required,
                       Validators.maxLength(32),
                       Validators.pattern(/^[a-zA-Z0-9]+$/)
                   ]]
               });
            this.validateForm = this.fb.group(objAdd);
            this.defaultRoleName=this.roleList[0].name;
            this.defaultRoleId=this.roleList[0].id;
        }
        this.roleId=this.defaultRoleId;
    }

}
