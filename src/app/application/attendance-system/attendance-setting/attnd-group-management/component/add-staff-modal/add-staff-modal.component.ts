import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NzMessageService, NzModalSubject} from "ng-zorro-antd";
import {ExchangeStaffHead} from "../../model/exchange-staff-head";
import {RequestArgs} from "../../../../../../shared/model/request-args";
import {HttpClientService} from "../../../../../../shared/service/httpClient.service";
import {TwoExchangeStaffTableComponent} from "../two-exchange-staff-table/two-exchange-staff-table.component";
import {routerTransition} from "../../../../../../animations/route-animations";

@Component({
    selector: 'app-add-staff-modal',
    templateUrl: './add-staff-modal.component.html',
    styleUrls: ['./add-staff-modal.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})
export class AddStaffModalComponent implements OnInit {
    @ViewChild(TwoExchangeStaffTableComponent) child: TwoExchangeStaffTableComponent;

    /**判断点击的是 新增 or 编辑*/
    @Input() modalTitleName: String;
    @Input() dataMenu;
    @Input() dataRoot;
    @Input() finalTableData: Array<any>;

    /**页面左右表格数据*/
    leftTableData: Array<any>;
    rightTableData: Array<any>;
    /**页面左右表格数据元*/
    tableInput: any;

    requestArgs: RequestArgs;

    /**
     * 表单取消事件
     * @param {MouseEvent} $event
     */
    reset($event: MouseEvent) {
        this.subject.destroy('onCancel');
        this.subject.next(this.finalTableData);
    }

    /**
     * 设置左边表格数据
     * @param value
     */
    setLeftTableData(value) {
        if(typeof value ==="string" || typeof value === "undefined") {
            console.log(value);
            return;
        }
        this.requestArgs = new RequestArgs();
        this.requestArgs.systemName = "wlanscope";
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket'), 'Content-Type': 'application/json'};
        this.requestArgs.url = "/department/api/query/dept_all_employee";
        this.requestArgs.body = {
            "id": value.id
        };
        this.http.httpGet(this.requestArgs).subscribe(res => {
            if (res.code === 0) {
                this.rightTableData = [];
                let tmp_array = res.result;
                if((!tmp_array)||(JSON.stringify(tmp_array) === "{}")) {
                    this.leftTableData = [];
                } else {
                    if(this.finalTableData.length > 0) {
                        this.rightTableData = tmp_array.filter(glt => {
                            return this.finalTableData.find((n) => {
                                return glt.id === n.id;
                            });
                        });
                    }
                    if (this.rightTableData.length > 0) {
                        this.leftTableData = tmp_array.filter(glt => {
                            return !this.rightTableData.find((n) => {
                                return glt.id === n.id;
                            });
                        });
                    } else {
                        this.leftTableData = tmp_array;
                    }
                }
            } else {
                this.rightTableData = [];
                this.leftTableData = [];
            }
        });
    }

    /**
     * 左边树点击
     * @param value
     */
    menuClick(value) {
        this.setLeftTableData(value);
    }

    /**
     * 右边的数据到左边
     * @param value
     */
    right2left(value) {
    }

    /**
     * 左边的数据到右边
     * @param value
     */
    left2right(value) {
    }

    /**
     * 获取右边表格的数据
     * @param value
     */
    getRightData(value) {
        console.log(value);
        this.finalTableData.forEach(res => {
            value.forEach(glt => {
                if (res.id !== glt.id) {
                    this.finalTableData.push(glt);
                }
            });
        });
        this.subject.next(this.finalTableData);
    }

    constructor(public _message: NzMessageService, private subject: NzModalSubject, private http: HttpClientService) {
        this.tableInput = new ExchangeStaffHead().tableInput;
    }

    ngOnInit() {
        if (!this.dataRoot || this.dataRoot.length === 0) {
            this._message.info("无法获取企业部门数据");
            this.rightTableData = [];
            this.leftTableData = [];
            return;
        }
        console.log(this.dataRoot);
        this.setLeftTableData(this.dataRoot);
        if (typeof this.finalTableData === "undefined") {
            this.finalTableData = [];
        }
    }
}
