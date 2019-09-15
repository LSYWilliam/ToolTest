import {Component, OnInit} from '@angular/core';
import {NzMessageService, NzModalSubject} from "ng-zorro-antd";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
/**
 * 添加角色模态框模块
 * @class AddRoleModalComponent
 */
@Component({
  selector: 'app-add-role-modal',
  templateUrl: './add-role-modal.component.html',
  styleUrls: ['./add-role-modal.component.scss']
})
export class AddRoleModalComponent implements OnInit {
    /**角色input框的值*/
    public inputValue:string;
    public validate: FormGroup;

    constructor(private subject: NzModalSubject,public _message: NzMessageService,private fb: FormBuilder) {
        this.validate = this.fb.group({
            roleName : ['', Validators.compose(
                [Validators.required, Validators.pattern("^[a-zA-Z0-9\u4e00-\u9fa5]+$"),
                    Validators.minLength(2), Validators.maxLength(16)
                ]
            )]
        });
    }
    /**点击新增角色模态框的确定按钮*/
    handleOk() {
        this.validate.controls['roleName'].markAsDirty();
        if (this.validate.controls['roleName'].invalid === true) {
            return;
        }
        let roleName=new Object();
        roleName['roleName']=this.inputValue;
        this.subject.next(JSON.stringify(roleName));
        this.subject.destroy('onOk');
    }
    /**点击新增角色模态框的取消按钮*/
    handleCancel() {
        this.subject.destroy('onCancel');
    }
    /**页面初始化数据*/
    ngOnInit() {
    }

}
