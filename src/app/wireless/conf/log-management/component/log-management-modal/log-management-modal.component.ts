import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzMessageService, NzModalService, NzModalSubject} from "ng-zorro-antd";
import {LogManagementModelItem} from "../../model/log-management.model";
import {DropDownsInterface} from "../../../../../shared/component/dropdown/model/dropdowns.model";
import {HttpClientService} from "../../../../../shared/service/httpClient.service";
import {RequestArgs} from "../../../../../shared/model/request-args";

@Component({
    selector: 'app-log-management-modal',
    templateUrl: './log-management-modal.component.html',
    styleUrls: ['./log-management-modal.component.scss']
})
export class LogManagementModalComponent implements OnInit {
    /**判断点击的是 新增 or 编辑*/
    @Input() modalTitleName: String;
    /**组件传给模态框的元素*/
    @Input() element: LogManagementModelItem;

    @Input() dropDownNetList: Array<any>;

    dropDownList: Array<any> = new Array<any>();
    /**表单认证*/
    validateForm: FormGroup;
    /**user表单中需要验证的部分*/
    arrayForm:Array<string>;
    /**http请求*/
    public requestArgs:RequestArgs = new RequestArgs();

    webPort;
    udpPort;

    constructor(private subject: NzModalSubject, public fb: FormBuilder,private http: HttpClientService,
                public _message: NzMessageService,) {
        this.dropDownList.push({
            id:1,name:"启用"
        });
        this.dropDownList.push({
            id:0,name:"停用"
        });
    }


    /**
     * 表单提交完成的数据
     * @param $event
     * @param value
     */
    submitForm = ($event, value) => {
        console.log(this.element);
        if(this.validate()) {
            return;
        }
        if(!this.element) {
            this.element = new LogManagementModelItem();
        }
        this.element.step = value.step;
        this.element.flag = value.flag;
        this.element.host1 = value.host1;
        this.element.port1 = value.port1;
        this.element.host2 = value.host2;
        this.element.port2 = value.port2;
        this.element.host3 = value.host3;
        this.element.port3 = value.port3;
        this.element.netId = value.netId;

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
    updateModalValue(value:LogManagementModelItem) {
        console.log(value);
        console.log(this.dropDownNetList);
        if (value) {
            let tmp = {
                step: value.step,
                flag: value.flag,
                host1: value.host1,
                port1: value.port1,
                host2: value.host2,
                port2: value.port2,
                host3: value.host3,
                port3: value.port3,
                netId: value.netId
            };
            this.validateForm.patchValue(tmp);
        }
    }

    ngOnInit() {
        this.arrayForm = ['step', 'flag', 'host1', 'port1', 'host2','port2', 'host3','port3', 'netId'];
        let obj = {
            step: ['', [
                Validators.required,
                Validators.minLength(1),
                Validators.maxLength(99999),
                Validators.pattern("^[A-Za-z0-9\u4e00-\u9fa5]+$")]],
            flag: ['', [
                Validators.required]],
            host1: ['', [
                Validators.minLength(7),
                Validators.maxLength(15),
                Validators.required,
                Validators.pattern('((25[0-5]|2[0-4]\\d|((1\\d{2})|([1-9]?\\d)))\\.){3}(25[0-5]|2[0-4]\\d|((1\\d{2})|([1-9]?\\d)))')]],
            port1: ['', [
                Validators.required,
                Validators.pattern('^[0-9]*[1-9][0-9]*$'),
                Validators.min(1),
                Validators.max(65535)]],
            host2: ['', [
                Validators.minLength(7),
                Validators.maxLength(15),
                Validators.pattern('((25[0-5]|2[0-4]\\d|((1\\d{2})|([1-9]?\\d)))\\.){3}(25[0-5]|2[0-4]\\d|((1\\d{2})|([1-9]?\\d)))')]],
            port2: ['', [
                Validators.pattern('^[0-9]*[1-9][0-9]*$'),
                Validators.min(1),
                Validators.max(65535)]],
            host3: ['', [
                Validators.minLength(7),
                Validators.maxLength(15),
                Validators.pattern('((25[0-5]|2[0-4]\\d|((1\\d{2})|([1-9]?\\d)))\\.){3}(25[0-5]|2[0-4]\\d|((1\\d{2})|([1-9]?\\d)))')]],
            port3: ['', [
                Validators.pattern('^[0-9]*[1-9][0-9]*$'),
                Validators.min(1),
                Validators.max(65535)]],
            netId: ['', [
                Validators.required]]
        };
        this.validateForm = this.fb.group(obj);
        this.updateModalValue(this.element);
    }

}
