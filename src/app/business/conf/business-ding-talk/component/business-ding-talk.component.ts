import {Component, OnInit} from '@angular/core';
import {BusinessDingTalkService} from "../service/business-ding-talk.service";
import {FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-business-ding-talk',
    templateUrl: './business-ding-talk.component.html',
    styleUrls: ['./business-ding-talk.component.scss']
})
export class BusinessDingTalkComponent extends BusinessDingTalkService implements OnInit {
    dingForm;
    validateForm: FormGroup;

    /**
     * 表单提交完成的数据
     * @param $event
     * @param value
     */
    submitForm = ($event, value) => {
        if (this.validate()) {
            return;
        }
        let tmp = {
            dingCorpId: value.corpId,
            dingCorpSecret: value.corpSecret
        };
        this.config(tmp);
    };

    /**
     * 表单取消事件
     * @param {MouseEvent} $event
     */
    resetForm($event: MouseEvent) {
        this.validateForm.patchValue({
            corpId: "",
            corpSecret: ""
        });
    }

    transData($event: MouseEvent) {
        this.contentBody = this.contentLoading;
        this.isVisibleMiddle = true;
        this.trans();
    }

    changDingCorpId(value) {
        if (value !== this.oldDingCorpId) {
            this.disabledButton = false;
        } else {
            this.disabledButton = true;
        }
    }

    changDingCorpSecret(value) {
        if (value !== this.oldDingCorpSecret) {
            this.disabledButton = false;
        } else {
            this.disabledButton = true;
        }
    }

    /**
     * 获取表单控制项
     * @param name
     * @returns {any}
     */
    getFormControl(name) {
        return this.validateForm.controls[name];
    }

    /**判断验证是否通过*/
    private validate(): boolean {
        let status = false;
        for (let obj of this.dingForm) {
            this.validateForm.controls[obj].markAsDirty();
            if (this.validateForm.controls[obj].invalid) {
                status = true;
            }
        }
        return status;
    }

    /**
     * 编辑时，给模态框赋值
     * @param value
     */
    updateModalValue() {
        this.validateForm.patchValue({
            corpId: this.oldDingCorpId,
            corpSecret: this.oldDingCorpSecret
        });
        this.dingCorpId= this.oldDingCorpId;
        this.dingCorpSecret= this.oldDingCorpSecret;
    }

    ngOnInit() {
        this.dingForm = ['corpId', 'corpSecret'];
        let obj = {
            corpId: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255), Validators.pattern(/^[a-zA-Z0-9]+$/)]],
            corpSecret: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255), Validators.pattern(/^[a-zA-Z0-9_-]+$/)]],
        };
        this.validateForm = this.fb.group(obj);
        this.updateModalValue();
    }

    ngOnDestroy(): void {
        if (this.commonUtilService.subscription$ !== undefined) {
            this.commonUtilService.subscription$.destroy();
        }
    }

}
