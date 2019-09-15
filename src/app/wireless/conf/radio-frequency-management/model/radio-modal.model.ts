import {GlobalRadioFreqModel} from "../../../../shared/component/radioFrequency/model/global-radio-freq.model";
import {RadioFreqConf} from "../../../../shared/static-data/radio-freq-conf";
import {DropDownsInterface} from "../../../../shared/component/dropdown/model/dropdowns.model";

export class RadioModalModel extends GlobalRadioFreqModel {
    /**场强阙值的接口*/
    private _rssiThreshold: Array<DropDownsInterface>;
    /**速率阙值的接口*/
    private _apRateThreshold: Array<DropDownsInterface>;

    private _channelWidth2: Array<DropDownsInterface>;

    private _channelWidth5: Array<DropDownsInterface>;

    constructor() {
        super();
        this.setThreshold();
    }
    /**设置阙值(场强阙值 或者 速率阙值 或者两者都有)*/
    private setThreshold() {
        const object = RadioFreqConf();
        for (let obj in object) {
            if ("rssiThreshold" === obj) {
                this._rssiThreshold = super.filterData(object['rssiThreshold']);
            }
            if ("apRateThreshold" === obj) {
                this._apRateThreshold = super.filterData(object['apRateThreshold']);
            }
            // if("channelWidth2" === obj) {
            //     this._channelWidth2 = super.filterData(object['11nChannelWidth2']);
            // }
            // if("channelWidth5" === obj) {
            //     this._channelWidth5 = super.filterData(object['11nChannelWidth5']);
            // }
        }
    }

    /**获取场强阙值*/
    get rssiThreshold(): Array<DropDownsInterface> {
        return this._rssiThreshold;
    }
    /**设置场强阙值*/
    set rssiThreshold(value: Array<DropDownsInterface>) {
        this._rssiThreshold = value;
    }
    /**获取速率阙值*/
    get apRateThreshold(): Array<DropDownsInterface> {
        return this._apRateThreshold;
    }
    /**设置速率阙值*/
    set apRateThreshold(value: Array<DropDownsInterface>) {
        this._apRateThreshold = value;
    }

    get channelWidth2(): Array<DropDownsInterface> {
        return this._channelWidth2;
    }

    set channelWidth2(value: Array<DropDownsInterface>) {
        this._channelWidth2 = value;
    }

    get channelWidth5(): Array<DropDownsInterface> {
        return this._channelWidth5;
    }

    set channelWidth5(value: Array<DropDownsInterface>) {
        this._channelWidth5 = value;
    }
}
