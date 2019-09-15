import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NzModalSubject} from "ng-zorro-antd";
import {HttpClientService} from "../../../../../../shared/service/httpClient.service";
import {routerTransition} from "../../../../../../animations/route-animations";
import {DeptMgmtElement} from "../../model/dept-mgmt-data-model";

@Component({
    selector: 'app-dept-basic-info-modal',
    templateUrl: './dept-mgmt-info-modal.component.html',
    styleUrls: ['./dept-mgmt-info-modal.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})
export class DeptMgmtInfoModalComponent implements OnInit {
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

    id: string;
    member: string;
    managerName: string;
    // parentPartCode: string;

    constructor(private subject: NzModalSubject, public fb: FormBuilder, private http: HttpClientService) {
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
        this.element.deptName=value.deptName;
        this.element.deptCode=value.deptCode;
        this.element.managerName=value.managerName;
        this.element.parentName=this.defaultName;
        this.element.id=this.id;
        this.element.parentId=this.dropDownId;
        this.element.member=this.member;

        console.log(this.element instanceof DeptMgmtElement);
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
        // this.getPartCode(value);
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
     * 编辑时，给模态框赋值
     * @param value
     */
    updateModalValue(value) {
        if (value) {
            this.validateForm.patchValue({
                deptName: value.deptName,
                deptCode: value.deptCode,
                managerName: value.managerName
            });
            if(!value.parentName) {
                this.defaultName="最上级目录";
                this.dropDownId = "";
            } else {
                this.defaultName = value.parentName;
                this.dropDownId = value.parentId;
            }

            if(this.modalTitleName==="新增") {
                // this.getPartCode(value.parentPartCode||"");
            } else if(this.modalTitleName==="编辑") {
                this.id= value.id;
                this.defaultName = value.parentName;
                this.dropDownId = value.parentId;
                this.member = value.member;
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
        this.arrayForm = ['deptName', 'deptCode', 'managerName'];
        let obj = {
            deptName: ['', [Validators.required, Validators.maxLength(32), Validators.minLength(2), Validators.pattern(/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/)]],
            deptCode: ['', [Validators.required, Validators.maxLength(32), Validators.minLength(2), Validators.pattern(/^[a-zA-Z0-9]+$/)]],
            managerName: ['', [Validators.required, Validators.maxLength(32), Validators.minLength(2), Validators.pattern(/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/)]],
        };
        this.validateForm = this.fb.group(obj);

        console.log(this.element);
        this.updateModalValue(this.element);
    }
}
