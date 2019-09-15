import {Component, Input, OnInit} from '@angular/core';
import {NzMessageService, NzModalSubject} from "ng-zorro-antd";
import {HttpClientService} from "../../../../../shared/service/httpClient.service";
import {RequestArgs} from "../../../../../shared/model/request-args";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component
({
    selector: 'app-ap-list-modal',
    templateUrl: './ap-list-modal.component.html',
    styleUrls: ['./ap-list-modal.component.scss'],
})

export class ApListModalComponent  implements OnInit  {
    /**模态框初始化的数据*/
    public data: any;
    /**备注*/
    public remark: any;
    /**表单验证*/
    public validateForm: FormGroup;
    /** http请求参数 */
    public requestArgs: RequestArgs = new RequestArgs();
    /**当双击表格的时候，获取初始化模态框的数据*/
    @Input()
    set name(value: any) {
        console.log(value);
        this.data = value;
        this.remark = value.value;
    }

    constructor(private subject: NzModalSubject, private http: HttpClientService,
                private message: NzMessageService, private fb: FormBuilder,) {
        this.validateForm = this.fb.group({
            remark:[ null, [ Validators.required,
                Validators.minLength(2),
                Validators.maxLength(32)]]
        });
    }

    /**点击模态框的确定按钮事件*/
    handleOk() {
        this.subject.next(['onOk', this.data.data.apId, this.remark ]);
        this.subject.destroy('onOk');
    }

    /**点击模态框的取消按钮事件*/
    handleCancel() {
        this.subject.destroy(['onCancel']);
    }


    /**初始化数据*/
    ngOnInit() {

    }
}
