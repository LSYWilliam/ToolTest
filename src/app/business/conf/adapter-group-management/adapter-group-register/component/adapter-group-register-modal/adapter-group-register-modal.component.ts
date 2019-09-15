import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzModalSubject} from "ng-zorro-antd";
import {AdapterGroupRegisterItem} from "../../model/adapter-group-register.model";

@Component({
  selector: 'app-adapter-group-register-modal',
  templateUrl: './adapter-group-register-modal.component.html',
  styleUrls: ['./adapter-group-register-modal.component.scss']
})
export class AdapterGroupRegisterModalComponent implements OnInit,OnDestroy {
    /**判断点击的是 新增 or 编辑*/
    @Input() modalTitleName: String;
    /**组件传给模态框的元素*/
    @Input() element: AdapterGroupRegisterItem;
    /**点击新增 or 编辑的时候，获取下拉列表数据*/
    @Input() dropDownList: Array<any>;

    /**表单认证*/
    validateForm: FormGroup;
    /**user表单中需要验证的部分*/
    arrayForm:Array<string>;

    contentStatus=false;

    adapterGroupIp;
    adapterGroupId;

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
            this.element = new AdapterGroupRegisterItem();
        } else {
        }
        this.element.businessName=value.businessName;
        this.element.adapterGroupId=this.adapterGroupId;

        this.subject.next(this.element);
        this.contentStatus=true;
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
        this.adapterGroupId = value;
        console.log(value);
    }

    /**
     * 编辑时，给模态框赋值
     * @param value
     */
    updateModalValue(value:AdapterGroupRegisterItem) {
        if (value) {
            let tmp = {
                businessName:value.businessName
            };
            if(typeof value.adapterGroupIp === "undefined") {
                this.dropDownList.push({id:0,name:"无"});
                this.adapterGroupId=0;
                this.adapterGroupIp = "无";
            } else {
                this.adapterGroupIp = value.adapterGroupIp;
                this.dropDownList.forEach(res=> {
                    if(res.name===this.adapterGroupIp) {
                        this.adapterGroupId=res.id;
                    }
                });
            }

            this.validateForm.patchValue(tmp);
        }
    }

    ngOnInit() {
        this.arrayForm = ['businessName'];
        let obj = {
            businessName: ['', [Validators.required]],
            adapterGroupIp: ['', [Validators.required]],
        };
        this.validateForm = this.fb.group(obj);

        this.updateModalValue(this.element);
    }

    ngOnDestroy(): void {
        this.contentStatus=false;
    }
}
