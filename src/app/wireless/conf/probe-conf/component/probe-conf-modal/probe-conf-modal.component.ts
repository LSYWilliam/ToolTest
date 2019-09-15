import {Component, Input, OnInit} from '@angular/core';
import {NzMessageService, NzModalSubject} from "ng-zorro-antd";
import {HttpClientService} from "../../../../../shared/service/httpClient.service";
import {RequestArgs} from "../../../../../shared/model/request-args";
import {ProbeConfInterface, ProbeConfOutModel} from "../../../../../shared/component/probe-conf/model/probe-conf-out.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

/**
 * 无线-配置-单个AP探针配置模态框
 * @class ProbeConfModalComponent
 */
@Component
({
    selector: 'app-probe-conf-frequency-modal',
    templateUrl: './probe-conf-modal.component.html',
    styleUrls: ['./probe-conf-modal.component.scss'],
})

export class ProbeConfModalComponent implements OnInit {
    /**模态框初始化数据*/
    public _name: any;
    /**全局探针数据接口*/
    public probeConfInterface: ProbeConfInterface = {};
    /**全局探针数据输出接口*/
    private globalConf: ProbeConfOutModel = new ProbeConfOutModel();
    /**警告信息 show：警告是否显示  status：警告状态  info：警告内容*/
    public alertInfo: any = {};

    /** 表单定义 */
    public validateForm: FormGroup;
    /** 验证IP地址的正则表达式 */
    private reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    private numReg = /^[1-9][0-9]*$/;
    private zeroNumReg = /^[1-9][0-9]*$|^0$/;
    /** Input框的动画效果 */
    public shake: boolean;

    public probeStatusDropDownList: Array<any> = [];

    public probeStatus: any;

    private probeConfOutModel: ProbeConfOutModel = new ProbeConfOutModel();

    private arrayForm: Array<any>;

    @Input()
    set name(value: any) {
        // console.log(value);
        this.probeConfInterface = value;
        this._name = value;
    }

    /**
     * 将获取到的表格数据内容进行筛选
     * @param subject  NzModalSubject
     *          模态框返回数据
     * @param http  HttpClientService
     * @param message  NzMessageService
     * @description
     *         生成告警信息的默认值
     */
    constructor(private fb: FormBuilder, private subject: NzModalSubject, private http: HttpClientService, private message: NzMessageService) {
        this.probeStatusDropDownList.push({id: 0, name: '禁用'});
        this.probeStatusDropDownList.push({id: 1, name: 'AP+扫描'});
        this.probeStatusDropDownList.push({id: 2, name: '全信道扫描'});
        this.validateForm = this.fb.group({
            probeStatus: new FormControl('', [Validators.required]),
            sysLogIp: new FormControl('', [Validators.pattern(this.reg), Validators.required]),
            probeServerIp: new FormControl('', [Validators.pattern(this.reg), Validators.required]),
            sysLogPort: new FormControl('',
                [Validators.min(1), Validators.max(65535),Validators.pattern(this.numReg),
                    Validators.required]),
            probeServerPort: new FormControl('',
                [Validators.min(1), Validators.max(65535),Validators.pattern(this.numReg),
                    Validators.required]),
            probeInterval: new FormControl('', [Validators.required,Validators.min(0),
                Validators.max(10000),Validators.pattern(this.zeroNumReg)]),
            scanRssi: new FormControl('', [Validators.required,Validators.min(40),
                Validators.max(90),Validators.pattern(this.numReg)]),
        });
    }

    /**
     * 初始化方法
     * @description
     *        将表格内容转换为ID
     */
    ngOnInit() {
        this.probeConfOutModel.setData(this.probeConfInterface);
        this.validateForm.setValue({
            probeStatus: this.probeConfOutModel.probeStatus,
            sysLogIp: this.probeConfOutModel.sysLogIp,
            probeServerIp: this.probeConfOutModel.probeServerIp,
            sysLogPort: this.probeConfOutModel.sysLogPort,
            probeServerPort: this.probeConfOutModel.probeServerPort,
            probeInterval: this.probeConfOutModel.probeInterval,
            scanRssi: this.probeConfOutModel.scanRssi,
        });
        this.arrayForm = ['probeStatus', 'sysLogIp', 'probeServerIp', 'sysLogPort', 'probeServerPort','probeInterval', 'scanRssi'];
    }

    /**
     * 验证表单是否输入正确
     * */
    private validate(): boolean {
        let status: boolean = false;
        for (let obj of this.arrayForm) {
            this.validateForm.controls[obj].markAsDirty();
            if (this.validateForm.controls[obj].invalid) {
                status = true;
            }
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
        /** 表单校验成功 */
        if (! this.validate()) {
            this.globalConf.setData(this.validateForm.value);
            this.globalConf.netId=this.probeConfInterface.netId;
            console.log(this.globalConf);
            this.editProbeConf();
        }
    }

    /** 点击退出后的事件，关闭模态框 */
    handleCancel() {
        this.subject.destroy('onCancel');
    }

    onKeyup(event: KeyboardEvent) { // with type info
        return event.keyCode>=48&&event.keyCode<=57;
    }

    onKeypress(event: KeyboardEvent) { // with type info
        return event.keyCode>=48&&event.keyCode<=57;
    }

    onBlur(event: KeyboardEvent) { // with type info
        (<HTMLInputElement>event.target).value = (<HTMLInputElement>event.target).value.replace(/[^\d]/g,'');
    }

    /**
     * 获取表单控制项
     * @param name
     * @returns {any}
     */
    getFormControl(name) {
        return this.validateForm.controls[name];
    }

    private editProbeConf() {
        let requestArgs: RequestArgs = new RequestArgs(
            {
                url: `/api/v1/net_probe_config/${this.probeConfInterface.netId}`,
                systemName: 'wlanscope',
                header: {'ticket': sessionStorage.getItem('ticket')},
                body: this.globalConf.getPatchData()
            });

        this.http.httpPatch(requestArgs).subscribe(
            res => {
                if (res.code === 0) {
                    this.subject.destroy('onOk');
                } else {
                    this.message.error("保存失败！");
                    this.message.error(res.msg);
                }
            }
        );
    }
}
