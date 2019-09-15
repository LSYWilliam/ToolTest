import {Component, OnDestroy, OnInit} from '@angular/core';
import {routerTransition} from "../../../../../animations/route-animations";
import {UserManagementService} from '../service/user-management.service';
import {Role, UserManagementModel} from "../model/user-management.model";
import {UserElement} from '../model/user-management.model';
import {UserHeadDataModel} from "../model/user-head.model";
import {EditUserModalComponent} from "./edit-user-modal/edit-user-modal.component";
import {DropDownsInterface} from "../../../../../shared/component/dropdown/model/dropdowns.model";

/**
 * 用户管理模块
 * @class UserManagementComponent
*/
@Component
({
    selector: 'app-user-management',
    templateUrl: './user-management.component.html',
    styleUrls: ['./user-management.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})

export class UserManagementComponent extends UserManagementService implements OnInit, OnDestroy {
    /** 定义个windowHeight类型 */
    public windowHeight: number;
    /**批量选中时执行方法标志*/
    flag: string;
    /**edit-table表格行数据*/
    rowData: any;
    /**点击的是 新增 or 编辑 */
    modalTitleName = "新增";
    /**编辑时被选中的userId*/
    userId;
    /**模态框表单 联系人名称*/
    contactName: String;
    /**模态框表单 联系方式*/
    contactTele: String;
    /**模态框表单 角色名称*/
    roleName: String;
    /**用户管理表格 静态数据*/
    userHeadDataModel: UserHeadDataModel = new UserHeadDataModel();

    /**
     * 获取表格元素数量
     * @param value
     */
    getDowLength(value) {
        this.userTotal = value;
    }

    /**
     * 打开增加用户模态框
     */
    openAddModal() {
        let tmpUserElement = <UserElement>new Object();
        this.showModal("新增", tmpUserElement);
    }

    /**
     * 打开编辑用户模态框
     */
    openEditModal() {
        this.flag = "编辑";
        this.child.selectAll();
    }

    /**
     * 展示模态框事件
     * @param modalTitleFlag
     * @param pUserElement
     */
    showModal(modalTitleFlag, pUserElement) {
        this.modalTitleName = modalTitleFlag;
        pUserElement.businessName = this.businessName;
        let pRoleList = new Array();
        this.roleList.forEach(eachItem => {
            pRoleList.push(<DropDownsInterface>{id: eachItem['id'], name: eachItem['roleName']});
        });
        /**打开是否保存的提示框*/
        let modalConfig = {
            title: "" + this.modalTitleName + "用户",
            content: EditUserModalComponent,
            onOk() {
            },
            onCancel() {
            },
            footer: false,
            maskClosable: false,
            componentParams: {
                roleList: pRoleList,
                userElement: pUserElement,
                modalTitleName: this.modalTitleName
            }
        };
        this.subscription$ = this.modalService.open(modalConfig);
        this.subscription$.subscribe(result => {
            if (new RegExp("userElement").test(result)) {
                let pResult = JSON.parse(result);
                let pUser = pResult.userElement;
                pUser.businessId = this.businessId;
                if (pResult.modalTitleName === "新增") {
                    super.addUserElement(pUser);
                } else if (pResult.modalTitleName === "编辑") {
                    pUser.userId = pUserElement.userId;
                    pUserElement.username = pUser.username;
                    pUserElement.contactName = pUser.contactName;
                    pUserElement.peakConcurrentUsers = pUser.peakConcurrentUsers;
                    pUserElement.roles = new Role();
                    pUserElement.roles.id = pUser.roles.id;
                    pUserElement.contactEmail = pUser.contactEmail;
                    pUserElement.contactTele = pUser.contactTele;
                    this.editUserElement(pUserElement);
                }
            }
        });
    }

    /**
     * 批量删除用户事件
     * @param $event
     */
    deleteUsers($event) {
        this.flag = "删除";
        this.child.selectAll();
    }

    /**
     * 批量锁定用户事件
     * @param $event
     */
    lockUsers($event) {
        this.flag = "锁定";
        this.child.selectAll();
    }

    /**
     * 批量解除锁定用户事件
     * @param $event
     */
    unlockUsers($event) {
        this.flag = "解锁";
        this.child.selectAll();
    }

    /**
     * 重置用户密码
     * @param $event
     */
    resetUsersPassword($event) {
        this.flag = "重置密码";
        this.child.selectAll();
    }

    /**
     * 选项事件
     * @param value
     */
    selectAllItems(value) {
        let array = [];
        for (let item of value) {
            array.push(item.data);
        }

        const len = array.length;
        if (len === 0) {
            this._message.create('error', "至少要选中一行，才能进行操作！");
            return;
        }
        switch (this.flag) {
            case '删除':
                this.deleteUserList(array);
                break;
            case '锁定':
                this.customConfirm("是否要锁定该批次用户？", res => {
                    this.lockUserList(array);
                });
                break;
            case '重置密码':
                this.showResetModal(array);
                break;
            case '编辑':
                if (len !== 1) {
                    this._message.create('error', "只能选中一行，才能进行编辑！");
                    return;
                }
                this.editUserItems(array);
                break;
            case '解锁':
                this.unlockUserList(array);
                break;
        }
    }

    /**
     * 双击编辑
     * @param data
     */
    doubleClick(data: any) {
        this.showModal("编辑", data.data);
    }

    /**
     * 展示密码重置模态框事件
     * @param value
     */
    showResetModal(value) {
        let ArrayIds = new Array();
        value.forEach(res => {
            ArrayIds.push(res.userId);
        });
        super.batchResetFixedPassword(ArrayIds);
    }

    /**
     * 单元格点击事件
     * @param value
     */
    cellClickEvent(value) {
        let item = value.data;
        this.rowIndex = value.rowIndex;
        this.userId = item.userId;

        switch (value.colDef.field) {
            case 'operation':
                let target = value.event.target.className;
                if (target.search("green") > 0) {
                    this.customConfirm("是否要锁定该用户？", res => {
                        this.lockUserItems(item);
                    });
                } else {
                    this.unlockUserItems(item);
                }
                break;
        }
    }

    /**
     * 右击编辑
     * @param item
     */
    rightEventEdit() {
        this.flag = "编辑";
        this.child.selectAll();
    }

    /**
     * 锁定单一用户
     * @param item
     */
    lockUserItems(item) {
        let ids = new Array();
        ids.push(item.userId);
        let array = new Array();
        array.push(item);
        this.lockUserElement(ids, array);
    }

    /**
     * 解锁单一用户
     * @param item
     */
    unlockUserItems(item) {
        let ids = new Array();
        ids.push(item.userId);
        let array = new Array();
        array.push(item);
        this.unlockUserElement(ids, array);
    }

    /**
     * 锁定批量用户
     * @param array
     */
    lockUserList(array) {
        let tmp = new Array();
        array.forEach(res => {
            tmp.push(res.userId);
        });
        this.lockUserElement(tmp, array);
    }

    /**
     * 解锁批量用户
     * @param array
     */
    unlockUserList(array) {
        let tmp = new Array();
        array.forEach(res => {
            tmp.push(res.userId);
        });
        this.unlockUserElement(tmp, array);
    }

    /**
     * 编辑单一用户
     * @param {UserElement} pUser
     */
    editUserItems(items) {
        if (items[0]) {
            this.showModal("编辑", items[0]);
        } else {
        }
    }

    /**
     * 右击删除单一用户
     * @param item
     */
    rightEventDel(item) {
        if (item.length > 0) {
            this.customConfirm("是否要删除该用户的数据？", res => {
                let ids = new Array();
                ids.push(item[0].userId);
                this.deleteUserElement(ids);
            });
        } else {
            this.customConfirm("请选中要删除的用户！");
        }
    }

    /**
     * 删除批量用户
     * @param array
     */
    deleteUserList(array) {
        let tmp = new Array();
        array.forEach(res => {
            tmp.push(res.userId);
        });
        this.customConfirm("请确认是否要删除选中用户吗？", res => {
            this.deleteUserElement(tmp);
        });
    }

    /**
     * 获取新增和编辑模态框中的角色列表
     */
    getRoleList() {
        super.getRole_list();
    }

    /**
     * 商家下拉框返回值
     * @param value
     */
    getDropDown(value) {
        this.businessId = value;
        this.getUserListInfo(this.businessId);
    }

    /**
     * 获取下拉框值
     * @param value
     */
    getDropDownValue(value) {
        this.businessName = value;
    }

    /**
     * 页面初始化
     */
    ngOnInit() {
        this.windowHeight = window.innerHeight-200;
        this.getRoleList();
    }

    ngOnDestroy() {
        if (this.subscription$ !== undefined) {
            this.subscription$.destroy();
        }
    }

}
