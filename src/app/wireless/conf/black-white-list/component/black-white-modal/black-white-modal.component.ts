import {Component, Input, OnInit} from '@angular/core';
import {NzMessageService, NzModalSubject} from "ng-zorro-antd";
import {HttpClientService} from "../../../../../shared/service/httpClient.service";
import {RequestArgs} from "../../../../../shared/model/request-args";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NameListModel} from "../../model/name-list.model";
import {ReceiveModel} from "../../../../../shared/model/receive.model";

/**
 * 无线-配置-单个AP探针配置模态框
 * @class ProbeConfModalComponent
 */
@Component
({
    selector: 'probe-conf-frequency-modal',
    templateUrl: './black-white-modal.component.html',
    styleUrls: ['./black-white-modal.component.scss'],
})

export class BlackWhiteModalComponent implements OnInit  {
    /**初始化模态框的数据*/
    public value: NameListModel;
    /**表单验证*/
    public validate: FormGroup;
    /**请求实体类*/
    private requestArgs: RequestArgs = new RequestArgs();
    /**点击模态框保存按钮，向后台发送请求的数据的实体类*/
    public globalConf: NameListModel = new NameListModel();
    @Input()
    set name(value: NameListModel) {
        this.value = value;
    }

    /**
     * 将获取到的表格数据内容进行筛选
     * @param subject  NzModalSubject
     *          模态框返回数据
     * @param http  HttpClientService
     * @description
     *         生成告警信息的默认值
     */
    constructor(private subject: NzModalSubject, private http: HttpClientService, private fb: FormBuilder,private message: NzMessageService) {
        this.requestArgs.systemName = "wlanscope";
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
        const reg= /^[A-Fa-f0-9]{2}[:][A-Fa-f0-9]{2}[:][A-Fa-f0-9]{2}[:][A-Fa-f0-9]{2}[:][A-Fa-f0-9]{2}[:][A-Fa-f0-9]{2}$/;
        this.validate = this.fb.group({
                mac : ['', Validators.compose(
                    [Validators.required, Validators.pattern(reg),
                        Validators.minLength(17), Validators.maxLength(17)
                    ]
                )],
                note: ['', [ Validators.maxLength(128) ]]
        });
    }
    /**验证mac地址和备注是否正确(即符合规则)*/
    private validateStatus(): boolean {
        let status : boolean = false;
        this.validate.controls['mac'].markAsDirty();
        if (this.validate.controls['mac'].invalid || this.validate.controls['note'].invalid) {
            status = true;
        }
        return status;
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
        if ( ! this.validateStatus()) {
            if (this.value.mac === this.globalConf.mac &&
                this.value.note === this.globalConf.note) {
                this.message.warning('数据无变化无须保存！');
            } else {
                if (this.value.mac === '') {
                    this.saveData(1);
                } else {
                    this.saveData(2);
                }
            }
        }
    }
    /** 点击退出后的事件，关闭模态框 */
    handleCancel() {
        this.subject.destroy('onCancel');
    }
    /**点击模态框保存按钮，调用的方法*/
    public saveData(type: number) {
        this.requestArgs.url = '/api/v1/blackAndWhite/save';
        this.requestArgs.body = this.globalConf.getData(type);
        this.http.httpPost(this.requestArgs).subscribe(
            res => {
                if (res.code === 0) {
                    type === 1 ? this.addList(true, <ReceiveModel>res) : this.editList(true, <ReceiveModel>res);
                } else {
                    type === 1 ? this.addList(false, <ReceiveModel>res) : this.editList(false, <ReceiveModel>res);
                }
            }
        )
    }
    /**新增黑白名单列表表格数据*/
    public addList(status : boolean, res? :ReceiveModel) {
        if (status === true) {
            this.message.success('添加成功！');
            this.subject.next('add|' + JSON.stringify(res.result[0]));
            this.subject.destroy('onOk');
        } else {
            this.message.error('添加失败！');
            this.message.error(res.msg);
        }
    }
    /**编辑黑白名单列表表格数据*/
    public editList(status : boolean, res? :ReceiveModel) {
        if (status === true) {
            this.message.success('编辑成功！');
            this.subject.next('edit|' + JSON.stringify(res.result[0]));
            this.subject.destroy('onOk');
        } else {
            this.message.error('编辑失败！');
            this.message.error(res.msg);
        }
    }
    /**
     * 初始化方法
     * @description
     *        将表格内容转换为ID
     */
    ngOnInit() {
        this.globalConf.mac = this.value.mac;
        this.globalConf.note = this.value.note;
        this.globalConf.id = this.value.id;
        this.globalConf.ssid = this.value.ssid;
        this.globalConf.type = this.value.type;
    }
}
