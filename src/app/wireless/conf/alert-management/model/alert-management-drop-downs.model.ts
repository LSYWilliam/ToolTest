import {DropDownsInterface} from "../../../../shared/component/dropdown/model/dropdowns.model";

export class AlertManagementDropDownsModel {
    private _dropDowns: Array<DropDownsInterface>;


    get dropDowns(): Array<DropDownsInterface> {
        return this._dropDowns;
    }

    set dropDowns(value: Array<DropDownsInterface>) {
        this._dropDowns = value;
    }
}
