import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {ThreeLinkModel} from "./model/three-link.model";

/**
 * table效果组件
 * @class ThreeLinkComponent
 */

@Component({
    selector: 'app-three-link-list',
    templateUrl: './three-link.component.html',
    styleUrls: ['./three-link.component.scss']
})
export class ThreeLinkComponent implements OnInit, OnChanges {
    /**具体的 省 值*/
    public valueProvinces: any;
    /**省下拉框列表值*/
    public searchOptionsProvinces: any;
    /**具体的 市 值*/
    public valueCities: any;
    /**市下拉框列表值*/
    public selectedOptionCities: any;
    /**具体的 区 值*/
    public valueAreas: any;
    /**区下拉框列表值*/
    public selectedOptionAreas: any;
    /**三级联动实体类*/
    public threeLinkModel : ThreeLinkModel = new ThreeLinkModel;
    /**从父组件获取全国所有的省市区*/
    @Input() public threeLinkData : any;
    /**从父组件获取具体的省*/
    @Input() public provinceLink : any;
    /**从父组件获取具体的市*/
    @Input() public cityLink : any;
    /**从父组件获取具体的区*/
    @Input() public areaLink : any;
    /**输出组件中的省市区内容*/
    @Output() public outData: EventEmitter<any> = new EventEmitter<any>();
    constructor() {
    }
    /** 省市区联动效果*/
    proAndCityAndArea(value) {
        if (value) {
            let array = [];
            for ( let p of this.threeLinkData) {
                if (value.id == p.parentId) {
                    array.push(p);
                }
            }
            return array;
        }
    }
    /**省下拉框*/
    provinceSearch() {
        this.threeLinkModel.province = this.valueProvinces;
        this.selectedOptionCities = this.proAndCityAndArea(this.valueProvinces);
        this.valueCities = null;
        this.threeLinkModel.city = null;
        this.selectedOptionAreas = this.proAndCityAndArea(this.selectedOptionCities[0]);
        this.valueAreas = null;
        this.threeLinkModel.area = null;
        this.outData.emit(JSON.stringify(this.threeLinkModel));
    }
    /**市下拉框*/
    citiesSearch() {
        this.threeLinkModel.city = this.valueCities;
        this.selectedOptionAreas = this.proAndCityAndArea(this.valueCities);
        this.valueAreas = null;
        this.threeLinkModel.area = null;
        this.outData.emit(JSON.stringify(this.threeLinkModel));
    }
    /**区下拉框*/
    areaSearch() {
        this.threeLinkModel.area = this.valueAreas;
        this.outData.emit(JSON.stringify(this.threeLinkModel));
    }
    /**获取省的数据*/
    getProvince(value) {
        let provincesAarray = [];
        if (value) {
            for ( let p of value) {
                if (p.type === 2) {
                    provincesAarray.push(p);
                }
            }
        }
        return provincesAarray;
    }
    /** 获取省市区框里面的值*/
    getProAndCityAndAreas(value) {
        let result;
        if (this.threeLinkData) {
            for ( let p of this.threeLinkData) {
                if (p.name === value) {
                    result = p;
                    break;
                }
            }
        }
        return result;
    }
    /**实时监听此组件的内容是否有变化
     *      1. 获取具体的省市区及其对应省市区下拉框下面列表的值
     * */
    ngOnChanges(): void {
        /**省*/
        this.searchOptionsProvinces = this.getProvince(this.threeLinkData);
        this.valueProvinces = this.getProAndCityAndAreas(this.provinceLink);
        this.selectedOptionCities = this.proAndCityAndArea(this.valueProvinces);
        if (this.provinceLink !== this.cityLink) {
            /**市*/
            this.valueCities = this.getProAndCityAndAreas(this.cityLink);
        } else {
            /**市*/
            if (this.selectedOptionCities) {
                this.valueCities = this.selectedOptionCities[0];
            }
        }
        /**区*/
        this.selectedOptionAreas = this.proAndCityAndArea(this.valueCities);
        this.valueAreas = this.getProAndCityAndAreas(this.areaLink);
    }
    /**初始化页面数据*/
    ngOnInit() {

    }
}
