import {Component, Input, OnInit} from '@angular/core';
import {HttpClientService} from "../../../../../../shared/service/httpClient.service";
import {RequestArgs} from "../../../../../../shared/model/request-args";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzModalSubject} from "ng-zorro-antd";
import {DropDownsInterface} from "../../../../../../shared/component/dropdown/model/dropdowns.model";

@Component({
    selector: 'app-emp-terminal-mgmt-modal',
    templateUrl: './emp-terminal-mgmt-modal.component.html',
    styleUrls: ['./emp-terminal-mgmt-modal.component.scss']
})
export class EmpTerminalMgmtModalComponent implements OnInit {

    /**判断点击的是 新增 or 编辑*/
    @Input() modalTitleName: String;
    /**组件传给模态框的元素*/
    @Input() element: any;
    /**点击新增 or 编辑的时候，获取下拉列表数据*/
    equipmentTypeDropDownList: Array<any>;
    /**点击新增 or 编辑的时候，获取下拉列表数据*/
    deptDropDownList: Array<any>;
    /**点击新增 or 编辑的时候，获取下拉列表数据*/
    empDropDownList: Array<any>;

    totalEmpDropDownList;

    /**下拉选中ID*/
    dropDownId: any;
    /**下拉菜单默认值*/
    defaultName: any;
    /**表单认证*/
    validateForm: FormGroup;
    /**user表单中需要验证的部分*/
    arrayForm: Array<string>;

    equipmentType: string;
    deptName: string;
    deptId: number;
    empName: string;
    empId: any;
    deptFlag: boolean;

    constructor(private subject: NzModalSubject, public fb: FormBuilder, private http: HttpClientService) {
        this.equipmentTypeDropDownList = new Array<DropDownsInterface>();
        this.equipmentTypeDropDownList.push({id: "PC", name: "PC"});
        this.equipmentTypeDropDownList.push({id: "手机", name: "手机"});
        this.getDeptDropDownList();
        this.getEmpDropDownList();
        this.deptFlag = false;
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
        this.element.macAddr = value.macAddr;
        this.element.equipmentNumber = value.equipmentNumber;
        this.element.equipmentType = value.equipmentType;
        this.element.deptName = this.deptName;
        this.element.deptId = this.deptId;
        this.element.empName = this.empName;
        this.element.empId = this.empId;
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

    onSearchDeptName(value) {
        this.deptId = value;
        if (this.deptDropDownList) {
            this.deptDropDownList.forEach(res => {
                if (res.id === value) {
                    this.deptName = res.name;
                }
            });
            this.getEmpFromDept(value);
            this.empId = null;
            this.empName = "";
            if (this.deptId) {
                this.deptFlag = false;
            } else {
                this.deptFlag = true;
            }
        }
    }

    onSearchEmpName(value) {
        this.empId = value;
        if (this.empDropDownList) {
            this.empDropDownList.forEach(res => {
                if (res.id === value) {
                    this.empName = res.name;
                }
            });
        }
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
        // if(!this.equipmentType||"undefined"===this.equipmentType||""===this.equipmentType) {
        //     status = true;
        // }
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
        console.log(value);
        if (value) {
            this.validateForm.patchValue({
                macAddr: value.macAddr,
                equipmentNumber: value.equipmentNumber,
                equipmentType: value.equipmentType,
                deptId: parseInt((value.deptIdList.split(",") ? value.deptIdList.split(",") : [])[0], 10),
                empId: value.empId
            });

            if (this.modalTitleName === "新增") {
            } else if (this.modalTitleName === "编辑") {
                // this.equipmentType = value.equipmentType;
                // this.deptName = value.deptNameList.split(",")[0];
                this.deptId = parseInt(value.deptIdList.split(",")[0], 10);
                // this.empName = value.empName;
                this.empId = value.empId;
            }
            console.log(this.deptId);
            if (this.deptId) {
                this.deptFlag = false;
            } else {
                this.deptFlag = true;
            }
        } else {
            this.deptFlag = true;
        }
    }

    ngOnInit() {
        this.arrayForm = ['macAddr', 'equipmentNumber', 'equipmentType', 'deptId', 'empId'];

        let obj = {
            macAddr: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(32),
                Validators.pattern(/^[A-Fa-f0-9]{2}[:][A-Fa-f0-9]{2}[:][A-Fa-f0-9]{2}[:][A-Fa-f0-9]{2}[:][A-Fa-f0-9]{2}[:][A-Fa-f0-9]{2}$/)]],
            equipmentNumber: ['', [Validators.minLength(2), Validators.maxLength(32),
                Validators.pattern(/^[a-zA-Z0-9]+$/)]],
            equipmentType: ['', [Validators.required]],
            deptId: ['', [Validators.required]],
            empId: ['', [Validators.required]]
        };
        this.validateForm = this.fb.group(obj);

        this.updateModalValue(this.element);
    }

    getDeptDropDownList() {
        let requestArgs = new RequestArgs();
        requestArgs.header = {'ticket': sessionStorage.getItem('ticket'), 'Content-Type': 'application/json'};
        requestArgs.url = "/department/api/display/list";
        requestArgs.systemName = "wlanscope";
        this.http.httpGet(requestArgs).subscribe(res => {
            if (res.code === 0) {
                let tmp = [];
                for (let obj of res.result) {
                    tmp.push(<DropDownsInterface> {id: obj['id'], name: obj['deptName']});
                }
                this.deptDropDownList = tmp;
            } else if (res.code === 9) {
                this.deptDropDownList = [];
            }
        });
    }

    getEmpDropDownList() {
        let requestArgs = new RequestArgs();
        requestArgs.header = {'ticket': sessionStorage.getItem('ticket'), 'Content-Type': 'application/json'};
        requestArgs.url = "/employee/api/query/list";
        requestArgs.systemName = "wlanscope";
        this.http.httpGet(requestArgs).subscribe(res => {
            if (res.code === 0) {
                let tmp = [];
                for (let obj of res.result) {
                    tmp.push(<DropDownsInterface> {id: obj['id'], name: obj['empName']});
                }
                this.empDropDownList = res.result;
                this.totalEmpDropDownList = res.result;
            } else if (res.code === 9) {
                this.empDropDownList = [];
            }
        });
    }

    getEmpFromDept(deptId) {
        let tmp = [];
        if (this.totalEmpDropDownList) {
            this.totalEmpDropDownList.forEach(res => {
                let tmpId = "" + deptId;
                if (res.deptIdList) {
                    let array = res.deptIdList.split(",");
                    if (array.length > 0) {
                        array.forEach(glt => {
                            if (glt === tmpId) {
                                tmp.push(res);
                            }
                        });
                    }
                }
            });
            this.empDropDownList = tmp;
        }
    }
}
