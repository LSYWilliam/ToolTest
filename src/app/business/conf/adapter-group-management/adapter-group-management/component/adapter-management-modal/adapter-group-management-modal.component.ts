import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzModalSubject} from "ng-zorro-antd";
import {AdapterGroupManagementItem} from "../../model/adapter-group-management.model";

@Component({
    selector: 'app-adapter-group-management-modal',
    templateUrl: './adapter-group-management-modal.component.html',
    styleUrls: ['./adapter-group-management-modal.component.scss']
})
export class AdapterGroupManagementModalComponent implements OnInit {
    /**判断点击的是 新增 or 编辑*/
    @Input() modalTitleName: String;
    /**组件传给模态框的元素*/
    @Input() element: AdapterGroupManagementItem;

    /**表单认证*/
    validateForm: FormGroup;
    /**user表单中需要验证的部分*/
    arrayForm:Array<string>;

    webPort;
    udpPort;

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
            this.element = new AdapterGroupManagementItem();
        }
        this.element.adapterGroupName = value.adapterGroupName;
        this.element.adapterGroupIp = value.adapterGroupIp;
        this.element.webPort = value.webPort;
        this.element.udpPort = value.udpPort;
        this.element.address = value.address;
        this.element.remark = value.remark;

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
     * 获取表单控制项
     * @param name
     * @returns {any}
     */
    getFormControl(name) {
        return this.validateForm.controls[ name ];
    }

    /**
     * 编辑时，给模态框赋值
     * @param value
     */
    updateModalValue(value:AdapterGroupManagementItem) {
        if (value) {
            let tmp = {
                adapterGroupName: value.adapterGroupName,
                adapterGroupIp: value.adapterGroupIp,
                webPort: value.webPort,
                udpPort: value.udpPort,
                address: value.address,
                remark: value.remark
            };
            this.webPort = value.webPort;
            this.udpPort = value.udpPort;
            this.validateForm.patchValue(tmp);
        }
    }

    ngOnInit() {
        this.arrayForm = ['adapterGroupName', 'adapterGroupIp', 'webPort', 'udpPort','address', 'remark'];
        let obj = {
            adapterGroupName: ['', [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(20),
                Validators.pattern("^[A-Za-z0-9\u4e00-\u9fa5]+$")]],
            adapterGroupIp: ['', [
                Validators.minLength(7),
                Validators.maxLength(15),
                Validators.required,
                Validators.pattern('((25[0-5]|2[0-4]\\d|((1\\d{2})|([1-9]?\\d)))\\.){3}(25[0-5]|2[0-4]\\d|((1\\d{2})|([1-9]?\\d)))')]],
            webPort: ['', [
                Validators.required,
                Validators.pattern('^[0-9]*[1-9][0-9]*$'),
                Validators.min(1),
                Validators.max(65535)]],
            udpPort: ['', [
                Validators.required,
                Validators.pattern('^[0-9]*[1-9][0-9]*$'),
                Validators.min(1),
                Validators.max(65535)]],
            address:['',Validators.required],
            remark: ['', [ Validators.maxLength(400)]]
        };
        this.webPort=5246;
        this.udpPort=5246;
        this.validateForm = this.fb.group(obj);

        this.updateModalValue(this.element);
    }

}
