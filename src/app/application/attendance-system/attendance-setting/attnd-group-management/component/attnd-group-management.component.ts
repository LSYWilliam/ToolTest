import {Component, OnDestroy, OnInit} from '@angular/core';
import {AttndGroupManagementService} from "../service/attnd-group-management.service";
import {AttndGroup} from "../model/attnd-group.model";
import {AddStaffModalComponent} from "./add-staff-modal/add-staff-modal.component";
import {routerTransition} from "../../../../../animations/route-animations";

@Component({
    selector: 'app-attnd-group-management',
    templateUrl: './attnd-group-management.component.html',
    styleUrls: ['./attnd-group-management.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}

})
export class AttndGroupManagementComponent extends AttndGroupManagementService implements OnInit, OnDestroy {
    /**操作标识*/
    oper:string;
    /**考勤种类*/
    groupWorksModel: Array<string>;
    /**班次名称*/
    flightName: string;
    /**考勤周期选择*/
    checkOptions = [
        { label: '星期一', value: '1' },
        { label: '星期二', value: '2' },
        { label: '星期三', value: '3' },
        { label: '星期四', value: '4' },
        { label: '星期五', value: '5' },
        { label: '星期六', value: '6' },
        { label: '星期日', value: '7' }
    ];

    /**主页面方法*/
    /**
     * 增加按钮事件
     */
    addButton() {
        this.oper="新增";
        this.initValidateForm();
        this.conditionExpression = "editPage";
        this.groupItem = new AttndGroup();
        this.staffList = [];
        this.toInitEditPage(this.groupItem);
    }

    /**
     * 编辑按钮事件
     */
    editButton() {
        this.oper="编辑";
        this.child.selectAll();
    }

    /**
     * 删除按钮事件
     */
    deleteButton() {
        this.oper="删除";
        this.child.selectAll();
    }

    /**
     * 双击表格后的事件
     * @description
     *       双击表格后，弹出模态框
     */
    doubleClick(data: any) {
        this.oper="编辑";
        this.getDataSelectedFromZorroTable([data]);
    }

    /**
     * 获取来自佐罗表格的数据
     * @param value
     */
    getDataSelectedFromZorroTable(value) {
        if(this.oper==="编辑"&&value.length!==1) {
            this._message.create('error', "只能选择一个进行编辑！");
            return;
        }
        if(this.oper==="删除"&&value.length<=0) {
            this._message.create('error', "请至少选择一个进行删除！");
            return;
        }
        if(this.oper==="编辑") {
            this.initValidateForm();
            this.conditionExpression = "editPage";
            this.toInitEditPage(value[0].data);
            this.getStaffByAttandGroup(value[0].data);
        } else if(this.oper==="删除") {
            this.commonUtilService.customConfirm("请确认要删除此项吗？",()=> {
                let ids=[];
                value.forEach(res=> {
                    ids.push(res.data.id);
                });
                this.delAttndGroup(ids);
            });
        }
    }

    /**
     * 初始化编辑页面
     * @param value
     */
    toInitEditPage(value) {
        this.groupItem = value;
        this.groupItem.flightId = value.flightId;
        this.groupItem.kqMethod = value.kqMethod;
        this.groupItem.groupWorkModes = value.groupWorkModes;
        this.groupItem.groupManagerName = value.groupManagerName;

        this.setWorkModel(this.groupItem.groupWorkModes);

        let flightId=""+this.groupItem.flightId;
        if(typeof this.groupItem.flightId ==="undefined" ) {
            this.flightName=this.workShiftListModel.dropDowns[0].name;
            this.groupItem.flightId=this.workShiftListModel.dropDowns?parseInt(this.workShiftListModel.dropDowns[0].id):0;
        } else {
            this.workShiftListModel.dropDowns.forEach(res=> {
                if(flightId===(""+res.id)) {
                    this.flightName=res.name;
                }
            });
        }
    }

    /**
     * 保存编辑页面
     * @param value
     */
    toSaveEditPage() {
        if(typeof this.groupItem.flightId ==="undefined" ) {
            this.groupItem.flightId=this.workShiftListModel.dropDowns?parseInt(this.workShiftListModel.dropDowns[0].id,0):0;
        }
        if(typeof this.groupItem.groupName ==="undefined" || this.groupItem.groupName ==="") {
            this._message.error("请输入考勤组名！");
            return;
        }
        if(typeof this.groupItem.groupManagerName ==="undefined" || this.groupItem.groupManagerName ==="") {
            this._message.error("请输入负责人！");
            return;
        }
        this.tableChild.getAllData();
    }

    /**
     * 获取用户ID数据
     * @param value
     */
    getUsrIdData(data) {
        let tmp_array = [];
        if(data) {
            for(let item of data) {
                tmp_array.push(item.id);
            }
            this.groupItem.userList = tmp_array.join(",");
        } else {
            this.groupItem.userList = "";
        }
        if(this.oper==="新增") {
            this.addAttndGroup(this.groupItem);
        } else if(this.oper==="编辑") {
            this.editAttndGroup(this.groupItem);
        }
    }

    /**
     * 返回主页
     */
    goBack() {
        this.conditionExpression = "firstShow";
        this.oper="";
    }

    /**
     * 保存按钮方法
     */
    saveButton() {
        if(this.validate()) {
            return;
        }
        this.toSaveEditPage();
    }

    /**
     * 增加用户按钮方法
     */
    addUsersButton() {
        this.showModal("新增员工");
    }

    /**
     * 展示新增或编辑模态框
     */
    showModal(modalTitleFlag) {
        /**打开模态框*/
        let modalConfig = {
            title          : modalTitleFlag,
            content        : AddStaffModalComponent,
            width          : 1000,
            onOk() {},
            onCancel() {},
            footer         : false,
            closable       : false,
            maskClosable   : false,
            componentParams: {
                finalTableData: this.staffList,
                dataMenu: this.dataMenu,
                dataRoot: this.dataRoot,
                modalTitleName: modalTitleFlag
            }
        };
        this.subscription$ = this.modalService.open(modalConfig);
        this.subscription$.subscribe(result => {
            if(typeof result==="object") {
                this.tableChild.gridApi.setRowData(result);
                this.staffListModel.staffList = [];
            }
        });
    }

    /**
     * 获取下拉值
     * @param value
     */
    getDropDown(value) {
        this.groupItem.flightId=value;
    }

    /**
     * 保存工作模式
     * @param value
     */
    saveWorkModel(value) {
        let groupWorkModes = value.filter(value1 => value1.checked).map(value2 => value2.value).join(",");
        this.groupItem.groupWorkModes = groupWorkModes;
    }

    /**
     * 设置工作模式
     * @param value
     */
    setWorkModel(value) {
        if(!value) {
            this.checkOptions.forEach(glt=> {
                    glt["checked"]=false;
            });
            return;
        }
        let tmp_array = value.split(",");
        tmp_array.forEach(res=> {
            this.checkOptions.forEach(glt=> {
                if(res === glt.value) {
                    glt["checked"]=true;
                }
            });
        });
    }

    /**
     * 获取班次值
     * @param value
     */
    getWorkShiftDropDown(value) {
        this.groupItem.flightId=value;
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
    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        if (this.subscription$ !== undefined) {
            this.subscription$.destroy();
        }
        if(this.commonUtilService.subscription$ !== undefined) {
            this.commonUtilService.subscription$.destroy();
        }
    }

}
