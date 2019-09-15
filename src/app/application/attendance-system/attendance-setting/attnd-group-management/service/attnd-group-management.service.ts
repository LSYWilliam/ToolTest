import {Injectable, ViewChild} from '@angular/core';
import {RequestArgs} from "../../../../../shared/model/request-args";
import {AttndGroupHead} from "../model/attnd-group-head.model";
import {HttpClientService} from "../../../../../shared/service/httpClient.service";
import {WorkShiftDropDownModel} from "../../work-shift-management/model/work-shift-drop-down.model";
import {ActivatedRoute, Router} from "@angular/router";
import {WorkShiftResolverModel} from "../../../../../shared/model/work-shift-resolver.model";
import {NzMessageService, NzModalService, NzModalSubject} from "ng-zorro-antd";
import {StaffBasicInfoHead} from "../../../system-management/staff-basic-info-management/model/staff-basic-info-head.model";
import {AttndGroup} from "../model/attnd-group.model";
import {StaffElemet, StaffListModel} from "../model/staff-list.model";
import {StaffListHeadModel} from "../model/staff-list-head.model";
import {TableComponent} from "../../../../../plugins/component/table/table.component";
import {CommonUtilService} from "../../../../../shared/service/common-util.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Injectable()
export class AttndGroupManagementService {
    @ViewChild("attndGroupList") child: TableComponent;
    @ViewChild("staffListTable") tableChild: TableComponent;
    tableInput:any;
    tableData:any;
    srcRequestArgs:any;
    requestArgs: RequestArgs = new RequestArgs();
    workShiftListModel: WorkShiftDropDownModel = new WorkShiftDropDownModel();
    /**订阅模态框*/
    subscription$: NzModalSubject;
    /**被选中的考勤组*/
    groupItem = new AttndGroup();
    dataMenu: any;
    dataRoot: any;
    staffTableInput: any;
    staffRequestArgs: any;
    staffMetaData: any;
    staffListModel:StaffListModel = new StaffListModel();
    staffList: any;
    staffListHeadModel:StaffListHeadModel = new StaffListHeadModel();
    /**页面标签，包括首页，增加页*/
    conditionExpression = "firstShow";
    /**表单认证*/
    validateForm: FormGroup;
    /**user表单中需要验证的部分*/
    arrayForm:Array<string>;

    constructor(private http: HttpClientService,
                private activatedRoute: ActivatedRoute,
                public modalService: NzModalService,
                public _message: NzMessageService,
                public commonUtilService:CommonUtilService,
                public fb: FormBuilder,
                private router: Router) {
        this.tableInput=new AttndGroupHead().aggridTableInput;
        /**
         * 页面表格数据源配置
         * @type {RequestArgs}
         */
        this.srcRequestArgs=new RequestArgs();
        this.srcRequestArgs.systemName = "attendance";
        this.srcRequestArgs.header = {'ticket': sessionStorage.getItem('ticket'),'Content-Type':'application/json'};
        this.srcRequestArgs.url="/kqGroup/api/find/all";

        const workShiftList = new WorkShiftResolverModel(activatedRoute, router, _message).workShiftList;
        this.workShiftListModel.dropDowns=workShiftList;

        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket'),'Content-Type':'application/json'};
        this.getDropTreeData();
        /**初始化员工列表*/
        this.staffTableInput = new StaffBasicInfoHead().tableInput;
        this.staffMetaData = new StaffBasicInfoHead().metaData;
        this.staffRequestArgs = new RequestArgs();
        this.staffRequestArgs.systemName = "attendance";
        this.staffRequestArgs.header = {'ticket': sessionStorage.getItem('ticket'),'Content-Type':'application/json'};

        this.staffListModel.staffList = new Array<StaffElemet>();
        this.staffList = this.staffListModel.staffList;
        this.getWorkShiftList();
    }

    getWorkShiftList() {
        this.http.httpGet(this.srcRequestArgs).subscribe(res=> {
            if(res.code===0) {
                this.tableData=res.result;
            } else {
                this.tableData=[];
                if(res.code!==9) {
                    this._message.create('info', res.msg);
                }
            }
        });
    }

    /**
     * 获取下拉树数据
     */
    getDropTreeData() {
        this.requestArgs.url = "/department/api/query/childList";
        this.requestArgs.systemName = "wlanscope";
        this.http.httpGet(this.requestArgs).subscribe( res => {
            this.dataMenu = res.result;
            if (res.code === 0) {
                this.dataMenu = res.result.children.length?res.result.children:[];
                this.dataRoot = res.result;
            } else if (res.code === 9) {
                this.dataMenu = [];
            } else {
                this._message.info(res.msg);
            }
        });
    }

    /**
     * 获取考勤组所属员工
     * @param {AttndGroup} value
     */
    getStaffByAttandGroup(value: AttndGroup) {
        this.requestArgs = new RequestArgs();
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket'),'Content-Type':'application/json'};
        this.requestArgs.url="/employee/api/find/by/kqGroupId";
        this.requestArgs.systemName = "attendance";
        this.requestArgs.body= {
            "kqGroupId": value.id
        };
        this.http.httpGet(this.requestArgs).subscribe(res=> {
            if(res.code===0) {
                this.staffListModel.staffList = res.result;
                this.staffList = this.staffListModel.staffList;
                this.initValidateForm();
                this.conditionExpression = "editPage";
            } else if(res.code===9) {
                this.staffListModel.staffList = [];
                this.staffList = this.staffListModel.staffList;
                this.initValidateForm();
                this.conditionExpression = "editPage";
            } else {
                this.staffList = [];
            }
        });
    }

    /**
     * 增加考勤组
     * @param {AttndGroup} item
     */
    addAttndGroup(item:AttndGroup) {
        this.requestArgs.body= {
            "groupName": item.groupName,
            "groupManagerName": item.groupManagerName,
            "groupWorkModes": item.groupWorkModes?item.groupWorkModes:"",
            "flightId": ""+(item.flightId?item.flightId:""),
            "userList": item.userList?item.userList:""
        };
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
        this.requestArgs.url = "/kqGroup/api/save_or_update";
        this.requestArgs.systemName = "attendance";
        this.http.httpPost(this.requestArgs).subscribe(res=> {
            if(res.code===0) {
                this._message.create('info', res.msg);
                this.getWorkShiftList();
                this.conditionExpression="firstShow";
            } else {
                this._message.create('info', res.msg);
            }
        });
    }

    /**
     * 编辑考勤组
     * @param {AttndGroup} item
     */
    editAttndGroup(item:AttndGroup) {
        this.requestArgs.body= {
            "id": item.id,
            "groupName": item.groupName,
            "groupManagerName": item.groupManagerName,
            "groupWorkModes": item.groupWorkModes?item.groupWorkModes:"",
            "flightId": (item.flightId?item.flightId:null),
            "userList": item.userList?item.userList:""
        };
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
        this.requestArgs.url = "/kqGroup/api/save_or_update";
        this.requestArgs.systemName = "attendance";
        this.http.httpPost(this.requestArgs).subscribe(res=> {
            if(res.code===0) {
                this._message.create('info', res.msg);
                this.getWorkShiftList();
                this.conditionExpression="firstShow";
            } else {
                this._message.create('info', res.msg);
            }
        });
    }

    /**
     * 删除考勤组
     * @param ids
     */
    delAttndGroup(ids) {
        this.requestArgs.body = ids;
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
        this.requestArgs.url = "/kqGroup/api/delete";
        this.requestArgs.systemName = "attendance";
        this.http.httpPost(this.requestArgs).subscribe(res=> {
            if(res.code===0) {
                this._message.create('info', res.msg);
                this.getWorkShiftList();
            } else {
                this._message.create('info', res.msg);
            }
        });
    }

    initValidateForm() {
        this.arrayForm = ['groupName', 'groupManagerName'];
        let obj = {
            groupName: [this.groupItem.groupName, [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(32),
                Validators.pattern("^[A-Za-z0-9\u4e00-\u9fa5]+$")]],
            groupManagerName: [this.groupItem.groupManagerName, [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(32),
                Validators.pattern("^[A-Za-z0-9\u4e00-\u9fa5]+$")]],
        };
        this.validateForm = this.fb.group(obj);
    }

}
