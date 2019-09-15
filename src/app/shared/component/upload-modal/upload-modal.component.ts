import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NzMessageService, NzModalSubject, NzNotificationService} from "ng-zorro-antd";
import {RequestArgs} from "../../model/request-args";
import {HttpClientService} from "../../service/httpClient.service";
import {Router} from "@angular/router";

/**
 * 导入模态框模块
 * @class UploadModalComponent
 */
@Component
({
    selector: 'app-upload-modal',
    templateUrl: './upload-modal.component.html',
    styleUrls: ['./upload-modal.component.scss'],
})

export class UploadModalComponent implements OnInit  {
    /**模态框标题*/
    public info: string;
    /**请求头*/
    public header: any;
    /**上传的文件大小*/
    public fileSize: any;
    /**上传文件的进度条*/
    public progess: any;
    /**是单个导入文件还是多个导入文件 true 多个文件导入 false 单个文件导入*/
    public isMulImport: any;
    /**上传的url*/
    public uploadUrl: string;
    /**是否导入成功*/
    public isSuccess: boolean;
    /**http请求*/
    public requestArgs: RequestArgs = new RequestArgs();
    /**渲染的时候，初始化模态框数据*/
    @Input()
    set value(value: any) {
        this.info = value.title;
        this.header = value.header;
        this.isMulImport = value.isMulImport;
        this.uploadUrl= value.url;
    }
    /**导入事件*/
    @Output() uploadEvent: EventEmitter<any> = new EventEmitter<any>();

    constructor(private http: HttpClientService,private subject: NzModalSubject,private message: NzMessageService,
                private router: Router,private _notification: NzNotificationService) {
    }
    /**
     * 文件上传 状态变更回调函数
     *      params参数
     *          1.$event 上传文件时，有关文件的内容和开始上传到上传结束的状态信息
     *
     * */
    changeCallBack($event) {
        const fileMessage = $event.file;
        this.fileSize = fileMessage.size;
        const res = fileMessage.response;
        if (res) {
            switch(res.code) {
                case 0 :
                case 9 :
                    this.progess = fileMessage.percent;
                    this.message.success('导入成功!');
                    this.message.success(res.msg);
                    this.subject.destroy(['onOk', res.msg]);
                    this.subject.destroy('onOk');
                    break;
                case 1103:
                    this.message.error('令牌无效！返回登录页面');
                    this.router.navigateByUrl('login');
                    this.subject.destroy('onCancel');
                    break;
                default:
                    this.isSuccess = true;
                    this.subject.destroy(['onCancel', res.msg]);
                    this.subject.destroy('onCancel');
                    // this._notification.error('导入失败!', res.msg);
                    break;
            }

        }
    }
    /**点击模态框确定按钮事件*/
    // handleOk() {
    //     if (this.progess) {
    //         this.subject.destroy('onOk');
    //     } else {
    //        this.isSuccess ? this._notification.error('导入','请重新导入文件!') : this._notification.error('导入','需要先导入文件!');
    //     }
    // }
    // /**点击模态框取消按钮事件*/
    // handleCancel(e) {
    //     this.subject.destroy('onCancel');
    // }
    /**页面数据初始化*/
    ngOnInit() {}
}
