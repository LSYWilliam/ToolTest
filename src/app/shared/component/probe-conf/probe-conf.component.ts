import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import { ProbeConfInterface, ProbeConfOutModel } from "./model/probe-conf-out.model";
import {ProbeConf} from "../../static-data/probe-conf";
import { FormControl, FormGroup, Validators} from "@angular/forms";
import {transition, trigger, useAnimation} from "@angular/animations";
import { shake } from 'ng-animate';
import {DropDownsInterface} from "../dropdown/model/dropdowns.model";

/**
 * 无线-配置-探针管理-全局设置组件
 * @class ProbeConfComponent
 */
@Component
({
    selector: 'app-overall-probe-conf',
    templateUrl: './probe-conf.component.html',
    styleUrls: ['./probe-conf.component.scss'],
    animations: [
        trigger('shake', [transition('* => *', useAnimation(shake))]),
    ],
})

export class ProbeConfComponent implements OnChanges {
    /** 输入数据 */
    @Input() public inData: ProbeConfInterface;
    /** 输出数据 */
    @Output() public outData: EventEmitter<ProbeConfOutModel> = new EventEmitter<ProbeConfOutModel>();
    @Output() public outValidateFlag: EventEmitter<any> = new EventEmitter<any>();

    private probeConfOutModel : ProbeConfOutModel = new ProbeConfOutModel();
    /** 表单定义 */
    public validateForm: FormGroup;
    /** 验证IP地址的正则表达式 */
    private reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    /** Input框的动画效果 */
    public shake: boolean;

    public probeStatusDropDownList: Array<DropDownsInterface> = [];

    public probeStatus: any;

    /**
     * 构造函数
     * @description
     *      构建表单初始化的内容
     *      1、服务器IP地址  验证规则  IP地址正则，必填
     *      2、服务器端口    验证规则  1-65535，必填
     *      3、发送间隔      验证规则  1-3600，必填
     */
    constructor() {
        this.probeStatusDropDownList.push(<DropDownsInterface>{id:"0",name:'禁用'});
        this.probeStatusDropDownList.push(<DropDownsInterface>{id:"1",name:'热点+扫描'});
        this.probeStatusDropDownList.push(<DropDownsInterface>{id:"2",name:'全频扫描'});
        this.validateForm = new FormGroup({
            probeStatus:new FormControl('', [ Validators.required]),
            sysLogIp: new FormControl('', [ Validators.pattern(this.reg), Validators.required]),
            probeServerIp: new FormControl('', [ Validators.pattern(this.reg), Validators.required]),
            sysLogPort : new FormControl('',
                [ Validators.minLength(1),
                                    Validators.maxLength(65535),
                                    Validators.required]),
            probeServerPort : new FormControl('',
                [ Validators.minLength(1),
                    Validators.maxLength(65535),
                    Validators.required]),
            probeInterval:new FormControl('', [ Validators.required]),
            scanRssi:new FormControl('', [ Validators.required]),
        });
    }

    /**
     * 输入参数变更钩子
     * @param changes SimpleChanges
     *         inData: ProbeConfInterface
     * @description
     *      获取输入参数，并将参数初始化至模板上
     */
    ngOnChanges(changes: SimpleChanges): void {
        /** 动画效果 */
        this.shake = false;
        /** 获取静态配置数据 */
        const conf = ProbeConf();
        let current = changes['inData'].currentValue;
        console.log(changes['inData']);

        if (current !== undefined) {
            /** 输入的数据转换为实体 */
            this.probeConfOutModel.setData(current);
            /** 向表单中填充数据 */
            // this.probeStatus = this.probeConfOutModel.probeStatus;
            this.probeStatusDropDownList.forEach(res=> {
                if(parseInt(res.id,0)===this.probeConfOutModel.probeStatus) {
                    this.probeStatus = res;
                }
            });

            this.validateForm.setValue({
                probeStatus: this.probeConfOutModel.probeStatus,
                sysLogIp: this.probeConfOutModel.sysLogIp,
                probeServerIp: this.probeConfOutModel.probeServerIp,
                sysLogPort: this.probeConfOutModel.sysLogPort,
                probeServerPort: this.probeConfOutModel.probeServerPort,
                probeInterval: this.probeConfOutModel.probeInterval,
                scanRssi: this.probeConfOutModel.scanRssi,
            });
            /** 设置模板传输类型下拉条的默认值 */
            this.outData.emit(this.probeConfOutModel);
        }
    }

    /**
     * 设置IP地址
     * @description
     *      根据表单属性，将用户输入的IP地址传回用户
     */

    /**
     * 设置端口号和发送周期
     * @param flag string
     *     interval|serverPort  间隔|服务器端口
     * @description
     *      根据表单属性，验证结果正确时传回用户输入，否则传递原值
     */
    setValue(flag: string) {

    }

    /**
     * 设置全局是否开启功能
     * @description
     *      根据双向绑定参数probeEnable的值反馈ID
     */
    // selectStatus(){
    //     this.probeConfOutModel.probeEnable = this.globalProbeConf.probeEnable ? 1:0;
    //     this.outData.emit(this.probeConfOutModel);
    // }

    /**
     * 获取表单控制项
     * @param name
     * @returns {any}
     */
    getFormControl(name) {
        return this.validateForm.controls[name];
    }

    /** 设置间隔默认单位为秒 */
    formatterPercent = value => `${value}秒`;

    /**
     * 设置发送类型
     * @param id string
     *       返回下拉条内容的ID
     */
    selectMessage(id: string) {
        // this.probeConfOutModel.messageType = id;
        this.outData.emit(this.probeConfOutModel);
    }

    // /**
    //  * 设置动画效果
    //  * @param index number
    //  *          0:IP地址 1:serverPort 2: 发送周期
    //  * @description
    //  *      根据表单属性，将用户输入的IP地址传回用户
    //  */
    // private formAnimation(index: number) {
    //     let time: number;
    //     /** 创建一个倒计时的流 时长3毫秒*/
    //     const stream$ = new Observable<number>(
    //         observer => {
    //             let count = 3;
    //             const interval = setInterval(
    //                 () => {
    //                     observer.next(count--);
    //                 }, 100);
    //             return () => {
    //                 clearInterval(interval);
    //             };
    //         }
    //     );
    //
    //     /** 订阅倒计时流 */
    //     const subscribe$ = stream$.subscribe(
    //         value => {
    //             time = value;
    //             if (value === 0) {
    //                 this.formStatus[index] = 'validating';
    //                 subscribe$.unsubscribe();
    //             } else {
    //                 this.formStatus[index] = 'error';
    //             }
    //         }
    //     );
    // }

    onKeyup(event: KeyboardEvent) { // with type info
        return event.keyCode>=48&&event.keyCode<=57;
    }

    onKeypress(event: KeyboardEvent) { // with type info
        return event.keyCode>=48&&event.keyCode<=57;
    }

    onBlur(event: KeyboardEvent,flag) { // with type info
        console.log(123);
        alert(123);
        (<HTMLInputElement>event.target).value = (<HTMLInputElement>event.target).value.replace(/[^\d]/g,'');
        const value = this.validateForm.get(flag);
        if (value.status === 'VALID') {
            console.log(this.validateForm.value);
            this.probeConfOutModel=this.validateForm.value;
            this.outData.emit(this.probeConfOutModel);
        } else {
            this.outValidateFlag.emit(false);
        }
    }

    onBlurValue(event: KeyboardEvent,flag) { // with type info
        console.log(123);
        const value = this.validateForm.get(flag);
        if (value.status === 'VALID') {
            console.log(this.validateForm.value);
            this.probeConfOutModel=this.validateForm.value;
            this.outData.emit(this.probeConfOutModel);
        } else {
            this.outValidateFlag.emit(false);
        }
    }
}
