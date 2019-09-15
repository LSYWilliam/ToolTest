import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NzModalSubject} from "ng-zorro-antd";
import {RequestArgs} from "../../../../../../shared/model/request-args";
import {HttpClientService} from "../../../../../../shared/service/httpClient.service";
import {routerTransition} from "../../../../../../animations/route-animations";

@Component({
    selector: 'app-dept-basic-info-modal',
    templateUrl: './dept-basic-info-modal.component.html',
    styleUrls: ['./dept-basic-info-modal.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})
export class DeptBasicInfoModalComponent implements OnInit {
    /**判断点击的是 新增 or 编辑*/
    @Input() modalTitleName:String;
    /**组件传给模态框的元素*/
    @Input() element: any;
    /**点击新增 or 编辑的时候，获取下拉列表数据*/
    @Input() dropDownList: Array<any>;

    /**下拉选中ID*/
    dropDownId: any;
    /**下拉菜单默认值*/
    defaultName: any;
    /**表单认证*/
    validateForm: FormGroup;
    /**user表单中需要验证的部分*/
    arrayForm:Array<string>;

    partCode: string;
    parentPartCode: string;

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
        this.element.partName=value.partName;
        this.element.partLeader=value.partLeader;
        this.element.partCode=this.partCode;
        this.element.parentPartCode=this.dropDownId;
        this.subject.next();
        let result= {};
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
        this.dropDownId=value;
        this.getPartCode(value);
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
     * 获取部门编码
     * @param parentPartCode
     * @returns {Subscription}
     */
    getPartCode(parentPartCode) {
        let requestArgs = new RequestArgs();
        requestArgs.header = {'ticket': sessionStorage.getItem('ticket'),'Content-Type':'application/json'};
        requestArgs.url="/hzfacade/depart/create-depart-code";
        requestArgs.systemName = "attendance";
        requestArgs.body = {'parentPartCode': parentPartCode };
        return this.http.httpGet(requestArgs).subscribe(res=> {
            if(res.code===0) {
                this.partCode=res.result.partCode;
            }
        });
    }

    /**
     * 编辑时，给模态框赋值
     * @param value
     */
    updateModalValue(value) {
        if (value) {
            this.validateForm.patchValue({
                partName: value.partName,
                partLeader: value.partLeader
            });
            if(!value.parentPartName) {
                this.defaultName="最上级目录";
                this.dropDownId = "";
            } else {
                this.defaultName = value.parentPartName;
                this.dropDownId = value.parentPartCode;
            }

            if(this.modalTitleName==="新增") {
                this.getPartCode(value.parentPartCode||"");
            } else if(this.modalTitleName==="编辑") {
                this.partCode= value.partCode;
                this.defaultName = value.parentPartName;
                this.dropDownId = value.parentPartCode;
            }
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
        } else if (!(/^[a-zA-Z_\u4e00-\u9fa5]+$/.test(control.value))) {
            return { duplicated: true };
        }
    }

    ngOnInit() {
        this.arrayForm = ['partName', 'partLeader'];
        let obj = {
            partName: ['', [this.nameValidator, Validators.maxLength(32), Validators.minLength(2)]],
            partLeader: ['', [this.nameValidator, Validators.maxLength(32), Validators.minLength(2)]]
        };
        this.validateForm = this.fb.group(obj);

        this.updateModalValue(this.element);
    }
}
