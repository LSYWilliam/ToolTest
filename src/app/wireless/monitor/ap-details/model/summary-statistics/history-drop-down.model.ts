import {DropDownsInterface} from "../../../../../shared/component/dropdown/model/dropdowns.model";

export class HistoryDropDownModel {

    /** 摘要统计-历史数据-日期类型选择框 */
    private _dropDowns: Array<DropDownsInterface>;

    get dropDowns(): Array<DropDownsInterface> {
        return this._dropDowns;
    }

    set dropDowns(value: Array<DropDownsInterface>) {
        this._dropDowns = value;
    }
}
