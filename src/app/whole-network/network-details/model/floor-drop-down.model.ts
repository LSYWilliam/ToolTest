import {DropDownsInterface} from '../../../shared/component/dropdown/model/dropdowns.model';

export class FloorDropDownModel {

    /** 楼层选择下拉框 */
    private _dropDowns: Array<DropDownsInterface>;

    get dropDowns(): Array<DropDownsInterface> {
        return this._dropDowns;
    }

    set dropDowns(value: Array<DropDownsInterface>) {
        this._dropDowns = value;
    }
}
