import {QueryDataModel} from "./query-data.model";
import * as moment from 'moment';

export class SearchModel{
    teId: number;
    pageSize: number;
    pageNo: number;
    teRegion: string;
    teIndustry: string;
    teRecMonth: number;
    teBeginTime: string;
    teEndTime: string;
    teType: string;

    constructor(queryPara: QueryDataModel, topicID: number) {
        this.teId = topicID;

        if (queryPara.dateRadioValue === 'A') {
            this.teRecMonth = 1;
        } else {
            this.teRecMonth = 0;
            this.teBeginTime = moment(queryPara.dateRange[0]).format("YYYY-MM-DD");
            this.teEndTime = moment(queryPara.dateRange[1]).format("YYYY-MM-DD");
        }

        let typeList: any = [];
        queryPara.typeCheckOptions.forEach( val => { if (val.checked) { typeList.push(val.label); } });

        // this.teType = queryPara.typeCheckOptions.length === 4 ?  "" : typeList.toString();
        if (typeList) {
            this.teType = typeList.length === 4 ?  "" : typeList.toString();
        }

        let industryList: any = [];
        queryPara.industryCheck.forEach( val => {
            if (val.checked) {
                industryList.push(val.label);
            }
        });
        this.teIndustry = industryList.toString();

        let areaList: any = [];
        queryPara.areaCheck.forEach( val => {
            if (val.checked) {
                areaList.push(val.label);
            }
        });
        this.teRegion = areaList.toString();
    }

    public toJson() {
        return {
            "teId" : this.teId,
            "pageSize": this.pageSize,
            "pageNo": this.pageNo,
            "teRegion": this.teRegion,
            "teIndustry": this.teIndustry,
            "teRecMonth": this.teRecMonth,
            "teBeginTime": this.teBeginTime,
            "teEndTime": this.teEndTime,
            "teType": this.teType
        }
    }
}
