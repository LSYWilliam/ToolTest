import {Component, Input, OnInit} from '@angular/core';
import {NzModalSubject} from "ng-zorro-antd";
import {HttpClientService} from "../../../../../../shared/service/httpClient.service";
import {RequestArgs} from "../../../../../../shared/model/request-args";
import {MonthlyDetailHead} from "../../model/monthly-detail-head.model";
import {routerTransition} from "../../../../../../animations/route-animations";

@Component({
    selector: 'app-mothly-user-detail-modal',
    templateUrl: './mothly-user-detail-modal.component.html',
    styleUrls: ['./mothly-user-detail-modal.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})
export class MothlyUserDetailModalComponent implements OnInit {

    /**判断点击的是 新增 or 编辑*/
    @Input() modalTitleName: String;
    /**组件传给模态框的元素*/
    @Input() srcRequestArgs: RequestArgs;

    monthlyDetailHead: MonthlyDetailHead = new MonthlyDetailHead();
    tableInput:any;
    metaData:any;

    constructor(private subject: NzModalSubject, private http: HttpClientService) {
        this.tableInput = this.monthlyDetailHead.tableInput;
        this.metaData = this.monthlyDetailHead.metaData;
    }

    ngOnInit() {
    }

}
