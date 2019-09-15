import {Component, Input, OnInit} from '@angular/core';
import {NzMessageService, NzModalSubject} from "ng-zorro-antd";
import {HttpClientService} from "../../../../../shared/service/httpClient.service";
import {RequestArgs} from "../../../../../shared/model/request-args";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

/**
 * 添加删除网络的模态框
 * @class ProbeConfModalComponent
 */
@Component
({
    selector: 'network-manager-modal',
    templateUrl: './network-manager-modal.component.html',
    styleUrls: ['./network-manager-modal.component.scss'],
})

export class NetworkManagerModalComponent implements OnInit{
    public value: boolean;
    public id: string;
    public netName: string;
    public validate: FormGroup;
    private requestArgs: RequestArgs = new RequestArgs();
    public buttonName: string;
    public contentStatus2: boolean;

    @Input()
    set name(value: boolean) {
        this.value = value;

        if (this.value === true) {
            this.buttonName = "保存"
        } else {
            this.buttonName = "确认"
        }
    }

    @Input()
    set netID(value: string) {
        this.id = value;
    }

    @Input() public threeLinkData: any;
    /**
     * 将获取到的表格数据内容进行筛选
     * @param subject  NzModalSubject
     *          模态框返回数据
     * @param http HttpClientService
     * @param message NzMessageService
     */
    constructor(private subject: NzModalSubject, private http: HttpClientService, private message: NzMessageService, private fb: FormBuilder) {
        this.requestArgs.systemName = "wlanscope";
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
        this.validate = this.fb.group({
            netWorkName : ['', Validators.compose(
                [Validators.required, Validators.pattern("^[A-Za-z0-9_\u4e00-\u9fa5]+$"),
                    Validators.minLength(2), Validators.maxLength(32)
                ]
            )]
        });
        this.contentStatus2=false;


    }

    /**
     * 点击模块框确定按钮的事件
     * @description
     *        1、判断是否有修改内容
     *        2、没有修改内容，则页面显示提示信息
     *        3、否则将用户修改的数据提交至服务器
     *        4、并关闭模态框
     */
    handleOk() {
        this.contentStatus2=true;
        /** 新增网络 */
        if (this.value === true) {
            this.validate.controls['netWorkName'].markAsDirty();
            if (this.validate.controls['netWorkName'].invalid !== true) {
                this.requestArgs.url = '/api/v1/net_info/add';
                this.requestArgs.body = {'netName': this.netName};
                this.http.httpPost(this.requestArgs).subscribe(
                    res => {
                        this.contentStatus2=false;
                        if (res.code === 0) {
                            this.message.info('添加成功!');
                            this.subject.next('saveInfo|'+ res.result['netId'] + '|' +
                                res.result['netName'] +  '|' + res.result['province'] + '|' + res.result['city'] + '|' +
                                res.result['county'] + '|' + res.result['detailAddress']);
                            this.subject.destroy('onOk');
                        } else {
                            this.message.error('添加失败！');
                            this.message.error(res.msg);
                        }
                    }
                );
            }
        }
        /** 删除网络 */
        else {
            this.requestArgs.url = '/api/v1/net_info/delete';
            this.requestArgs.body = {'netId' : this.id};
            this.http.httpPost(this.requestArgs).subscribe(
                res => {
                    if (res.code === 0) {
                        this.message.info('删除成功!');
                        this.subject.next('saveInfo|'+ this.id);
                        this.subject.destroy('onOk');
                    } else {
                        this.message.error('删除失败！');
                        this.message.error(res.msg);
                    }
                }
            );
        }
    }

    /** 点击退出后的事件，关闭模态框 */
    handleCancel() {
        this.subject.destroy('onCancel');
    }
    ngOnInit() {

    }
}
