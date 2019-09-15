
import {AllRadioFreqModel} from "../../../../shared/model/all-radio-freq.model";
import {DropDownsInterface} from "../../../../shared/component/dropdown/model/dropdowns.model";

export class RadioFrequencyModel {
    /** 无线电配置-下拉框 */
    private _dropDowns: Array<DropDownsInterface>;
    /** 无线电配置-2.4GHz配置，5GHz配置 */
    private _globalConf: AllRadioFreqModel = new AllRadioFreqModel();

    get dropDowns(): Array<DropDownsInterface> {
        return this._dropDowns;
    }

    set dropDowns(value: Array<DropDownsInterface>) {
        this._dropDowns = value;
    }

    get globalConf(): AllRadioFreqModel {
        return this._globalConf;
    }

    set globalConf(value: AllRadioFreqModel) {
        this._globalConf = value;
    }
}
