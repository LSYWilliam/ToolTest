import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NzModalSubject} from "ng-zorro-antd";
import {HttpClientService} from "../../../../../../shared/service/httpClient.service";
import {RequestArgs} from "../../../../../../shared/model/request-args";
import {WorkShiftModel} from "../../model/work-shift.model";

@Component({
  selector: 'app-work-shift-modal',
  templateUrl: './work-shift-modal.component.html',
  styleUrls: ['./work-shift-modal.component.scss']
})
export class WorkShiftModalComponent implements OnInit {

    /**判断点击的是 新增 or 编辑*/
    @Input() modalTitleName:String;
    /**组件传给模态框的元素*/
    @Input() element: any;
    /**点击新增 or 编辑的时候，获取下拉列表数据*/
    @Input() dropDownList: Array<any>;

    /**表单认证*/
    validateForm: FormGroup;
    /**user表单中需要验证的部分*/
    arrayForm:Array<string>;

    gender: string;
    isPrecontract: string;
    visitDate: string;
    exceedFlag = false;

    constructor(private subject: NzModalSubject, public fb: FormBuilder, private http: HttpClientService) {
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
            this.element = new WorkShiftModel();
        } else {
            let id = this.element.id;
            this.element = new WorkShiftModel();
            this.element.id = id;
        }

        this.element.flightName=value.flightName;
        this.element.flightAmTime=value.flightAmTime;
        this.element.flightPmTime=value.flightPmTime;
        this.element.flightLateTime=value.flightLateTime;
        this.element.flightAbsentTime=value.flightAbsentTime;

        let result=new Object();
        result["modalTitleName"]=this.modalTitleName;
        result["element"]=this.element;
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
     * 模态框角色下拉框
     * @param value
     */
    getDropDown(value) {
        this.getPartCode(value);
    }

    /**
     * 判断验证是否通过
     * @returns {boolean}
     */
    validate(): boolean {
        let status = false;
        if(this.exceedFlag) {
            status = true;
        }
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

    getPartCode(parentPartCode) {
        let requestArgs = new RequestArgs();
        requestArgs.header = {'ticket': sessionStorage.getItem('ticket'),'Content-Type':'application/json'};
        requestArgs.url="/hzfacade/depart/create-depart-code";
        requestArgs.systemName = "attendance";
        requestArgs.body = {'parentPartCode': parentPartCode };
        return this.http.httpGet(requestArgs).subscribe(res=> {
        });
    }

    /**
     * 编辑时，给模态框赋值
     * @param value
     */
    updateModalValue(value) {
        if (value) {
            this.validateForm.patchValue({
                flightName: value.flightName,
                flightAmTime: value.flightAmTime.substr(0,5),
                flightPmTime: value.flightPmTime.substr(0,5),
                flightLateTime: value.flightLateTime,
                flightAbsentTime: value.flightAbsentTime
            });
        }
    }

    /**
     * 用户名认证
     * @param {FormControl} control
     * @returns {{[p: string]: boolean}}
     */
    nameValidator = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return { required: true };
        } else if (!(/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(control.value))) {
            return { duplicated: true };
        }
    }

    /**
     * 时间格式认证
     * @param {FormControl} control
     * @returns {{[p: string]: boolean}}
     */
    timeValidator = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return { required: true };
        } else if (!(new RegExp(/^(20|21|22|23|[0-1]\d):[0-5]\d$/,"g").test(control.value) )) {
            return { duplicated: true };
        }
    }

    /**
     * 分钟数格式认证
     * @param {FormControl} control
     * @returns {{[p: string]: boolean}}
     */
    minNumberValidator = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return { required: true };
        } else if (!(/^[1-9]\d*$|^0$/.test(control.value))) {
            return { duplicated: true };
        } else if (this.getFormControl('flightLateTime').value&&this.getFormControl('flightAbsentTime').value) {
            let flightAbsentTime = parseInt(this.getFormControl('flightAbsentTime').value,0);
            let flightLateTime = parseInt(this.getFormControl('flightLateTime').value,0);
            if(flightAbsentTime<=flightLateTime) {
                this.exceedFlag = true;
                return { duplicated: true };
            } else {
                this.exceedFlag = false;
            }
        }
    }

    ngOnInit() {
        this.arrayForm = ['flightName', 'flightAmTime', 'flightPmTime', 'flightLateTime', 'flightAbsentTime'];
        let obj = {
            flightName: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(32),this.nameValidator]],
            flightAmTime: ['', [Validators.required, this.timeValidator]],
            flightPmTime: ['', [Validators.required, this.timeValidator]],
            flightLateTime: ['', [Validators.required, this.minNumberValidator, Validators.max(240), Validators.min(0)]],
            flightAbsentTime: ['', [Validators.required, this.minNumberValidator, Validators.max(240), Validators.min(0)]]
        };
        this.validateForm = this.fb.group(obj);

        this.updateModalValue(this.element);
    }

}
