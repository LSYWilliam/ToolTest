import {Component, Input, OnInit} from '@angular/core';
import {NzMessageService, NzModalSubject} from "ng-zorro-antd";
import {HttpClientService} from "../../../../../shared/service/httpClient.service";
import {RequestArgs} from "../../../../../shared/model/request-args";
import {RadioModalModel} from "../../model/radio-modal.model";
import {RadioValueModalModel} from "../../model/radio-value-modal.model";

@Component
({
    selector: 'app-radio-frequency-modal',
    templateUrl: './radio-freq-modal.component.html',
    styleUrls: ['./radio-freq-modal.component.scss'],
})

export class RadioFreqModalComponent  implements OnInit  {
    /**模态框初始化的数据*/
    public data: any;
    /**初始化射频管理页面的下拉框数据*/
    public inValue : RadioValueModalModel;
    /**实时监听模态框数据变化，且及时修改*/
    public outValue : RadioValueModalModel;
    /**射频管理页面的模态框数据实体类*/
    public radioModalModel : RadioModalModel = new RadioModalModel();
    /**当双击表格的时候，获取初始化模态框的数据*/
    @Input()
    set name(value: any) {
        this.data = value;
    }

    constructor(private subject: NzModalSubject, private http: HttpClientService, private message: NzMessageService) {
    }
    /**射频管理页面的点击下拉框每一项触发的事件*/
    getSelect(data, flag) {
        this.outValue[flag] = data;
    }

    /**点击模态框的确定按钮事件*/
    handleOk() {
        if (this.outValue.equal(this.data)) {
            this.message.warning('配置无改动，无须保存！');
        } else {
            let requestArgs: RequestArgs = new RequestArgs(
                {
                    systemName: 'wlanscope',
                    header: {'ticket': sessionStorage.getItem('ticket')},
                    url: '/api/v1/rf/saveApRfConfig',
                    body: this.outValue.getPostValue()
                });
            this.http.httpPost(requestArgs).subscribe(
                res => {
                    if (res.code === 0) {
                        this.message.success('修改成功!');
                        this.subject.next('edit|' + JSON.stringify(this.getEditValue(requestArgs.body, this.outValue.config2gState, this.outValue.config5gState)));
                        this.subject.destroy('onOk');
                    } else {
                        this.message.error('修改失败！');
                        this.message.error(res.msg);
                    }
                }
            );
        }
    }

    /**点击模态框的取消按钮事件*/
    handleCancel(e) {
        this.subject.destroy('onCancel');
    }

    /**编辑模态框中修改的值*/
    public getEditValue (data: any, channel2Stage: boolean, channel5Stage: boolean) {
        let object = { 'config2gChannel': null, 'config2gPowerDbm': null,
            'config5gChannel': null, 'config5gPowerDbm': null,
            'fieldsStrengthThreshold': null, 'apRateThreshold': null
        };

        if (channel2Stage === true) {
            object['config2gChannel'] = '未开启';
            object['config2gPowerDbm'] = '未开启';
        } else {
            // object['config2gChannel'] = data['config2gChannel'] == 0 ? '自动' : data['config2gChannel'];
            // object['config2gPowerDbm'] = data['config2gPowerDbm'] == 0 ? '默认' : data['config2gPowerDbm'];

            object['config2gChannel'] = data['config2gChannel'] == 0 ? '0' : data['config2gChannel'];
            object['config2gPowerDbm'] = data['config2gPowerDbm'] == 0 ? '100%' : data['config2gPowerDbm'];
        }

        if (channel5Stage === true) {
            object['config5gChannel'] = '未开启';
            object['config5gPowerDbm'] = '未开启';
        } else {
            // object['config5gChannel'] = data['config5gChannel'] == 0 ? '自动' : data['config5gChannel'];
            // object['config5gPowerDbm'] = data['config5gPowerDbm'] == 0 ? '默认' : data['config5gPowerDbm'];
            object['config5gChannel'] = data['config5gChannel'] == 0 ? '0' : data['config5gChannel'];
            object['config5gPowerDbm'] = data['config5gPowerDbm'] == 0 ? '100%' : data['config5gPowerDbm'];
        }

        object['fieldsStrengthThreshold'] = data['fieldsStrengthThreshold'];
        object['apRateThreshold'] = data['apRateThreshold'];

        return object;
    }

    /**初始化数据*/
    ngOnInit() {
        this.inValue = new RadioValueModalModel(this.data);
        this.outValue = new RadioValueModalModel(this.data);
    }
}
