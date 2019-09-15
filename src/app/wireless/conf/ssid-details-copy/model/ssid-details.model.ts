import {SsidInfoModel} from "./ssid-info.model";
import {DropDownsInterface} from "../../../../shared/component/dropdown/model/dropdowns.model";

export class SsidDetailsModel {
    /**下拉框接口*/
    private _dropDowns : Array<DropDownsInterface>;
    /**SSID列表数据*/
    private _ssidListData: Array<SsidInfoModel>;
    /**获取下拉列表数据*/
    get dropDowns(): Array<DropDownsInterface> {
        return this._dropDowns;
    }
    /**设置下拉列表数据*/
    set dropDowns(value: Array<DropDownsInterface>) {
        this._dropDowns = value;
    }
    /**获取ssid清单数据*/
    get ssidListData(): Array<SsidInfoModel> {
        return this._ssidListData;
    }
    /**设置ssid清单数据*/
    set ssidListData(value: Array<SsidInfoModel>) {
        this._ssidListData = value;
    }
}
