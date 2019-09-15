import {Component, Input, OnInit} from '@angular/core';
import {HttpClientService} from "../../../../../../shared/service/httpClient.service";
import {RequestArgs} from "../../../../../../shared/model/request-args";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NzModalSubject} from "ng-zorro-antd";
import {routerTransition} from "../../../../../../animations/route-animations";
import {DropDownsInterface} from "../../../../../../shared/component/dropdown/model/dropdowns.model";

@Component({
    selector: 'app-emp-mgmt-modal',
    templateUrl: './emp-mgmt-modal.component.html',
    styleUrls: ['./emp-mgmt-modal.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})
export class EmpMgmtModalComponent implements OnInit {

    /**判断点击的是 新增 or 编辑*/
    @Input() modalTitleName: String;
    /**组件传给模态框的元素*/
    @Input() element: any;
    /**点击新增 or 编辑的时候，获取下拉列表数据*/
    dropDownList: Array<any>=[];

    /**下拉选中ID*/
    dropDownId: any;
    /**表单认证*/
    validateForm: FormGroup;
    /**user表单中需要验证的部分*/
    arrayForm: Array<string>;

    deptNameList;
    deptIdList;
    empSex;

    constructor(private subject: NzModalSubject, public fb: FormBuilder, private http: HttpClientService) {
        this.getDropDownList();
    }

    /**
     * 表单提交完成的数据
     * @param $event
     * @param value
     */
    submitForm = ($event, value) => {
        if (this.validate()) {
            return;
        }
        this.element.empName = value.empName;
        this.element.empSex = value.empSex;
        this.element.empMobile = value.empMobile;
        this.element.empEmail = value.empEmail;
        this.element.empPosition = value.empPosition;
        this.element.jobNumber = value.jobNumber;

        this.element.deptIdList=value.deptIdList;
        this.element.deptNameList=this.deptNameList;

        console.log(this.element);
        this.subject.next();
        let result = {};
        result["modalTitleName"] = this.modalTitleName;
        result["element"] = this.element;
        this.subject.next(this.element);
    };

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
        this.dropDownId = value;
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
        return this.validateForm.controls[name];
    }

    /**
     * 编辑时，给模态框赋值
     * @param value
     */
    updateModalValue(value) {
        if (value) {
            this.validateForm.patchValue({
                empName:value.empName,
                jobNumber:value.jobNumber,
                empSex:value.empSex,
                empMobile:value.empMobile,
                empEmail:value.empEmail,
                empPosition:value.empPosition,
                deptIdList:value.deptIdList?value.deptIdList.split(","):[]
            });
            this.deptNameList = value.deptNameList;
            // this.deptIdList=value.deptIdList?value.deptIdList.split(","):[];

            if (this.modalTitleName === "新增") {
            } else if (this.modalTitleName === "编辑") {
                // this.deptIdList=value.deptIdList.split(",");
                // this.deptNameList=value.deptNameList.split(",");
                // this.empSex = value.empSex;
            }
        }
    }

    ngOnInit() {
        this.arrayForm = ['empName', 'jobNumber','empSex','empMobile','empEmail', 'empPosition','deptIdList'];

        let obj = {
            empName: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(32),
                Validators.pattern(/^[A-Za-z0-9_\u4e00-\u9fa5]+$/)]],
            jobNumber: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(32),
                Validators.pattern(/^[a-zA-Z0-9]+$/)]],
            empSex: ['', [Validators.required]],
            empMobile: ['', [Validators.required,Validators.minLength(11),Validators.maxLength(11),
                Validators.pattern(/^[1][3,4,5,7,8,9][0-9]{9}$/) ]],
            empEmail: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(64),
                Validators.pattern(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i)]],
            empPosition: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(32),
                Validators.pattern(/^[A-Za-z0-9_\u4e00-\u9fa5]+$/)]],
            deptIdList: ['', [Validators.required]]
        };
        this.validateForm = this.fb.group(obj);

        this.updateModalValue(this.element);
    }

    getDropDownList() {
        let requestArgs = new RequestArgs();
        requestArgs.header = {'ticket': sessionStorage.getItem('ticket'), 'Content-Type': 'application/json'};
        requestArgs.url = "/department/api/display/list";
        requestArgs.systemName = "wlanscope";
        this.http.httpGet(requestArgs).subscribe(res => {
            if (res.code === 0) {
                let tmp = [];
                for (let obj of res.result) {
                    tmp.push(<DropDownsInterface> {id: ""+obj['id'], name: obj['deptName']});
                }
                this.dropDownList = tmp;
            } else if (res.code === 9) {
                this.dropDownList = [];
            }
        });
    }

}
