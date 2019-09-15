import {Injectable, ViewChild} from '@angular/core';
import {ZorroTableComponent} from "../../../../../shared/component/zorro-table/zorro-table.component";
import {HttpClientService} from "../../../../../shared/service/httpClient.service";
import {RequestArgs} from "../../../../../shared/model/request-args";
import {DailyStatisticsHeadModel} from "../model/daily-statistics-head.model";
import {NzMessageService} from "ng-zorro-antd";
import * as moment from "moment";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

@Injectable()
export class DailyStatisticsService {
    @ViewChild(ZorroTableComponent) child: ZorroTableComponent;
    tableInput: any;
    srcRequestArgs: any;
    requestArgs: RequestArgs = new RequestArgs();
    metaData: any;
    _date: Date;

    constructor(private http: HttpClientService, public _message: NzMessageService) {
        this.tableInput = new DailyStatisticsHeadModel().tableInput;
        this.metaData = new DailyStatisticsHeadModel().metaData;
        this.srcRequestArgs = new RequestArgs();
        this.srcRequestArgs.header = {'ticket': sessionStorage.getItem('ticket'), 'Content-Type': 'application/json'};
        this.srcRequestArgs.url = "/collect_result/api/find/by/day";
        this.srcRequestArgs.systemName = "attendance";
        let yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        this._date = new Date();
        this.srcRequestArgs.body = {"dayTime": moment(this._date).format("YYYY-MM-DD")};
    }

    /**
     * 下载数据服务
     * @param {StaffBasicInfoModel} item
     */
    DownLoadDataFile() {
        this.requestArgs.url = '/collect_result/api/find/by/day';
        this.requestArgs.systemName = "attendance";
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket'), 'Content-Type': 'application/json'};
        this.requestArgs.body = {
            'pageNo': 0,
            'pageSize': 10000,
            "dayTime": this.srcRequestArgs.body.dayTime
        };

        this.http.httpPost(this.requestArgs).subscribe(res => {
            // this.JSONToCSVConvertor(res.result, "考勤每日统计情况", true);
            this.JSONToEXCELConvertor(res.result, "考勤每日统计情况");
        });
    }

    /**
     * 将JSON转化成SCV格式
     * @param JSONData 数据
     * @param ReportTitle 标题
     * @param ShowLabel 是否展示数据栏
     * @constructor
     */
    JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
        let arrData = typeof JSONData !== 'object' ? JSON.parse(JSONData) : JSONData;
        let CSV = 'data:text/csv;charset=utf-8,\ufeff';
        CSV += ReportTitle + '\r\n\n';
        if (ShowLabel) {
            let row = "用户名" + ',' + "所在部门" + ',' + "用户手机" + ',' + "班次" + ',' + "日期" + ',' + "星期" + ','
                + "状态" + ',' + "在线时长" + ',' + "上班打卡时间" + ',' + "上班打卡结果" + ',' + "下班打卡时间" + ',' + "下班打卡结果" + ',';
            row = row.slice(0, -1);
            CSV += row + '\r\n';
        }
        for (let i = 0; i < arrData.length; i++) {
            let row = "";
            row += '"' + arrData[i].usrRealName + '","' + arrData[i].partName + '","' + arrData[i].usrMobile + '","'
                + arrData[i].collectFlightsDesc + '","' + arrData[i].collectDay + '","' + arrData[i].collectDayWeekName + '","'
                + arrData[i].collectStatus + '","' + arrData[i].collectWorkTime + '","' + arrData[i].collectStartTime + '","'
                + arrData[i].collectStartResult + '","' + arrData[i].collectEndTime + '","' + arrData[i].collectEndResult + '",';
            row.slice(0, row.length - 1);
            CSV += row + '\r\n';
        }

        if (CSV === '') {
            alert("Invalid data");
            return;
        }

        let fileName = "员工信息列表.csv";
        if (window.navigator.msSaveOrOpenBlob) {
            // if browser is IE
            let blob = new Blob([decodeURIComponent(encodeURI(CSV))], {
                type: "text/csv;charset=utf-8;"
            });
            navigator.msSaveBlob(blob, fileName);
        } else {
            let encodedUri = encodeURI(CSV);
            let link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", fileName);
            document.body.appendChild(link);
            link.click();
        }
    }

    JSONToEXCELConvertor(JSONData, ReportTitle) {
        // this.empMgmtDataModel.list
        // let json = JSONData;
        let array = [];
        for (let tmpItem of JSONData) {
            let tmp = {
                "用户名": tmpItem["usrRealName"], "所在部门": tmpItem["partName"], "用户手机": tmpItem["usrMobile"],
                "班次": tmpItem["collectFlightsDesc"], "日期": tmpItem["collectDay"], "星期": tmpItem["collectDayWeekName"],
                "状态": tmpItem["collectStatus"], "在线时长": tmpItem["collectWorkTime"], "上班打卡时间": tmpItem["collectStartTime"],
                "上班打卡结果": tmpItem["collectStartResult"], "下班打卡时间": tmpItem["collectEndTime"], "下班打卡结果": tmpItem["collectEndResult"]
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
