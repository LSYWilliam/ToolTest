import {DropDownsInterface} from "../../../../../shared/component/dropdown/model/dropdowns.model";

export class NetworkListModel {
    /**商户列表下拉框 接口*/
    private _dropDowns: Array<DropDownsInterface>;
    /**获取商户列表下拉框 数据*/
    get dropDowns(): Array<DropDownsInterface> {
        return this._dropDowns;
    }
    /**设置商户列表下拉框 数据*/
    set dropDowns(value: Array<DropDownsInterface>) {
        this._dropDowns = value;
    }
}
