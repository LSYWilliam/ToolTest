import {Injectable, ViewChild} from '@angular/core';
import {ZorroTableComponent} from "../../../../../shared/component/zorro-table/zorro-table.component";
import {HttpClientService} from "../../../../../shared/service/httpClient.service";
import {RequestArgs} from "../../../../../shared/model/request-args";
import {MonthlySummaryHead} from "../model/monthly-summary-head.model";
import {NzMessageService, NzModalService, NzModalSubject} from "ng-zorro-antd";
import {MothlyUserDetailModalComponent} from "../component/mothly-user-detail-modal/mothly-user-detail-modal.component";
import * as moment from "moment";
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

declare let calendar: any;

@Injectable()
export class MonthlySummaryService {
    @ViewChild(ZorroTableComponent) child: ZorroTableComponent;
    srcRequestArgs: any;
    requestArgs: RequestArgs = new RequestArgs();
    tableInput: any;
    metaData: any;
    monthlySummaryHead: MonthlySummaryHead;
    _searchMonth = null;

    /**订阅模态框*/
    subscription$: NzModalSubject;

    constructor(public http: HttpClientService, public modalService: NzModalService, public _message: NzMessageService) {
        this._searchMonth = new Date();
        this.monthlySummaryHead = new MonthlySummaryHead(this.openModal,
            this.getLastDay(this._searchMonth),
            this.getHoliday(this._searchMonth),
            this.editStatus, this.http);
        this.tableInput = this.monthlySummaryHead.tableInput;
        this.metaData = this.monthlySummaryHead.metaData;

        this.srcRequestArgs = new RequestArgs();
        this.srcRequestArgs.header = {'ticket': sessionStorage.getItem('ticket'), 'Content-Type': 'application/json'};
        this.srcRequestArgs.url = "/collect_result/api/find/by/month";
        this.srcRequestArgs.systemName = "attendance";
        this.srcRequestArgs.body = {
            "month": moment(this._searchMonth).format("YYYY-MM")
        };
    }

    /**
     * 页面点击事件
     * @param res
     */
    openModal = (res, flag) => {
        let status;
        switch (flag) {
            case "onNumber":
                status = "出勤";
                break;
            case "lateNumber":
                status = "迟到";
                break;
            case "leaveNumber":
                status = "早退";
                break;
            case "absentNumber":
                status = "旷工";
                break;
            case "abnormalNumber":
                status = "异常";
                break;
        }
        this.getUserDetailInfo(res.userId, status);
    };

    /**
     * 获取用户细节数据
     * @param usrName
     */
    getUserDetailInfo(userId, status) {
        this.requestArgs = new RequestArgs();
        this.requestArgs.url = "/collect_result/api/find/detail/by/status";
        this.requestArgs.systemName = "attendance";
        this.requestArgs.body = {
            "userId": userId,
            "month": moment(this._searchMonth).format("YYYY-MM"),
            "status": status,
            "pageSize": 99
        };
        this.showModal("出勤详情", this.requestArgs);
    }

    /**
     * 初识化模态框
     * @param modalTitleFlag
     * @param element
     */
    showModal(modalTitleFlag, element) {
        if(this.subscription$) {
            this.subscription$.destroy();
        }
        /**打开模态框*/
        let modalConfig = {
            title: modalTitleFlag,
            content: MothlyUserDetailModalComponent,
            onOk() {
            },
            onCancel() {
            },
            width: '95%',
            footer: false,
            maskClosable: false,
            componentParams: {
                srcRequestArgs: element,
                modalTitleName: modalTitleFlag
            }
        };
        this.subscription$ = this.modalService.open(modalConfig);
    }

    getLastDay(date) {
        let new_year = parseInt(moment(date).format("YYYY"), 0);
        let new_month = parseInt(moment(date).format("MM"), 0) + 1;
        if (parseInt(moment(date).format("MM"), 0) > 12) {
            new_month -= 12;
            new_year++;
        }
        let new_date = new Date(new_year, new_month, 1);
        console.log((new Date(new_date.getTime() - 1000 * 60 * 60 * 24)).getDate());
        return (new Date(new_date.getTime() - 1000 * 60 * 60 * 24)).getDate();// 获取当月最后一天日期  
    }

    getHoliday(date) {
        let new_year = parseInt(moment(date).format("YYYY"), 0);
        let holiday = this.getYearHoliday(new_year);
        let year = moment(date).format("YYYY");
        let month = moment(date).format("MM");
        let tmp_array = [];
        for (let i = 1; i <= this.getLastDay(date); i++) {
            let tmp_date = {};
            tmp_date["week"] = getWeek(i <= 9 ? "0" + i : "" + i);
            if (!isWorkday(i <= 9 ? "0" + i : "" + i)) {
                tmp_date["holidayFlag"] = true;
            } else {
                tmp_date["holidayFlag"] = false;
            }
            tmp_array[i] = tmp_date;
        }

        function isWorkday(p_date) {
            let tmp_date = year + "-" + month + "-" + p_date;
            let isWorkdayFlag = false;
            // 判断是星期几
            switch (new Date(tmp_date).getDay()) {
                case 0:
                case 6:
                    isWorkdayFlag = false;
                    break;
                default:
                    isWorkdayFlag = true;
                    break;
            }
            // 判断节日
            holiday.forEach(res => {
                if (res === tmp_date) {
                    isWorkdayFlag = false;
                    return;
                }
            });
            return isWorkdayFlag;
        }

        function getWeek(p_date) {
            let tmp_date = year + "-" + month + "-" + p_date;
            switch (new Date(tmp_date).getDay()) {
                case 0:
                    return "周日";
                case 1:
                    return "周一";
                case 2:
                    return "周二";
                case 3:
                    return "周三";
                case 4:
                    return "周四";
                case 5:
                    return "周五";
                case 6:
                    return "周六";
            }
        }

        return tmp_array;
    }

    editStatus(value, data, flag) {
        let requestArgs = new RequestArgs();
        requestArgs.header = {'ticket': sessionStorage.getItem('ticket'), 'Content-Type': 'application/json'};
        requestArgs.url = "/collect_result/api/update/day_status";
        requestArgs.systemName = "attendance";
        requestArgs.body = {
            "userId": data.userId,
            "month": moment(this._searchMonth).format("YYYY-MM"),
            "day": parseInt(flag.replace("status", ""), 0),
            "status": value
        };
        this.http.httpPost(requestArgs).subscribe(res => {
            if (res.code === 0) {
                this.child.refreshData(false);
                this._message.create('info', res.msg);
            } else {
                this._message.create('info', res.msg);
            }
        });
    }

    dropDownOutputData(value) {
        console.log(value);
        this.editStatus(value.value, value.data, value.flag);
    }

    getYearHoliday(year) {
        let tmpHoliday = [];
        tmpHoliday.push(`${year}-01-01`);
        let yearEveDate = new Date(new Date(parseLunar2String(calendar.lunar2solar(year, 1, 1))).getTime() - 24 * 60 * 60 * 1000);
        let yearEve = moment(yearEveDate).format("YYYY-MM-DD");
        tmpHoliday.push(yearEve);
        tmpHoliday.push(parseLunar2String(calendar.lunar2solar(year, 1, 1)));
        tmpHoliday.push(parseLunar2String(calendar.lunar2solar(year, 1, 2)));
        tmpHoliday.push(`${year}-04-05`);
        tmpHoliday.push(`${year}-05-01`);
        tmpHoliday.push(parseLunar2String(calendar.lunar2solar(year, 5, 5)));
        tmpHoliday.push(parseLunar2String(calendar.lunar2solar(year, 8, 15)));
        tmpHoliday.push(`${year}-10-01`);
        tmpHoliday.push(`${year}-10-02`);
        tmpHoliday.push(`${year}-10-03`);
        tmpHoliday.push(`${year}-10-04`);
        tmpHoliday.push(`${year}-10-05`);
        tmpHoliday.push(`${year}-10-06`);
        tmpHoliday.push(`${year}-10-07`);
        console.log(tmpHoliday);

        function parseLunar2String(lunar):string {
            return lunar.cYear + "-" + (lunar.cMonth < 10 ? "0" + lunar.cMonth : lunar.cMonth) + "-" + (lunar.cDay < 10 ? "0" + lunar.cDay : lunar.cDay);
        }

        return tmpHoliday;
    }

    /**
     * 下载数据服务
     * @param {StaffBasicInfoModel} item
     */
    DownLoadDataFile() {
        let requestArgs = new RequestArgs();
        requestArgs.header = {'ticket': sessionStorage.getItem('ticket'), 'Content-Type': 'application/json'};
        requestArgs.url = "/collect_result/api/find/by/month";
        requestArgs.systemName = "attendance";
        requestArgs.body = {
            "month": moment(this._searchMonth).format("YYYY-MM"),
            "pageNo": 0,
            "pageSize": 10000
        };
        this.http.httpPost(requestArgs).subscribe(res => {
            this.JSONToEXCELConvertor(res.result, "考勤月度汇总");
        });
    }

    JSONToEXCELConvertor(JSONData, ReportTitle) {
        let array = [];
        for (let tmpItem of JSONData) {
            let tmp = {
                "用户名": tmpItem["usrRealName"], "所在部门": tmpItem["partName"], "用户手机": tmpItem["userMobile"],
                "出勤天数": tmpItem["onNumber"], "工作时长": tmpItem["workTime"], "迟到次数": tmpItem["lateNumber"],
                "早退次数": tmpItem["leaveNumber"], "旷工次数": tmpItem["absentNumber"], "异常考勤天数": tmpItem["abnormalNumber"]
            };
            for (let i = 1; i <= this.getLastDay(this._searchMonth); i++) {
                let p = i + "日";
                tmp[p] = tmpItem["status" + i];
            }
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
