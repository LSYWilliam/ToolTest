import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {routerTransition} from "../../../../../animations/route-animations";
import {RoleManagementService} from '../service/role-management.service';
import { TableComponent } from '../../../../../plugins/component/table/table.component';
import {RoleHeadDataModel} from '../model/role-head.model';
import {AuthModalComponent} from './auth-modal/auth-modal.component';
import {AddRoleModalComponent} from "./add-role-modal/add-role-modal.component";
import {ConfirmModalComponent} from "../../../../../shared/component/confirm-modal/confirm-modal.component";

/**
 * 角色管理模块
 * @class RoleManagementComponent
 */
@Component
({
    selector: 'app-role-management',
    templateUrl: './role-management.component.html',
    styleUrls: ['./role-management.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})

export class RoleManagementComponent extends RoleManagementService implements OnInit, OnDestroy {
    /**在父组件中引入table组件*/
    @ViewChild(TableComponent) child: TableComponent;
    /**获取DOM元素*/
    @ViewChild('modal_user') public modal: ElementRef;
    /**判断是否是选中了用户再点击的删除*/
    private isChoseRole: any;
    /**table表表格静态数据 实体类*/
    public roleHeadDataModel: RoleHeadDataModel= new RoleHeadDataModel();
    /**
     * 展示系统菜单数据
     * @param permissionTreeId
     */
    showSystemMenu(permissionTreeId) {
        this.getSingleAuthority(permissionTreeId);
    }

    /**
     * 角色列表点击
     * @param pRoleId
     */
    searchClick(pRoleId) {
        if(pRoleId===null&&this.roleListData.length>=1) {
            pRoleId=this.roleListData[0].id;
        }
        this.selectRoleId = pRoleId;
        this.setEditButton(pRoleId);
        this.roleId = pRoleId;
        this.isChoseRole = true;
        this.getSystemAuthority();
        /**然后此处可以向后台发送请求*/
        if(this.selectedOption) {
            this.getSingleAuthority(this.selectedOption.permissionTreeId);
        }
    }

    /**
     * 展示页面级权限详情表格
     * @param value1
     * @param value2
     */
    getSystemMenuAuthority(value1,value2) {
        super.getSingleRoleMenuPageAuthority(value1,value2);
    }

    /**
     * 获取菜单级权限树
     * @param value
     */
    getSingleAuthority(value) {
        super.getSingleSystemAuthority(value);
    }

    /**
     * 菜单级级权限点击
     * @param value
     */
    menuClick(value) {
        this.menuId = value.permissionTreeId;
        this.getSystemMenuAuthority(this.selectRoleId,this.menuId);
    }

    /**
     * 增加角色模态框相关方法
     * @param e
     */
    showModal = (e) => {
        const modalConfig = {
            title      : '新增角色',
            content    : AddRoleModalComponent,
            onOk() {
            },
            onCancel() {
            },
            footer       : false,
            maskClosable : false,
            componentParams: {
            }
        };
        this.subscription$ = this.modalService.open(modalConfig);
        this.subscription$.subscribe( res=> {
            if(new RegExp("roleName").test(res)) {
                let roleName=JSON.parse(res);
                this.addRole(roleName.roleName);
            }
        });
    };

    /**
     * 增加角色
     * @param e
     */
    addRole = (e) => {
        super.addRule(e);
    };

    /**
     * 删除角色
     * @param e
     */
    delRole = (e) => {
        const message="请确认是否要删除该角色！";
        /**打开是否保存的提示框*/
        const modalConfig = {
            content        : ConfirmModalComponent,
            onOk() {},
            onCancel() {},
            footer         : false,
            maskClosable   : false,
            componentParams: {
                name: message
            }
        };
        this.subscription$ = this.modalService.open(modalConfig);
        this.subscription$.subscribe(result => {
            if (result === 'onOk') {
                super.delRule(this.roleId);
            }
        });
    }

    /**
     * 展示权限编辑表模态框
     */
    showEditTableModal() {
        const tbodyData=this.tableRowDataFather;
        this.subscription$ = this.modalService.open({
            title          : '权限管理',
            content        : AuthModalComponent,
            onOk() { },
            onCancel() { },
            footer : false,
            componentParams: {
                theadData:["页面名称","编辑权限","查询权限"],
                tbodyData:tbodyData
            }
        });
        this.subscription$.subscribe(result => {
            if(typeof result === "object" && result.length !== 0) {
                let perssionArray:Array<any> = new Array<any>();
                result.forEach( res=> {
                    if(res.searchAuthority === false) {
                        res['permissionType']=0;
                    } else if(res.editAuthority === false) {
                        res['permissionType']=4;
                    } else {
                        res['permissionType']=3;
                    }
                    perssionArray.push({
                        'pageName':res['pageName'],
                        'permissionId':res['permissionId'],
                        'permissionType':res['permissionType']
                    });
                });
                super.updatePagePermission(this.selectRoleId,this.menuId,perssionArray);
            }
        });
    }

    ngOnInit() {

    }

    ngOnDestroy(): void {
        if (this.subscription$ !== undefined) {
            this.subscription$.destroy();
        }
    }
}
