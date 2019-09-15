import {Component, Input, OnInit} from '@angular/core';
import {AdapterManagementItem} from "../../model/adapter-management.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzModalSubject} from "ng-zorro-antd";

@Component({
    selector: 'app-adapter-management-modal',
    templateUrl: './adapter-management-modal.component.html',
    styleUrls: ['./adapter-management-modal.component.scss']
})
export class AdapterManagementModalComponent implements OnInit {
    /**判断点击的是 新增 or 编辑*/
    @Input() modalTitleName: String;
    /**组件传给模态框的元素*/
    @Input() element: AdapterManagementItem;

    @Input() dropDownList: Array<any>;

    /**表单认证*/
    validateForm: FormGroup;
    /**user表单中需要验证的部分*/
    arrayForm:Array<string>;

    port;
    port2;

    adapterGroupIp;
    adapterGroupId;
    submitFlag=false;

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
            this.element = new AdapterManagementItem();
        }
        this.element.adapterName = value.adapterName;
        this.element.adapterIp = value.adapterIp;
        this.element.port = value.port;
        this.element.port2 = value.port2;
        this.element.remark = value.remark;
        this.element.adapterGroupId=this.adapterGroupId;

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
        this.submitFlag = true;
        for (let obj of this.arrayForm) {
            this.validateForm.controls[obj].markAsDirty();
            if (this.validateForm.controls[obj].invalid) {
                status = true;
            }
        }
        return status;
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

    /**
     * 模态框角色下拉框
     * @param value
     */
    getDropDown(value) {
        this.adapterGroupId = value;
    }

    /**
     * 获取表单控制项
     * @param name
     * @returns {any}
     */
    getFormControl(name) {
        return this.validateForm.controls[ name ];
    }

    validateIP() {
        if(this.submitFlag) {
            return this.adapterGroupId?false:true;
        } else {
            return false;
        }
    }
    /**
     * 编辑时，给模态框赋值
     * @param value
     */
    updateModalValue(value:AdapterManagementItem) {
        if (value) {
            let tmp = {
                adapterName: value.adapterName,
                adapterIp: value.adapterIp,
                port: value.port,
                port2: value.port2,
                remark: value.remark
            };
            this.port = value.port;
            this.port2 = value.port2;

            if(typeof value.adapterGroupId === "undefined") {
                this.dropDownList.push({id:0,name:"无"});
                this.adapterGroupId=0;
                this.adapterGroupIp = "无";
            } else {
                this.adapterGroupId = value.adapterGroupId;
                this.dropDownList.forEach(res=> {
                    if(res.id===this.adapterGroupId) {
                        this.adapterGroupIp=res.name;
                    }
                });
            }

            this.validateForm.patchValue(tmp);
        }
    }

    ngOnInit() {
        this.arrayForm = ['adapterName', 'adapterIp', 'port', 'port2','remark'];
        let obj = {
            adapterName: ['', [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(20),
                Validators.pattern("^[A-Za-z0-9\u4e00-\u9fa5]+$")]],
            adapterIp: ['', [
                Validators.minLength(7),
                Validators.maxLength(15),
                Validators.required,
                Validators.pattern('((25[0-5]|2[0-4]\\d|((1\\d{2})|([1-9]?\\d)))\\.){3}(25[0-5]|2[0-4]\\d|((1\\d{2})|([1-9]?\\d)))')]],
            port: ['', [
                Validators.required,
                Validators.pattern('^[0-9]*[1-9][0-9]*$'),
                Validators.min(1),
                Validators.max(65535)]],
            port2: ['', [
                Validators.required,
                Validators.pattern('^[0-9]*[1-9][0-9]*$'),
                Validators.min(1),
                Validators.max(65535)]],
            remark: ['', [ Validators.maxLength(400)]]
        };
        this.port=5246;
        this.port2=20000;
        this.validateForm = this.fb.group(obj);

        this.updateModalValue(this.element);
    }

}
