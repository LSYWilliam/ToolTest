import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {forkJoin} from "rxjs/observable/forkJoin";
import {portalInterFace, radiusInterFace, ServerModel} from "./model/server.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NzMessageService} from "ng-zorro-antd";
import {Subscription} from "rxjs/Subscription";
import {SsidConfInterface, SsidConfModel} from "../../../wireless/conf/ssid-conf/model/ssid-conf.model";
import {HttpClientService} from "../../service/httpClient.service";
import {RequestArgs} from "../../model/request-args";
import {DropDownsNumberInterface} from "../dropdown/model/dropdownsnumber.model";

/**
 * SSID配置内容组件
 * @class SsidItemComponent
 */

@Component({
    selector: 'app-ssid-item-list',
    templateUrl: './ssid-item.component.html',
    styleUrls: ['./ssid-item.component.scss']
})
export class SsidItemComponent implements OnChanges, OnInit {
    /**接收父组件传递过来的初始化指定ssid的数据*/
    @Input() public inData: SsidConfInterface;
    /**输出指定的ssid的最新数据*/
    @Output() public outData: EventEmitter<any> = new EventEmitter<any>();
    @Output() public outValidateFlag: EventEmitter<any> = new EventEmitter<any>();
    /**加密方式的数据*/
    public sharedDropDown: Array<DropDownsNumberInterface>;
    /** ssid名称验证 */
    public ssidNameValidate: FormGroup;
    /**加密(共享密钥)的验证*/
    public keyValidate: FormGroup;
    public vlanValidate: FormGroup;
    public aclValidate: FormGroup;
    /**定义用于取消订阅的(即关闭数据流)*/
    private serverInfo$: Subscription;
    /**portal服务或radius服务列表实体类*/
    public serverModel: ServerModel = new ServerModel();
    /**指定ssid的全部数据且是最新的*/
    public globalData: SsidConfModel = new SsidConfModel();

    public keyValue = [];
    public validateKeyFlag = false;
    public initFlag = false;

    /**
     * 构造函数
     * @param http HttpClientService
     * @param message NzMessageService
     * @description
     *        1、生成完全码下拉菜单的内容
     *        2、设置两个文本框表单的需求
     */
    constructor(private http: HttpClientService, public message: NzMessageService) {
        let tmp: Array<DropDownsNumberInterface> = [];
        tmp.push(<DropDownsNumberInterface>{id: 1, name: 'WEP64'});
        tmp.push(<DropDownsNumberInterface>{id: 2, name: 'WEP128'});
        tmp.push(<DropDownsNumberInterface>{id: 3, name: 'WPA-PSK/WPA2-PSK'});
        tmp.push(<DropDownsNumberInterface>{id: 4, name: 'WPA-EAP/WPA2-EAP'});
        this.sharedDropDown = tmp;
        this.keyValue[1] = "最多5";
        this.keyValue[2] = "最多13";
        this.keyValue[3] = "8-16";
        this.keyValue[4] = "8-16";

        this.ssidNameValidate = new FormGroup({
            ssidName: new FormControl(null,
                [Validators.required, Validators.minLength(2), Validators.maxLength(64),
                    Validators.pattern('^[a-zA-Z0-9-.!@#$_+\u4e00-\u9fa5]+$')]),
        });

        this.keyValidate = new FormGroup({
            key: new FormControl(null,
                [Validators.required, Validators.pattern('^[a-zA-Z0-9-.!@#$_+]+$')])
        });

        // this.aclValidate = new FormGroup({
        //     acl: new FormControl(null,
        //         [Validators.pattern(/^192.168.1.(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\/(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/)])
        // });
        this.aclValidate = new FormGroup({
            acl: new FormControl(null,
                [])
        });

        this.vlanValidate = new FormGroup({
            vlanId: new FormControl(null, [Validators.required,
                Validators.pattern(/^[1-9][0-9]*|0$/),
                Validators.min(0),
                Validators.max(4094)])
        });

    }

    validateKey(type, value) {
        switch (type) {
            case 1:
                this.validateKeyFlag = value == null || value.length > 5 || value.length <= 0;
                break;
            case 2:
                this.validateKeyFlag = value == null || value.length > 13 || value.length <= 0;
                break;
            case 3:
                this.validateKeyFlag = value == null || value.length > 16 || value.length < 8;
                break;
            case 4:
                this.validateKeyFlag = value == null || value.length > 16 || value.length < 8;
                break;
            default:
                this.validateKeyFlag = false;
        }
        this.globalData.validateFlagStack["key"]=this.validateKeyFlag;
        this.outData.emit(this.globalData);
        this.outValidateFlag.emit(this.validateKeyFlag);
        return this.validateKeyFlag;
    }

    ngOnInit(): void {
        this.initFlag = true;
    }

    /**
     * 获取父组件传入的值
     * @param changes SimpleChanges
     */
    ngOnChanges(changes: SimpleChanges): void {
        let current = changes['inData'].currentValue;
        if (current !== undefined) {
            this.globalData.setData(current);
            if (this.globalData ) {
                this.markAsDirtyFlag();
            }
            /** 如果用户点击wifi认证的话，调用getServerInfo方法 */
            if (this.globalData.certification === 1) {
                this.getServerInfo(true);
            } else {
                if (this.serverInfo$ !== undefined) {
                    this.serverInfo$.unsubscribe();
                }
            }
            this.outData.emit(this.globalData);
        }
    }

    /**
     * 文本框失去焦点时的事件
     * @param flag string
     *          ssidName: 设置SSID名称的文本框
     *          key :     设置密钥的文本框
     */
    public blurInput(flag: string) {
        switch (flag) {
            case 'ssidName':
                let ssidName = this.ssidNameValidate.get('ssidName');
                if (ssidName.status === 'VALID') {
                    this.globalData.ssidName = ssidName.value;
                    this.outData.emit(this.globalData);
                    this.globalData.validateFlagStack["ssidName"] = false;
                } else {
                    this.globalData.validateFlagStack["ssidName"] = true;
                    this.message.error('SSID名称输入错误，请重新输入！');
                }
                this.outData.emit(this.globalData);
                break;
            case 'acl':
                let acl = this.aclValidate.get('acl');
                if (acl.status === 'VALID') {
                    this.globalData.acl = acl.value;
                    this.outData.emit(this.globalData);
                    this.globalData.validateFlagStack["acl"] = false;
                } else {
                    this.globalData.validateFlagStack["acl"] = true;
                    this.message.error('acl输入错误，请重新输入！');
                }
                this.outData.emit(this.globalData);
                break;
            case 'vlanId':
                let vlanId = this.vlanValidate.get('vlanId');
                if (vlanId.status === 'VALID') {
                    this.globalData.vlanId = vlanId.value;
                    this.outData.emit(this.globalData);
                    this.globalData.validateFlagStack["vlanId"] = false;
                } else {
                    this.globalData.validateFlagStack["vlanId"] = true;
                    this.message.error('vlanId输入错误，请重新输入！');
                }
                this.outData.emit(this.globalData);
                break;
            case 'key':
                let key = this.keyValidate.get('key');
                if (key.status === 'VALID') {
                    this.globalData.saftetyCertifiedKey = key.value;
                    this.globalData.validateFlagStack["key"] = false;
                    this.outData.emit(this.globalData);
                } else {
                    key.setValue(this.inData.saftetyCertifiedKey);
                    this.globalData.validateFlagStack["key"] = true;
                    this.outData.emit(this.globalData);
                    this.message.error('请重新输入！');
                }
                break;
            case 'limit':
                this.outData.emit(this.globalData);
                break;
        }
    }

    /** 点击单选框的事件 */
    public selectRadio() {
        /** 如果用户点击单选框是3的话，调用getServerInfo方法 */
        if (this.globalData.authentication === '2') {
            this.globalData.saftetyCertified = 1;
        } else {
            if (this.serverInfo$ !== undefined) {
                this.serverInfo$.unsubscribe();
            }
        }
        this.outData.emit(this.globalData);
    }

    public selectDropDown(data: string) {
        this.globalData.saftetyCertified = Number.parseInt(data);
        this.outData.emit(this.globalData);
    }

    /** 点击switch开关的事件 */
    public selectSwitch() {
        this.outData.emit(this.globalData);
    }

    /** 点击wifiAuthswitch开关的事件 */
    public wifiAuthSelectSwitch(value) {
        this.globalData.certification = value ? 1 : 0;
        this.getServerInfo(true);
        this.outData.emit(this.globalData);
    }

    /** 点击客户端IP分配单选框事件
     * @param id string
     *           客户端IP分配的ID 1：桥接 2：3层 3：NAT
     */
    public selectID(id: string) {
        this.globalData.ipDistribution = id;
        this.outData.emit(this.globalData);
    }

    /** 点击射频单选框事件
     * @param id string
     *           射频 0：2G 1：5G 2：2G/5G
     */
    public selectRFID(id: number) {
        this.globalData.rf = id;
        this.outData.emit(this.globalData);
    }

    /** 点击portal、radius服务器下拉框事件
     * @param id string
     *          选中的ID
     * @param flag string
     *          标识选择portal服务器或radius服务器
     * @description
     *          1、根据选中的ID，将整行数据塞入表格中
     *          2、将选中的ID，塞入返回实体中
     * */
    public selectServer(id: string, flag: string) {
        if (flag === 'portal') {
            this.serverModel.portalServerData = this.serverModel.portalServerList[id];
            this.globalData.portalServer = Number.parseInt(id);
            this.outData.emit(this.globalData);
        } else {
            this.serverModel.radiusServerData = this.serverModel.radiusServerList[id];
            this.globalData.radiusServer = Number.parseInt(id);
            this.outData.emit(this.globalData);
        }
    }

    /** 获取portal和radius服务器列表 */
    private getServerInfo(status: boolean) {
        const system = "wlanscope";
        const ticket = {'ticket': sessionStorage.getItem('ticket')};

        let req1: RequestArgs = new RequestArgs({systemName: system, header: ticket, url: '/api/v1/portal'});
        let req2: RequestArgs = new RequestArgs({systemName: system, header: ticket, url: '/api/v1/radius'});

        this.serverInfo$ = forkJoin(
            this.http.httpGet(req1),
            this.http.httpGet(req2)
        ).subscribe(
            ([res1, res2]) => {
                let portal: portalInterFace;
                let radius: radiusInterFace;
                if (res1.code === 0) {
                    portal = res1.result;
                }
                if (res2.code === 0) {
                    radius = res2.result;
                }
                this.serverModel.setData(portal, radius);
                if (status) {
                    if (this.globalData.portalServer === null) {
                        this.serverModel.portalServerData = [];
                    } else {
                        this.serverModel.portalServerData = this.serverModel.portalServerList[this.globalData.portalServer] || [];
                    }

                    if (this.globalData.radiusServer === null) {
                        this.serverModel.radiusServerData = [];
                    } else {
                        this.serverModel.radiusServerData = this.serverModel.radiusServerList[this.globalData.radiusServer] || [];
                    }
                } else {
                    this.serverModel.portalServerData = [];
                    this.serverModel.radiusServerData = [];
                }
            }
        );
    }

    markAsDirtyFlag() {
        this.aclValidate.controls['acl'].markAsDirty();
        this.ssidNameValidate.controls['ssidName'].markAsDirty();
        this.keyValidate.controls['key'].markAsDirty();
        this.vlanValidate.controls['vlanId'].markAsDirty();
        if(!this.initFlag) {
            return;
        }
        if(this.ssidNameValidate.get('ssidName').status !== 'VALID') {
            this.globalData.validateFlagStack["ssidName"] = true;
        } else {
            this.globalData.validateFlagStack["ssidName"] = false;
        }
        if(this.aclValidate.get('acl').status !== 'VALID') {
            this.globalData.validateFlagStack["acl"] = true;
        } else {
            this.globalData.validateFlagStack["acl"] = false;
        }
        if(this.keyValidate.get('key').status !== 'VALID'&&this.globalData.authentication === '2') {
            this.globalData.validateFlagStack["key"] = true;
        }
        if(this.globalData.authentication !== '2') {
            this.globalData.validateFlagStack["key"] = false;
        }
        if(this.vlanValidate.get('vlanId').status !== 'VALID') {
            this.globalData.validateFlagStack["vlanId"] = true;
        } else {
            this.globalData.validateFlagStack["vlanId"] = false;
        }
        this.outData.emit(this.globalData);
    }
}
