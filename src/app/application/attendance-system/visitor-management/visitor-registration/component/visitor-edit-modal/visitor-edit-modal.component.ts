import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NzModalSubject} from "ng-zorro-antd";
import {HttpClientService} from "../../../../../../shared/service/httpClient.service";
import {DropDownsInterface} from "../../../../../../shared/component/dropdown/model/dropdowns.model";
import * as moment from "moment";
import {VisitorRegistrationModel} from "../../model/visitor-registration.model";

@Component({
  selector: 'app-visitor-edit-modal',
  templateUrl: './visitor-edit-modal.component.html',
  styleUrls: ['./visitor-edit-modal.component.scss']
})
export class VisitorEditModalComponent implements OnInit {

    /**判断点击的是 新增 or 编辑*/
    @Input() modalTitleName:String;
    /**组件传给模态框的元素*/
    @Input() element: VisitorRegistrationModel;

    /**表单认证*/
    validateForm: FormGroup;
    /**user表单中需要验证的部分*/
    arrayForm:Array<string>;

    gender: string;
    isPrecontract: string;
    visitDate: string;

    sexDropDownList: Array<DropDownsInterface>;
    isPrecontractDropDownList: Array<DropDownsInterface>;



    constructor(private subject: NzModalSubject, public fb: FormBuilder, private http: HttpClientService) {
        this.sexDropDownList = new Array<DropDownsInterface>();
        this.sexDropDownList.push({id:"男", name:"男"});
        this.sexDropDownList.push({id:"女", name:"女"});
        this.gender=this.sexDropDownList[0].name;

        this.isPrecontractDropDownList = new Array<DropDownsInterface>();
        this.isPrecontractDropDownList.push({id:"预约", name:"预约"});
        this.isPrecontractDropDownList.push({id:"未预约", name:"未预约"});
        this.isPrecontract=this.isPrecontractDropDownList[0].name;
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

        if(!this.element){
            this.element = new VisitorRegistrationModel();
        } else {
            let id = this.element.id;
            this.element = new VisitorRegistrationModel();
            this.element.id = id;
        }

        this.element.visitorName=value.visitorName;
        this.element.visitorWorkPlace=value.visitorWorkPlace;
        this.element.visitDate=moment(value.visitDate).format("YYYY-MM-DD HH:mm:ss");
        this.element.inviter=value.inviter;
        this.element.visitorTel=value.visitorTel;
        this.element.reasons=value.reasons;
        this.element.remark=value.remark;

        this.element.gender=this.gender;
        this.element.isPrecontract=this.isPrecontract;

        this.subject.next();
        let result=new Object();
        result["modalTitleName"]=this.modalTitleName;
        result["element"]=this.element;
        this.subject.next(<VisitorRegistrationModel>this.element);
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
    getIsPrecontractDropDown(value) {
        this.isPrecontractDropDownList.forEach(res => {
            if(res.id===value) {
                this.isPrecontract=res.name;
            }
        });
    }

    /**
     * 模态框角色下拉框
     * @param value
     */
    getSexDropDown(value) {
        this.sexDropDownList.forEach(res => {
            if(res.id===value) {
                this.gender=res.name;
            }
        });
    }

    /**
     * 判断验证是否通过
     * @returns {boolean}
     */
    validate(): boolean {
        let status: boolean = false;
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
                visitorName: value.visitorName,
                visitorWorkPlace: value.visitorWorkPlace,
                visitDate: value.visitDate,
                inviter: value.inviter,
                visitorTel: value.visitorTel,
                reasons: value.reasons,
                remark: value.remark
            });
            if(this.modalTitleName==="新增") {
                this.gender = value.gender;
                this.isPrecontract = value.isPrecontract;

            } else if(this.modalTitleName==="修改") {
                this.gender = value.gender;
                this.isPrecontract = value.isPrecontract;
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
        } else if (!(/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(control.value))) {
            return { duplicated: true };
        }
    }

    /**电话号码验证*/
    phoneValidator = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return { required: true }
        } else if (control.value.length!==11||!(/^[1][3,4,5,7,8,9][0-9]{9}$/.exec(control.value))) {
            return { phone: true, error: true };
        }
    }

    ngOnInit() {
        this.arrayForm = ['visitorName', 'visitorWorkPlace', 'visitDate', 'inviter', 'visitorTel', 'reasons', 'remark'];
        let obj = {
            visitorName: ['', [Validators.required, Validators.minLength(2),Validators.maxLength(32),this.nameValidator]],
            visitorWorkPlace: ['', [Validators.required, Validators.maxLength(32)]],
            visitDate: [new Date(), [Validators.required]],
            inviter: ['', [Validators.required, Validators.minLength(2),Validators.maxLength(32),this.nameValidator]],
            visitorTel: ['', [this.phoneValidator]],
            reasons: ['', [ Validators.maxLength(200)]],
            remark: ['', [ Validators.maxLength(200)]]
        };
        this.validateForm = this.fb.group(obj);

        this.updateModalValue(this.element);
    }

}
