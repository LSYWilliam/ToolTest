import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NzModalSubject} from "ng-zorro-antd";
import {RequestArgs} from "../../../../../../shared/model/request-args";
import {HttpClientService} from "../../../../../../shared/service/httpClient.service";
import {DropDownsInterface} from "../../../../../../shared/component/dropdown/model/dropdowns.model";
import {StaffBasicInfoModel} from "../../model/staff-basic-info.model";
import * as moment from "moment";

@Component({
  selector: 'app-staff-basic-info-modal',
  templateUrl: './staff-basic-info-modal.component.html',
  styleUrls: ['./staff-basic-info-modal.component.scss']
})
export class StaffBasicInfoModalComponent implements OnInit {

    /**判断点击的是 新增 or 编辑*/
    @Input() modalTitleName:String;
    /**组件传给模态框的元素*/
    @Input() element: StaffBasicInfoModel;
    /**点击新增 or 编辑的时候，获取下拉列表数据*/
    @Input() dropDownList: Array<any>;

    /**表单认证*/
    validateForm: FormGroup;
    /**user表单中需要验证的部分*/
    arrayForm:Array<string>;

    usrSex: string;
    usrPosition: string;
    usrDepartName: string;
    usrWorkStatus: string;

    sexDropDownList: Array<DropDownsInterface>;
    positionDropDownList: Array<DropDownsInterface>;
    departDropDownList: Array<DropDownsInterface>;
    usrWorkStatusDropDownList: Array<DropDownsInterface>;

    position: string;
    departCode: string;

    constructor(private subject: NzModalSubject, public fb: FormBuilder, private http: HttpClientService) {
        this.sexDropDownList = [];
        this.sexDropDownList.push({id:"男", name:"男"});
        this.sexDropDownList.push({id:"女", name:"女"});
        this.usrWorkStatusDropDownList = [];
        this.usrWorkStatusDropDownList.push({id:"在职", name:"在职"});
        this.usrWorkStatusDropDownList.push({id:"离职", name:"离职"});

        this.positionDropDownList = [];
        this.setPositionDropDown();
        this.departDropDownList = [];
        this.setDepartDropDown();
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
            this.element = new StaffBasicInfoModel();
        } else {
            let usrId = this.element.usrId;
            let usrWorkStatus = this.element.usrWorkStatus;
            this.element = new StaffBasicInfoModel();
            this.element.usrId = usrId;
            this.element.usrWorkStatus = usrWorkStatus;
        }

        this.element.usrName=value.usrName;
        this.element.usrRealName=value.usrRealName;
        this.element.usrAge=value.usrAge;
        this.element.usrRegisterTime=moment(value.usrRegisterTime).format("YYYY-MM-DD");

        this.element.usrEmail=value.usrEmail;
        this.element.usrMobile=value.usrMobile;
        this.element.usrMac=value.usrMac;
        this.element.usrContent=value.usrContent;
        this.element.usrWorkStatus = this.usrWorkStatus;
        if(this.element.usrWorkStatus==="在职") {
            this.element.usrOffWorkTime="";
        } else {
            this.element.usrOffWorkTime=moment(value.usrOffWorkTime).format("YYYY-MM-DD");
        }

        this.element.usrPosition=this.usrPosition;
        this.element.usrSex=this.usrSex;
        this.element.refDepartCode=this.departCode;

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
     * 用户名认证——数字、字母，或中文
     * @param {FormControl} control
     * @returns {{[p: string]: boolean}}
     */
    userNameValidator = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return { required: true };
        } else if (!(/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(control.value))) {
            return { duplicated: true };
        }
    }

    /**
     * 用户名认证——数字、字母，或中文
     * @param {FormControl} control
     * @returns {{[p: string]: boolean}}
     */
    userRealNameValidator = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return { required: true };
        } else if (!(/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(control.value))) {
            return { duplicated: true };
        }
    }

    /**
     * email认证
     * @param {FormControl} control
     * @returns {{[p: string]: boolean}}
     */
    emailValidator = (control: FormControl): { [s: string]: boolean } => {
       const EMAIL_REGEXP = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
        if (!control.value) {
            return { required: true };
        } else if (!EMAIL_REGEXP.test(control.value)) {
            return { error: true, email: true };
        }
    }

    /**
     * 电话号码验证
     * @param {FormControl} control
     * @returns {{[p: string]: boolean}}
     */
    phoneValidator = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return { required: true };
        } else if (control.value.length!==11||!(/^[1][3,4,5,7,8,9][0-9]{9}$/.exec(control.value))) {
            return { phone: true, error: true };
        }
    }

    /**
     * mac认证
     * @param {FormControl} control
     * @returns { boolean }
     */
    macValidator = (control: FormControl): { [s: string]: boolean } => {
        const reg= /^[A-Fa-f0-9]{2}[:][A-Fa-f0-9]{2}[:][A-Fa-f0-9]{2}[:][A-Fa-f0-9]{2}[:][A-Fa-f0-9]{2}[:][A-Fa-f0-9]{2}$/;
        if (!control.value) {
            return { required: true };
        } else if (!(reg.exec(control.value))) {
            return { mac: true, error: true };
        }
    }


    /**
     * 编辑时，给模态框赋值
     * @param value
     */
    updateModalValue(value:StaffBasicInfoModel) {
        if (value) {
            let tmp = {
                usrName: value.usrName,
                usrRealName: value.usrRealName,
                usrAge: value.usrAge,
                usrRegisterTime: value.usrRegisterTime,
                usrEmail: value.usrEmail,
                usrMobile: value.usrMobile,
                usrMac: value.usrMac,
                usrContent: value.usrContent
            };
            if(this.modalTitleName==="编辑") {
                Object.assign(tmp,{
                    usrOffWorkTime: value.usrOffWorkTime
                });
            }
            this.validateForm.patchValue(tmp);

            this.usrSex = value.usrSex;
            this.usrDepartName=value.partName;
            this.departCode = value.refDepartCode;
            this.usrPosition= value.usrPosition;
            this.usrWorkStatus = value.usrWorkStatus;
        }
    }

    /**
     * 根据新增和编辑生成不同的页面UI
     */
    updateModalView() {
        if(!this.usrSex) {
            this.usrSex=this.sexDropDownList[0].id;
        }
        if(!this.usrWorkStatus) {
            this.usrWorkStatus=this.usrWorkStatusDropDownList[0].id;
        }
    }

    /**
     * 模态框角色下拉框
     * @param value
     */
    getPositionDropDown(value) {
        this.position=value;
        this.positionDropDownList.forEach(res => {
            if(res.id===value) {
                this.usrPosition=res.name;
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
                this.usrSex=res.name;
            }
        });
    }

    /**
     * 模态框角色下拉框
     * @param value
     */
    getDepartDropDown(value) {
        this.departCode=value;
        this.departDropDownList.forEach(res => {
            if(res.id===value) {
                this.usrDepartName=res.name;
            }
        });
    }

    /**
     * 获取用户工作状态下拉菜单选中数据
     * @param value
     */
    getUsrWorkStatusDropDown(value) {
        this.usrWorkStatusDropDownList.forEach(res => {
            if(res.id===value) {
                this.usrWorkStatus=res.name;
            }
        });
    }

    /**
     * 设置岗位下拉菜单
     * @returns {Subscription}
     */
    setPositionDropDown() {
        let requestArgs = new RequestArgs();
        requestArgs.header = {'ticket': sessionStorage.getItem('ticket'),'Content-Type':'application/json'};
        requestArgs.url="/hzfacade/user/find-all-position-info";
        requestArgs.systemName = "attendance";
        return this.http.httpGet(requestArgs).subscribe(res=> {
            if(res.code===0) {
                res.result.forEach(glt=> {
                    this.positionDropDownList.push({id:glt.id, name:glt.name});
                });
            }
        });
    }

    /**
     * 设置部门数据下拉菜单
     * @returns {Subscription}
     */
    setDepartDropDown() {
        let requestArgs = new RequestArgs();
        requestArgs.header = {'ticket': sessionStorage.getItem('ticket'),'Content-Type':'application/json'};
        requestArgs.url="/hzfacade/depart/list-depart-info";
        requestArgs.systemName = "attendance";
        requestArgs.body = {'pageNo': 0,'pageSize': 10000 };
        return this.http.httpGet(requestArgs).subscribe(res=> {
            if(res.code===0) {
                res.result.forEach(glt=> {
                    this.departDropDownList.push({id:glt.partCode, name:glt.partName});
                });
            }
        });
    }

    ngOnInit() {
        this.arrayForm = ['usrName', 'usrRealName', 'usrAge',
            'usrRegisterTime', 'usrEmail', 'usrMobile', 'usrMac', 'usrContent'];
        let obj = {
            usrName: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(32),this.userNameValidator]],
            usrRealName: ['', [Validators.required, Validators.minLength(2),Validators.maxLength(32),this.userRealNameValidator]],
            usrAge: ['18', [Validators.required]],
            usrRegisterTime: [new Date(), [Validators.required]],
            usrEmail: ['', [ Validators.maxLength(64), this.emailValidator]],
            usrMobile: ['', [this.phoneValidator]],
            usrMac: ['', [ Validators.pattern(/^[A-Fa-f0-9]{2}[:][A-Fa-f0-9]{2}[:][A-Fa-f0-9]{2}[:][A-Fa-f0-9]{2}[:][A-Fa-f0-9]{2}[:][A-Fa-f0-9]{2}$/)]],
            usrContent: ['', [ Validators.maxLength(400)]]
        };
        if(this.modalTitleName==="编辑") {
            Object.assign(obj,{
                usrOffWorkTime: ['', []]
            });
        }
        this.validateForm = this.fb.group(obj);

        this.updateModalView();
        this.updateModalValue(this.element);
    }

}
