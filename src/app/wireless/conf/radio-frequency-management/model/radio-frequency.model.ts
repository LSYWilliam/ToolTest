import {DropDownsInterface} from "../../../../shared/component/dropdown/model/dropdowns.model";
import {AllRadioFreqModel} from "../../../../shared/model/all-radio-freq.model";
/**
 * 射频管理实体类
 * */
export class RadioFrequencyModel {
    /**下拉框接口*/
    private _dropDowns : Array<DropDownsInterface>;
    /**射频全局配置实体类*/
    private _globalConf: AllRadioFreqModel = new AllRadioFreqModel();
    /**table表格数据*/
    private _tableData : any;
    /**获取下拉框数据*/
    get dropDowns(): Array<DropDownsInterface> {
        return this._dropDowns;
    }
    /**设置下拉框数据*/
    set dropDowns(value: Array<DropDownsInterface>) {
        this._dropDowns = value;
    }
    /**获取射频全局配置数据*/
    get globalConf(): AllRadioFreqModel {
        return this._globalConf;
    }
    /**设置射频全局配置数据*/
    set globalConf(value: AllRadioFreqModel) {
        this._globalConf = value;
    }
    /**获取表格数据*/
    get tableData(): any {
        return this._tableData;
    }
    /**设置表格数据*/
    set tableData(value: any) {
        this._tableData = value;
    }
}
