import {DropDownsInterface} from "../../../../../shared/component/dropdown/model/dropdowns.model";

export class AccessTypeModel {
    private _dropDowns: Array<DropDownsInterface>;

    constructor() {
        this._dropDowns = [];
    }

    get dropDowns(): Array<DropDownsInterface> {
        return this._dropDowns;
    }

    set dropDowns(value: Array<DropDownsInterface>) {
        this._dropDowns = value;
    }
}
