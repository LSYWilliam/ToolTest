import {DropDownsInterface} from "../../../../shared/component/dropdown/model/dropdowns.model";

export class BusinessDropDownModel {

    /** 网络下拉选择框 */
    private _dropDowns: Array<DropDownsInterface>;
    private _veriosnDropDowns: Array<DropDownsInterface>;
    private _switchVeriosnDropDowns: Array<DropDownsInterface>;

    get dropDowns(): Array<DropDownsInterface> {
        return this._dropDowns;
    }

    set dropDowns(value: Array<DropDownsInterface>) {
        this._dropDowns = value;
    }

    get veriosnDropDowns(): Array<DropDownsInterface> {
        return this._veriosnDropDowns;
    }

    set veriosnDropDowns(value: Array<DropDownsInterface>) {
        this._veriosnDropDowns = value;
    }

    get switchVeriosnDropDowns(): Array<DropDownsInterface> {
        return this._switchVeriosnDropDowns;
    }

    set switchVeriosnDropDowns(value: Array<DropDownsInterface>) {
        this._switchVeriosnDropDowns = value;
    }
}
