import { Injectable } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LogResolveModel} from "../../../../../shared/model/LogResolve.model";
import {HttpClientService} from "../../../../../shared/service/httpClient.service";
import {RequestArgs} from "../../../../../shared/model/request-args";
import {NzMessageService, NzModalService, NzModalSubject} from 'ng-zorro-antd';
import {DropDownsInterface} from "../../../../../shared/component/dropdown/model/dropdowns.model";

@Injectable()
export class RoleManagementService {
    /** http请求参数 */
    public requestArgs: RequestArgs = new RequestArgs();
    /**角色列表数据*/
    public roleListData: Array<DropDownsInterface>;
    /**table表行数据*/
    public tableRowDataFather: any;
    /** select下拉框的值*/
    public options: any;
    /**被选中的系统级权限*/
    public selectedOption: any;
    /** 点击select下拉框，下面的导航的菜单栏会跟着改变*/
    public dataMenu: any;
    /**角色Id*/
    public roleId: any;
    /**被选中的菜单级权限树的Id*/
    public menuId: any;
    /**选中的角色Id*/
    public selectRoleId;
    /**添加的角色数据*/
    public addData: string;
    /**删除的角色数据*/
    public delData: string;
    /**判断编辑按钮是否可用*/
    public editableFlag: boolean;
    /**模态框接收*/
    public subscription$: NzModalSubject;

    /**
     * 初识化公共变量
     * @param {Router} router
     * @param {ActivatedRoute} activatedRoute
     * @param {HttpClientService} http
     * @param {NzMessageService} _message
     * @param {NzModalService} modalService
     */
    constructor(private router: Router, public activatedRoute: ActivatedRoute,
                private http: HttpClientService, public _message: NzMessageService,
                public modalService: NzModalService ) {
        this.requestArgs.systemName = 'system';
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket'),'Content-Type':'application/json'};
        this.getRoleList(activatedRoute);
        this.getSystemAuthority();
    }

    /**
     * 获取角色列表
     * @param {ActivatedRoute} activatedRoute
     */
    getRoleList(activatedRoute: ActivatedRoute) {
        const roleList = new LogResolveModel(activatedRoute).roleList;
        let tmp = [];
        for (let obj of roleList) {
            tmp.push(<DropDownsInterface> {id: obj['id'], name: obj['roleName']});
        }
        this.roleListData=tmp;
    }

    /**
     * 获取系统级权限
     */
    getSystemAuthority() {
        this.requestArgs.url = "/ewifi/system/console/permission/find_system_permission";
        this.http.httpPost(this.requestArgs).subscribe( res => {
            switch(res.code) {
                case 0 :
                    res.result.forEach( sul=> {
                        sul.id=sul.permissionTreeId;
                        sul.name=sul.permissionName;
                    });
                    this.options =res.result;
                    this.selectedOption = this.options[0];
                    /**默认展示select里面第一个系统下面的菜单*/
                    /**获取单系统下的菜单级权限*/
                    this.getSingleSystemAuthority(this.selectedOption.id);
                    break;
                case 1103 :
                    sessionStorage.removeItem('ticket');
                    this._message.create('error', res.msg);
                    this.router.navigateByUrl('login');
                    break;
                default:
                    sessionStorage.removeItem('ticket');
                    this._message.create('error', res.msg);
                    break;
            }
        });
    }

    /**
     * 获取某系统下所有，菜单级权限
     * @param {string} pPermissionTreeId
     */
    getSingleSystemAuthority(pPermissionTreeId:string) {
    this.requestArgs.url = "/ewifi/system/console/permission/find_menu_permission";
    this.requestArgs.body = {'permissionTreeId': pPermissionTreeId };
    this.http.httpPost(this.requestArgs).subscribe( res => {
        this.dataMenu = res.result;
        this.menuId = this.dataMenu[0].permissionTreeId;
        /**刷新完菜单级权限树，即要刷新页面级权限表*/
        this.getSingleRoleMenuPageAuthority(this.selectRoleId,this.menuId);
    });
    }

    /**
     * 获取某角色某菜单下所有，页面级权限
     * @param {number} pRoleId
     * @param {string} pPermissionTreeId
     */
    getSingleRoleMenuPageAuthority(pRoleId:number,pPermissionTreeId:string) {
        this.requestArgs.url = "/ewifi/system/console/permission/find_page_permission";
        this.requestArgs.body = {'roleId': pRoleId,'permissionTreeId':pPermissionTreeId };
        this.http.httpPost(this.requestArgs).subscribe(res => {
            switch(res.code) {
                case 0 :
                    let data = res.result;
                    /**将data转换*/
                    let result = [this.addAuthFlagValue(data),data];
                    this.tableRowDataFather = result[0];
                    break;
                case 1103 :
                    sessionStorage.removeItem('ticket');
                    this._message.create('error', res.msg);
                    this.router.navigateByUrl('login');
                    break;
                default:
                    sessionStorage.removeItem('ticket');
                    this._message.create('error', res.msg);
                    break;
            }
        });
    }

    /**
     * 增加用户
     * @param {string} pRoleName
     */
    addRule(pRoleName:string) {
        this.requestArgs.url = "/ewifi/system/console/role/add_role";
        this.requestArgs.body = {'roleName': pRoleName };
        this.http.httpPost(this.requestArgs).subscribe(
            res => {
                if(res.code===0) {
                    this._message.info('添加成功!');
                    let tmp=res.result;
                    let data: DropDownsInterface = {id: tmp.id, name: tmp.roleName};
                    this.addData = JSON.stringify(data);
                    this._message.info('请给新增的角色增加权限!');
                } else {
                    this._message.error('添加失败！');
                    this._message.error(res.msg);
                }
            }
        );
    }

    /**
     * 删除用户
     * @param pRuelId
     */
    delRule(pRuelId) {
        this.requestArgs.url = "/ewifi/system/console/role/delete_role";
        this.requestArgs.body = {'id': pRuelId };
        this.http.httpPost(this.requestArgs).subscribe(
            res => {
                switch (res.code) {
                    case 0 :
                        this.delData = this.roleId;
                        this._message.info('删除成功！');
                        break;
                    case 1103 :
                        sessionStorage.removeItem('ticket');
                        this._message.create('error', res.msg);
                        this.router.navigateByUrl('login');
                        break;
                    default:
                        sessionStorage.removeItem('ticket');
                        this._message.create('error', res.msg);
                        break;
                }
            }
        );
    }

    /**
     * 修改某页用户权限数据
     * @param roleId
     * @param permissionTreeId
     * @param permissionArray
     */
    updatePagePermission(roleId,permissionTreeId,permissionArray) {
        this.requestArgs.url = "/ewifi/system/console/permission/update_page_permission";
        this.requestArgs.body = {
            'roleId': roleId ,
            'permissionTreeId': permissionTreeId ,
            'pagePermissionList': permissionArray
        };
        this.http.httpPost(this.requestArgs).subscribe(res => {
            switch (res.code) {
                case 0 :
                    let data = res.result;
                    this.tableRowDataFather = this.addAuthFlagValue(data);
                    break;
                case 1103 :
                    sessionStorage.removeItem('ticket');
                    this._message.create('error', res.msg);
                    this.router.navigateByUrl('login');
                    break;
                default:
                    sessionStorage.removeItem('ticket');
                    this._message.create('error', res.msg);
                    break;
            }
        });
    }

    /**
     * 转化页面权限格式
     * @param {Array<any>} data
     * @returns {any[]}
     */
    addAuthFlagValue(data:Array<any>) {
        /**用来存放行数据的*/
        let array = [];
        /**用来存放每一行数据的每一项的*/
        let obj = {};
        for ( let i = 0; i< data.length; i++) {
            /**运用了es6的扩展运算符*/
            obj = Object.assign({}, {pageName: data[i].pageName},{permissionId: data[i].permissionId});
            switch (data[i].permissionType) {
                case 0:
                    Object.assign(obj, {editAuthDisplay: "Χ"},{searchAuthDisplay:"Χ"});
                    Object.assign(obj, {editAuthority: false},{searchAuthority:false});
                    array.push(obj);
                    break;
                case 3:
                    Object.assign(obj, {editAuthDisplay: "√"},{searchAuthDisplay:"√"});
                    Object.assign(obj, {editAuthority: true},{searchAuthority:true});
                    array.push(obj);
                    break;
                case 4:
                    Object.assign(obj, {editAuthDisplay: "Χ"},{searchAuthDisplay:"√"});
                    Object.assign(obj, {editAuthority: false},{searchAuthority:true});
                    array.push(obj);
                    break;
            }
        }
        return array;
    }

    /**
     * 设置编辑按钮是否可用
     * @param key
     * @returns {boolean}
     */
    setEditButton(key) {
        let pRoleName;
        for (let item of this.roleListData) {
            if(item.id===key) {
                pRoleName = item.name;
            }
        }
        if( pRoleName === "超级管理员" || pRoleName === "平台管理员"
            || pRoleName === "企业管理员" ) {
            this.editableFlag=false;
        } else {
            this.editableFlag=true;
        }
    }
}
