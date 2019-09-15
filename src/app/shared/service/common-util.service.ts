import {Injectable} from '@angular/core';
import {ConfirmModalComponent} from "../component/confirm-modal/confirm-modal.component";
import {NzModalService, NzModalSubject} from "ng-zorro-antd";

@Injectable()
export class CommonUtilService {

    /**订阅模态框*/
    public subscription$: NzModalSubject;

    constructor(public modalService: NzModalService) {
    }

    /**
     * 自定义弹框
     * @param message
     * @param callBack
     */
    public customConfirm(message, callBack?: Function) {
        /**打开是否保存的提示框*/
        const modalConfig = {
            content: ConfirmModalComponent,
            onOk() {
            },
            onCancel() {
            },
            footer: false,
            maskClosable: false,
            componentParams: {
                name: message
            }
        };
        this.subscription$ = this.modalService.open(modalConfig);
        this.subscription$.subscribe(result => {
            if (result === 'onOk') {
                if (callBack) {
                    callBack();
                }
            }
        });
    }

}
