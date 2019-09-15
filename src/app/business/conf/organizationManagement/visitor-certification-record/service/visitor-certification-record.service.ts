import {Injectable, ViewChild} from '@angular/core';
import {NzMessageService, NzModalService, NzModalSubject} from "ng-zorro-antd";
import {HttpClientService} from "../../../../../shared/service/httpClient.service";
import {CommonUtilService} from "../../../../../shared/service/common-util.service";
import {DropDownsInterface} from "../../../../../shared/component/dropdown/model/dropdowns.model";
import {RequestArgs} from "../../../../../shared/model/request-args";
import {TableComponent} from "../../../../../plugins/component/table/table.component";
import {VisitorCertificationRecordDataModel} from "../model/visitor-certification-record-data-model";
import {VisitorCertificationRecordHeadDataModel} from "../model/visitor-certification-record-head-data-model";
import * as moment from 'moment';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Injectable()
export class VisitorCertificationRecordService {
    visitorCertificationRecordDataModel: VisitorCertificationRecordDataModel = new VisitorCertificationRecordDataModel();
    visitorCertificationRecordHeadDataModel: VisitorCertificationRecordHeadDataModel = new VisitorCertificationRecordHeadDataModel();
    dropDownList;
    startTime = "";
    endTime = "";
    mac = "";
    telephone = "";
    flag;
    @ViewChild(TableComponent) child: TableComponent;

    deptDropDownList: Array<DropDownsInterface>;
    empDropDownList: Array<DropDownsInterface>;

    /**订阅模态框*/
    subscription$: NzModalSubject;

    constructor(private http: HttpClientService, public modalService: NzModalService, public _message: NzMessageService,
                public commonUtilService: CommonUtilService) {
        this.getTableList();
        this.getEmpDropDownList();
        this.getDeptDropDownList();
    }

    getTableList() {
        let requestArgs = new RequestArgs();
        requestArgs.header = {'ticket': sessionStorage.getItem('ticket'), 'Content-Type': 'application/json'};
        requestArgs.url = "/authentication/api/query/all";
        requestArgs.systemName = "wlanscope";
        this.http.httpPost(requestArgs).subscribe(res => {
            if (res.code === 0) {
                this.visitorCertificationRecordDataModel.list = res.result;
            } else {
                this._message.info(res.msg);
            }
        });
    }

    queryTableList(startTime?,endTime?, mac?, telephone?) {
        let requestArgs = new RequestArgs();
        requestArgs.header = {'ticket': sessionStorage.getItem('ticket'), 'Content-Type': 'application/json'};
        requestArgs.url = "/authentication/api/query/all";
        requestArgs.systemName = "wlanscope";
        requestArgs.body = {};
        if (startTime&&endTime) {
            Object.assign(requestArgs.body, {"startTime": moment(startTime).format("YYYY-MM-DD HH:mm:ss")});
        }
        if (startTime&&endTime) {
            Object.assign(requestArgs.body, {"endTime": moment(endTime).format("YYYY-MM-DD HH:mm:ss")});
        }
        if (mac) {
            Object.assign(requestArgs.body, {"mac": mac});
        }
        if (telephone) {
            Object.assign(requestArgs.body, {"telephone": telephone});
        }
        this.http.httpPost(requestArgs).subscribe(res => {
            if (res.code === 0) {
                this.visitorCertificationRecordDataModel.list = res.result;
            } else if (res.code === 9) {
                this.visitorCertificationRecordDataModel.list = [];
            } else if (res.code !== 9) {
                this._message.info(res.msg);
            }
        });
    }

    addItem(item) {
        let requestArgs = new RequestArgs();
        requestArgs.header = {'ticket': sessionStorage.getItem('ticket'), 'Content-Type': 'application/json'};
        requestArgs.url = "/employee_terminal/api/save_or_update";
        requestArgs.systemName = "wlanscope";
        requestArgs.body = {
            macAddr: item.macAddr,
            equipmentNumber: item.equipmentNumber,
            equipmentType: item.equipmentType,
            empId: item.empId,
            deptId: item.deptId
        };
        this.http.httpPost(requestArgs).subscribe(res => {
            if (res.code === 0) {
                this._message.info(res.msg);
                this.getTableList();
                if (this.subscription$) {
                    this.subscription$.destroy();
                }
            } else {
                this._message.info(res.msg);
            }
        });
    }

    editItem(item) {
        let requestArgs = new RequestArgs();
        requestArgs.header = {'ticket': sessionStorage.getItem('ticket'), 'Content-Type': 'application/json'};
        requestArgs.url = "/employee_terminal/api/save_or_update";
        requestArgs.systemName = "wlanscope";
        requestArgs.body = {
            id: item.id,
            macAddr: item.macAddr,
            equipmentNumber: item.equipmentNumber,
            equipmentType: item.equipmentType,
            empId: item.empId,
            deptId: item.deptId
        };
        this.http.httpPost(requestArgs).subscribe(res => {
            if (res.code === 0) {
                this._message.info(res.msg);
                this.getTableList();
                if (this.subscription$) {
                    this.subscription$.destroy();
                }
            } else {
                this._message.info(res.msg);
            }
        });
    }

    delItems(ids) {
        let requestArgs = new RequestArgs();
        requestArgs.header = {'ticket': sessionStorage.getItem('ticket'), 'Content-Type': 'application/json'};
        requestArgs.url = "/employee_terminal/api/delete/list";
        requestArgs.systemName = "wlanscope";
        requestArgs.body = ids;
        this.http.httpDelete(requestArgs).subscribe(res => {
            if (res.code === 0) {
                this._message.info(res.msg);
                this.getTableList();
            } else {
                this._message.info(res.msg);
            }
        });
    }

    getDeptDropDownList() {
        let requestArgs = new RequestArgs();
        requestArgs.header = {'ticket': sessionStorage.getItem('ticket'), 'Content-Type': 'application/json'};
        requestArgs.url = "/department/api/display/list";
        requestArgs.systemName = "wlanscope";
        this.http.httpGet(requestArgs).subscribe(res => {
            if (res.code === 0) {
                let tmp = [];
                for (let obj of res.result) {
                    tmp.push(<DropDownsInterface> {id: obj['id'], name: obj['deptName']});
                }
                this.deptDropDownList = tmp;
            } else if (res.code === 9) {
                this.deptDropDownList = [];
            } else {
                this._message.info(res.msg);
            }
        });
    }

    getEmpDropDownList() {
        let requestArgs = new RequestArgs();
        requestArgs.header = {'ticket': sessionStorage.getItem('ticket'), 'Content-Type': 'application/json'};
        requestArgs.url = "/employee/api/query/list";
        requestArgs.systemName = "wlanscope";
        this.http.httpGet(requestArgs).subscribe(res => {
            if (res.code === 0) {
                let tmp = [];
                for (let obj of res.result) {
                    tmp.push(<DropDownsInterface> {id: obj['id'], name: obj['empName']});
                }
                this.empDropDownList = tmp;
            } else if (res.code === 9) {
                this.empDropDownList = [];
            } else {
                this._message.info(res.msg);
            }
        });
    }

    /**
     * 下载数据服务
     * @param {StaffBasicInfoModel} item
     */
    DownLoadDataFile() {
        let requestArgs = new RequestArgs();
        requestArgs.header = {'ticket': sessionStorage.getItem('ticket'), 'Content-Type': 'application/json'};
        requestArgs.url = "/authentication/api/query/all";
        requestArgs.systemName = "wlanscope";
        this.http.httpPost(requestArgs).subscribe(res => {
            this.JSONToEXCELConvertor(res.result, "访客认证记录");
        });
    }

    JSONToEXCELConvertor(JSONData, ReportTitle) {
        let array = [];
        for (let tmpItem of JSONData) {
            let tmp = {
                "mac地址": tmpItem["mac"], "电话号": tmpItem["tel"], "nasId": tmpItem["nasId"],
                "ssidName": tmpItem["ssidName"], "设备类型": tmpItem["deviceType"], "是否允许经过认证": tmpItem["authenticationResult"],
                "认证状态": tmpItem["authenticationStatus"], "创建时间": tmpItem["createTime"], "更新时间": tmpItem["updateTime"]
            };
            array.push(tmp);
        }
        let json = typeof array !== 'object' ? JSON.parse(array) : array;

        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
        const workbook: XLSX.WorkBook = {Sheets: {'data': worksheet}, SheetNames: ['data']};
        const excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
        // 这里类型如果不正确，下载出来的可能是类似xml文件的东西或者是类似二进制的东西等
        this.saveAsExcelFile(excelBuffer, ReportTitle);
    }

    private saveAsExcelFile(buffer: any, fileName: string) {
        const data: Blob = new Blob([buffer], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'});
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + '.xls');
    }
}
