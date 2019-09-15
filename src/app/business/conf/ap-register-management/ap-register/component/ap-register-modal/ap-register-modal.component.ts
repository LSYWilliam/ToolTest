import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzModalSubject} from "ng-zorro-antd";
import {ApRegisterItem} from "../../model/ap-register.model";

@Component({
  selector: 'app-ap-register-modal',
  templateUrl: './ap-register-modal.component.html',
  styleUrls: ['./ap-register-modal.component.scss']
})
export class ApRegisterModalComponent implements OnInit {

    /**判断点击的是 新增 or 编辑*/
    @Input() modalTitleName: String;
    /**组件传给模态框的元素*/
    @Input() element: ApRegisterItem;
    /**点击新增 or 编辑的时候，获取下拉列表数据*/
    @Input() dropDownList: Array<any>;

    /**表单认证*/
    validateForm: FormGroup;
    /**user表单中需要验证的部分*/
    arrayForm:Array<string>;

    adapterIp;
    adapterId;

    constructor(private subject: NzModalSubject, public fb: FormBuilder) {
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

        if(!this.element) {
            this.element = new ApRegisterItem();
        } else {
        }
        this.element.apSn=value.apSn;
        this.element.adapterId=this.adapterId;

        this.subject.next(this.element);
    }

    /**
     * 表单取消事件
     * @param {MouseEvent} $event
     */
    resetForm($event: MouseEvent) {
        this.subject.destroy('onCancel');
    }

    /**
     * 判断验证是否通过
     * @returns {boolean}
     */
    validate(): boolean {
        let status = false;
        for (let obj of this.arrayForm) {
            this.validateForm.controls[obj].markAsDirty();
            if (this.validateForm.controls[obj].invalid) {
                status = true;
            }
        }
        return status;
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
     * 模态框角色下拉框
     * @param value
     */
    getDropDown(value) {
        this.adapterId = value;
    }

    /**
     * 编辑时，给模态框赋值
     * @param value
     */
    updateModalValue(value:ApRegisterItem) {
        if (value) {
            let tmp = {
                apSn:value.apSn
            };
            if(typeof value.adapterIp === "undefined") {
                this.dropDownList.push({id:0,name:"无"});
                this.adapterId=0;
                this.adapterIp = "无";
            } else {
                this.adapterIp = value.adapterIp;
                this.dropDownList.forEach(res=> {
                    if(res.name===this.adapterIp) {
                        this.adapterId=res.id;
                    }
                });
            }

            this.validateForm.patchValue(tmp);
        }
    }

    ngOnInit() {
        this.arrayForm = ['apSn'];
        let obj = {
            apSn: ['', [Validators.required]]
        };
        this.validateForm = this.fb.group(obj);

        this.updateModalValue(this.element);
    }

}
