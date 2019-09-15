import {Component, EventEmitter, OnChanges, OnInit, Output} from '@angular/core';
import {RequestArgs} from "../../../../../../shared/model/request-args";
import {HttpClientService} from "../../../../../../shared/service/httpClient.service";

/**
 * table效果组件
 * @class ThreeLinkComponent
 */

@Component({
    selector: 'app-link-list',
    templateUrl: './area.component.html',
    styleUrls: ['./area.component.scss']
})
export class LinkComponent implements OnInit, OnChanges {
    /**具体的 省 值*/
    public valueProvinces: any;
    /**省下拉框列表值*/
    public searchOptionsProvinces: any;
    /**具体的 市 值*/
    public valueCities: any;
    /**市下拉框列表值*/
    public selectedOptionCities: any;

    /**输出组件中的省市区内容*/
    @Output() public outData: EventEmitter<any> = new EventEmitter<any>();

    public requestArgs: RequestArgs = new RequestArgs();
    constructor(public http: HttpClientService) {
    }


    /**省下拉框*/
    provinceSearch(value) {
        this.getAreaData(value.regionCode).subscribe(res => {
           if (res.code === 0) {
               let obj = {
                   "regionCode": "9_1_1_1_1_1",
                   "parentRegionCode": "9_1_1_1_1_1",
                   "regionName": "不限",
                   "regionSqlName": "不限区域",
                   "regionSort": 9999999,
                   "regionStatus": 11111111
               };
               let arr = res.result;
                this.selectedOptionCities =arr.unshift(obj);
               this.selectedOptionCities =arr;
               this.valueCities = this.selectedOptionCities[0];
               this.outData.emit([this.valueProvinces,this.valueCities]);
           }
        });

    }
    /**市下拉框*/
    citiesSearch() {
        this.outData.emit([this.valueProvinces,this.valueCities]);
    }
    /**获取省的数据*/

        /**js统计字符串中包含的特定字符个数*/
     getPlaceholderCount(strSource) {
            let num=0;
            for (let i = 0, length = strSource.length; i < length; i++) {
                let char = strSource.charAt(i);
                if (char === '_') {
                    ++num;
                }
            }
            return num;
    }


    getProvince(value) {
        let provincesAarray = [];
        if (value) {
            for ( let p of value) {
                if (this.getPlaceholderCount(p.parentRegionCode) === 0) {
                    provincesAarray.push(p);
                }
            }
        }
        return provincesAarray;
    }

    /**实时监听此组件的内容是否有变化
     *      1. 获取具体的省市区及其对应省市区下拉框下面列表的值
     * */
    ngOnChanges(): void {

    }
    /**获取区域数据*/
    getAreaData(value) {
        this.requestArgs.systemName = 'sensation';
        this.requestArgs.header = {'ticket': sessionStorage.getItem('ticket')};
        this.requestArgs.url = "/crawler/crawler-common-info/find-region";
        this.requestArgs.body = {
            "parentCode": value
        };
        return this.http.httpPost(this.requestArgs);
    }
    /**初始化页面数据*/
    ngOnInit() {
        let value= '';
        this.getAreaData(value).subscribe(res => {
            this.searchOptionsProvinces = this.getProvince(res.result);
        });
    }
}
