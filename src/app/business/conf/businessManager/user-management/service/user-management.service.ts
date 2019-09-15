import {Injectable, ViewChild} from '@angular/core';
import {RequestArgs} from "../../../../../shared/model/request-args";
import {Role, UserElement, UserManagementModel} from "../model/user-management.model";
import {HttpClientService} from "../../../../../shared/service/httpClient.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NetworkListModel} from "../model/business-list.model";
import {NzModalService, NzModalSubject} from 'ng-zorro-antd';
import {BusinessListResolverModel} from "../../../../../shared/model/business-list-resolver.model";
import {NzMessageService} from "ng-zorro-antd";
import {PasswordResetModalComponent} from "../component/password-reset-modal/password-reset-modal.component";
import {TableComponent} from "../../../../../plugins/component/table/table.component";
import {ConfirmModalComponent} from "../../../../../shared/component/confirm-modal/confirm-modal.component";
import {Md5} from "ts-md5";

@Injectable()
export class UserManagementService {
    /**http请求*/
    public requestArgs:RequestArgs = new RequestArgs();
    /**页面左上角下拉框选中商户ID*/
    public businessId:any;
    /**页面左上角下拉框选中商户名称*/
    public businessName:string;
    /**编辑时被选中的rowIndex*/
    public rowIndex;
    /**模态框中的角色列表*/
    public roleList:Array<any> = [];
    /**用户总数*/
    public userTotal:number;
    /**用于取消订阅*/
    public subscription$: NzModalSubject;
    /**用户管理表格 行数据*/
    public userManagementModel:UserManagementModel;
    /**商家列表实体类*/
    public businessListModel:NetworkListModel=new NetworkListModel();
    /**父组件引入table组件*/
    @ViewChild(TableComponent) child: TableComponent;

    constructor(protected http: HttpClientService,public activatedRoute: ActivatedRoute,
                  public modalService: NzModalService,public _message: NzMessageService, private router: Router) {
        this.requestArgs.systemName = 'system';
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket'),'Content-Type':'application/json;charset=UTF-8'};
        this.businessListModel.dropDowns = new BusinessListResolverModel(activatedRoute,router).businessList;
        if(this.businessListModel.dropDowns) {
            this.businessId=this.businessListModel.dropDowns[0].id;
            this.businessName = this.businessListModel.dropDowns[0].name;
            this.getUserListInfo(this.businessId);
        } else {
            this.userManagementModel.userElementList=[];
        }
    }

    /**
     * 获取用户列表信息
      * @param {number} pBusinessId
     */
    public getUserListInfo(pBusinessId:number) {
        this.requestArgs.url="/ewifi/system/console/user/user_list";
        this.requestArgs.body = {'businessId': pBusinessId};
        this.http.httpPost(this.requestArgs)
            .subscribe(
                res => {
                    if(res.code===0) {
                        if(res.result['length']) {
                            res.result.forEach(data=> {
                                this.toUserItem(data);
                            });
                            this.userTotal= res.result.length;
                        } else {
                            this.userTotal= 0;
                        }
                        this.userManagementModel=res.result;
                    } else if(res.code===9) {
                        this.userManagementModel.userElementList=[];
                    } else {
                        this._message.create('error', res.msg);
                    }
                }
        );
    }

    /**
     *  获取角色列表
     */
    public getRole_list() {
        this.requestArgs.url="/ewifi/system/console/role/role_list";
        this.http.httpPost(this.requestArgs).subscribe( res=> {
            if(typeof res.result.length !== "undefined") {
                res.result.forEach(element => {
                    let tmp:object=new Object();
                    tmp["id"]=element.id;
                    tmp["roleName"]=element.roleName;
                    this.roleList.push(tmp);
                });
            }
        });
    }

    /**
     * 锁定批量或单一用户
      * @param ids
     * @param list
     */
    public lockUserElement(ids,list) {
        this.requestArgs.url = "/ewifi/system/console/user/batch_lock_user";
        this.requestArgs.body = {'ids': ids };
        this.http.httpPost(this.requestArgs).subscribe(res => {
            if(res.code===0) {
                this._message.info('用户已锁定!');
                list.forEach( ult=> {
                    ult['operation']['lock']=ult['operation']['lock'].replace(" green","");
                    ult['userStatus'] = 2;
                    ult['userStatusStr']="锁定";
                    this.child.editRow(ult);
                });
            } else {
                this._message.create('error', res.msg);
            }
        });
    }

    /**
     * 解锁批量或单一用户
      * @param pUserId
     * @param item
     */
    public unlockUserElement(ids,list) {
        this.requestArgs.url = "/ewifi/system/console/user/batch_unlock_user";
        this.requestArgs.body = {'ids': ids };
        this.http.httpPost(this.requestArgs).subscribe(res => {
            if(res.code===0) {
                this._message.info('用户已解锁!');
                list.forEach( ult=> {
                    ult['operation']['lock']=ult['operation']['lock'].replace(" green","")+" green";
                    ult['userStatus'] = 1;
                    ult['userStatusStr']="正常";
                    this.child.editRow(ult);
                });
            } else {
                this._message.create('error', res.msg);
            }
        });
    }

    /**
     * 编辑单一用户
     * @param {UserElement} pUser
     */
    public editUserElement(pUser:UserElement) {
        this.requestArgs.url = "/ewifi/system/console/user/update_by_wlanscope";
        this.requestArgs.body = {'businessId': pUser.businessId ,'username': pUser.username,'userId':pUser.userId,
            'contactName':pUser.contactName,'peakConcurrentUsers':pUser.peakConcurrentUsers,'roles':{
                'roleId':pUser.roles.id
            },'contactEmail':pUser.contactEmail,'contactTele': pUser.contactTele
        };
        this.http.httpPost(this.requestArgs).subscribe(res => {
            if(res.code===0) {
                let tmpItem=res.result;
                pUser.latestLoginTime=this.toDateString(new Date(tmpItem.latestLoginTime));
                pUser.roles.roleName=tmpItem.roles[0].roleName;
                pUser.roles.id=tmpItem.roles[0].roleId;
                pUser.roleName=tmpItem.roles[0].roleName;
                pUser.roleId=tmpItem.roles[0].roleId;
                pUser.operation= {
                    lock:"icon-systemCirclePassword"
                };
                /**默认为黑色，1为正常，2为锁定*/
                if(pUser.userStatus === 1) {
                    pUser.operation.lock=pUser.operation.lock+" green";
                }
                this.child.editRow(pUser);
                this.subscription$.destroy();
                this._message.info('用户修改成功!');
            } else {
                this._message.create('error', res.msg);
            }
        });
    }

    /**
     * 删除批量或单一用户
      * @param userIds
     */
    public deleteUserElement(userIds) {
        this.requestArgs.url = "/ewifi/system/console/user/batch_delete_user";
        this.requestArgs.body = { "userIds": userIds };
        this.http.httpPost(this.requestArgs).subscribe(res => {
            if(res.code===0) {
                this.child.singleDelete();
                this.userTotal=this.userTotal-userIds.length;
                this._message.info('用户数据已删除!');
            } else {
                this._message.create('error', res.msg);
            }
        });
    }

    /**
     * 新建单一用户
     * @param {UserElement} pUser
     */
    public addUserElement(pUser:UserElement) {
        this.requestArgs.url = "/ewifi/system/console/user/add_by_wlanscope";
        this.requestArgs.body = {'businessId': pUser.businessId ,'username': pUser.username ,'password':Md5.hashStr(pUser.password),
            'contactName':pUser.contactName,'peakConcurrentUsers':pUser.peakConcurrentUsers,'roles':{
            'roleId':pUser.roles.id
            },'contactEmail':pUser.contactEmail,'contactTele': pUser.contactTele
        };
        this.http.httpPost(this.requestArgs).subscribe( res=> {
            if(res.code===0) {
                let tmpArray=new Array<any>();
                tmpArray.push(this.toUserItem(res.result));
                this.child.addRow(tmpArray);
                this.userTotal=this.userTotal+1;
                this.subscription$.destroy();
                this._message.info('用户新建成功!');
            } else {
                this._message.create('error', res.msg);
            }
        });
    }

    /**
     * 批量重置用户密码
      * @param userIds
     */
    public batchResetFixedPassword(userIds) {
        this.requestArgs.url = "/ewifi/system/console/user/batch_reset_random_password";
        this.requestArgs.body = { "userIds": userIds };
        this.http.httpPost(this.requestArgs).subscribe( res=> {
            if(res.code===0) {
                this._message.info('用户密码已重置!');
                this.subscription$ = this.modalService.open({
                    title          : '密码重置',
                    content        : PasswordResetModalComponent,
                    onOk() { },
                    onCancel() { },
                    footer         : false,
                    componentParams: {
                        userPasswordItems:res.result,
                    }
                });
            } else {
                this._message.create('error', res.msg);
            }
        });
    }

    /**
     * 将毫秒数转化为时间格式的方法函数
     * @param {Date} p_date
     * @returns {string}
     */
    toDateString(p_date:Date) {
        if(typeof p_date === "undefined" || p_date.toString() === new Date(0).toString()) {
            return "";
        }
        let year=p_date.getFullYear();
        let p_month=p_date.getMonth()+1;
        let p_day=p_date.getDate();
        let p_hour=p_date.getHours();
        let p_minute=p_date.getMinutes();
        let p_second=p_date.getSeconds();

        return year+"-"+(p_month.toString().length<2?"0"+p_month:p_month)
            +"-"+(p_day.toString().length<2?"0"+p_day:p_day)
            +" "+(p_hour.toString().length<2?"0"+p_hour:p_hour)
            +":"+(p_minute.toString().length<2?"0"+p_minute:p_minute);
    }

    /**
     * 自定义弹框
     * @param message
     * @param callBack
     */
    customConfirm(message,callBack?:Function) {
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
                if(callBack) {
                    callBack();
                }
            }
        });
    }

    /**
     * 将返回值转化成UserElement的格式
     * @param inputItem
     * @returns {UserElement}
     */
    toUserItem(inputItem) {
        let tmpItem:UserElement=inputItem;
        tmpItem.latestLoginTime=this.toDateString(new Date(tmpItem.latestLoginTime));
        let role=new Role();
        role.roleName=tmpItem.roles[0].roleName;
        role.id=tmpItem.roles[0].roleId;
        tmpItem.roles=role;
        tmpItem.roleName=tmpItem.roles.roleName;
        tmpItem.roleId=tmpItem.roles.id;
        tmpItem.operation= {
            lock:"icon-systemCirclePassword"
        };
        /**默认为黑色，1为正常，2为锁定*/
        if(tmpItem.userStatus === 1) {
            tmpItem.operation.lock=tmpItem.operation.lock+" green";
        }
        return tmpItem;
    }
}
