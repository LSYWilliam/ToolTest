import {Injectable} from "@angular/core";
import {HttpClientService} from "../../../../shared/service/httpClient.service";
import {RequestArgs} from "../../../../shared/model/request-args";
import {BusinessInfomationInterface} from "../model/business-infomation.interface";
import {RegisterInfoModel} from "../model/register-info.model";

@Injectable()
export class BusinessInformationService {
    /**http请求*/
    public requestArgs: RequestArgs = new RequestArgs();
    public registerInfo : RegisterInfoModel = new RegisterInfoModel();
    /**企业信息table表格行数据*/
    public tableData: any;
    /**企业信息点击查看按钮的用户table表格行数据*/
    public userTableData: any;
    /**商家Id*/
    public businessId: any;
    /**用户信息列表总数*/
    public userTotal: number;

    constructor(private http: HttpClientService) {
        this.requestArgs.systemName = 'wlanscope';
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket'),'Content-Type':'application/json;charset=UTF-8'};
    }

    /**
     * 商户详细信息查询
     */
    protected getRegisterInfo() {
        this.requestArgs.url = "/api/v1/businesses/detail";
        this.http.httpGet(this.requestArgs).subscribe(
            res => {
                if (res.code === 0) {
                    this.registerInfo.setData(<BusinessInfomationInterface> res.result);
                    this.requestArgs.url = "/api/v1/ap_info/" + this.registerInfo.businessId + "/list";
                    this.businessId = this.registerInfo.businessId;
                    this.http.httpGet(this.requestArgs).subscribe(
                        res2 => {
                            if (res2.code === 0) {
                                this.tableData = res2.result;
                                this.registerInfo.apNum = res2.pagination['totalElements'];
                            } else if(res2.code === 9) {
                                if (res2.result.length===0) {
                                    this.tableData = [];
                                }
                                this.registerInfo.apNum = res2.pagination['totalElements'];
                            }
                        }
                    );
                    this.getUserList(this.businessId);
                }
            }
        );
    }
    /**
     * 获取用户列表table表格数据
     * */
    protected getUserList(businessId) {
        let pRequestArgs: RequestArgs = new RequestArgs();
        pRequestArgs.systemName = 'system';
        pRequestArgs.header = {'ticket': sessionStorage.getItem('ticket'),'Content-Type':'application/json;charset=UTF-8'};
        pRequestArgs.url="/ewifi/system/console/user/user_list";
        pRequestArgs.body = {
            "businessId":businessId
        };
        this.http.httpPost(pRequestArgs).subscribe(
            res => {
                if (res.code === 0) {
                    this.userTableData = res.result;
                    this.userTableData.forEach( ult=> {
                        ult.latestLoginTime=this.toDateString(new Date(ult.latestLoginTime));
                    });
                    this.userTotal=res.result.length;
                }
            }
        );
    }

    /**
     * 将毫秒数转化为时间格式的方法函数
     * @param {Date} p_date
     * @returns {string}
     */
    protected toDateString(p_date:Date) {
        if(typeof p_date === "undefined" || p_date.toString() === new Date(0).toString()) {
            return "";
        }
        let year=p_date.getFullYear();
        let p_month=p_date.getMonth()+1;
        let p_day=p_date.getDate();
        let p_hour=p_date.getHours();
        let p_minute=p_date.getMinutes();
        let p_second=p_date.getSeconds();

        return year+"-"+(p_month.toString().length<2?"0"+p_month:p_month)
            +"-"+(p_day.toString().length<2?"0"+p_day:p_day)
            +" "+(p_hour.toString().length<2?"0"+p_hour:p_hour)
            +":"+(p_minute.toString().length<2?"0"+p_minute:p_minute)
            +":"+(p_second.toString().length<2?"0"+p_second:p_second);
    }
}
