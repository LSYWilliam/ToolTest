import {AllRadioFreqModel} from "../../../model/all-radio-freq.model";
import {RadioFreqConf} from "../../../static-data/radio-freq-conf";
import {DropDownsInterface} from "../../dropdown/model/dropdowns.model";
/**
 * 全网射频管理的2.4GHz和5GHz的全局数据实体类
 * */
export class GlobalRadioFreqModel {
    /**全网射频管理的2.4GHz的状态 开启 or 关闭*/
    private _config2gState: boolean;
    /**全网射频管理的2.4GHz的信道*/
    private _config2gChannel: Array<DropDownsInterface>;
    /**全网射频管理的2.4GHz的功率*/
    private _config2gPowerDbm: Array<DropDownsInterface>;
    /**全网射频管理的2.4GHz的信道宽度*/
    private _config2g11nChannelWidth: Array<DropDownsInterface>;
    /**全网射频管理的2.4GHz的空间流*/
    private _config2g11nSpace: Array<DropDownsInterface>;


    // private _spatitalFlow2: Array<DropDownsInterface>;
    /**全网射频管理的5GHz的状态 开启 or 关闭*/
    private _config5gState: boolean;
    /**全网射频管理的5GHz的信道*/
    private _config5gChannel: Array<DropDownsInterface>;
    /**全网射频管理的5GHz的功率*/
    private _config5gPowerDbm: Array<DropDownsInterface>;
    /**全网射频管理的5GHz的信道宽度*/
    private _config5g11nChannelWidth: Array<DropDownsInterface>;
    /**全网射频管理的5GHz的空间流*/
    private _config5g11nSpace: Array<DropDownsInterface>;


    // private _spatitalFlow5: Array<DropDownsInterface>;
    /**全网射频管理的漫游诱导*/
    private _roamingInductionValue: Array<DropDownsInterface>;

    constructor() {
        const object = RadioFreqConf();
        /**初始化全网射频管理2.4GHz，5GHz和漫游诱导的数据*/
        for (let obj in object) {
            if ("channel2" === obj) {
                this.config2gChannel = this.filterData(object['channel2']);
            }
            if ("channel5" === obj) {
                this.config5gChannel = this.filterData(object['channel5']);
            }
            if ("11nChannelWidth2" === obj) {
                this.config2g11nChannelWidth = this.filterData(object['11nChannelWidth2']);
            }
            if ("11nChannelWidth5" === obj) {
                this.config5g11nChannelWidth = this.filterData(object['11nChannelWidth5']);
            }

            if ("11nSpace2" === obj) {
                this.config2g11nSpace = this.filterData(object['11nSpace2']);
            }
            if ("11nSpace5" === obj) {
                this.config5g11nSpace = this.filterData(object['11nSpace5']);
            }


            // if ("spatitalFlow2" === obj) {
            //     this.spatitalFlow2 = this.filterData(object['spatitalFlow2']);
            // }
            // if ("spatitalFlow5" === obj) {
            //     this.spatitalFlow5 = this.filterData(object['spatitalFlow5']);
            // }


            if ("power" === obj) {
                let dropDown2 = this.filterData(object['power']);
                this.config2gPowerDbm = dropDown2;
                this.config5gPowerDbm = dropDown2;
            }
            if ("roamingInduction" === obj) {
                this.roamingInductionValue = this.filterData(object['roamingInduction']);
            }
        }
    }
    /**json格式数据转换
     *      1.将信道，信道宽度，功率和漫游诱导的进行转换
     *      2.举个例子，将{0:aa}转换成{id:0,name:aa}
     *      3.将转换后的json放到数组中
     *
     * */
    protected filterData(data: any): Array<DropDownsInterface> {
         let dropDowns : Array<DropDownsInterface> = [];
         for (let obj in data) {
             dropDowns.push(<DropDownsInterface> {id: obj, name: data[obj]});
        }
        return dropDowns;
    }
    /**获取全网射频管理的2.4GHz的状态*/
    get config2gState(): boolean {
        return this._config2gState;
    }
    /**设置全网射频管理的2.4GHz的状态*/
    set config2gState(value: boolean) {
        this._config2gState = value;
    }
    /**获取全网射频管理的5GHz的状态*/
    get config5gState(): boolean {
        return this._config5gState;
    }
    /**设置全网射频管理的5GHz的状态*/
    set config5gState(value: boolean) {
        this._config5gState = value;
    }
    /**获取全网射频管理的2.4GHz的信道*/
    get config2gChannel(): Array<DropDownsInterface> {
        return this._config2gChannel;
    }
    /**设置全网射频管理的2.4GHz的信道*/
    set config2gChannel(value: Array<DropDownsInterface>) {
        this._config2gChannel = value;
    }
    /**获取全网射频管理的2.4GHz的功率*/
    get config2gPowerDbm(): Array<DropDownsInterface> {
        return this._config2gPowerDbm;
    }
    /**设置全网射频管理的2.4GHz的信道*/
    set config2gPowerDbm(value: Array<DropDownsInterface>) {
        this._config2gPowerDbm = value;
    }
    /**获取全网射频管理的2.4GHz的信道宽度*/
    get config2g11nChannelWidth(): Array<DropDownsInterface> {
        return this._config2g11nChannelWidth;
    }
    /**设置全网射频管理的2.4GHz的信道宽度*/
    set config2g11nChannelWidth(value: Array<DropDownsInterface>) {
        this._config2g11nChannelWidth = value;
    }

    /**获取全网射频管理的2.4GHz的空间流*/
    get config2g11nSpace(): Array<DropDownsInterface> {
        return this._config2g11nSpace;
    }
    /**设置全网射频管理的2.4GHz的空间流*/
    set config2g11nSpace(value: Array<DropDownsInterface>) {
        this._config2g11nSpace = value;
    }


    // /**获取全网射频管理的2.4GHz的空间流*/
    // get spatitalFlow2(): Array<DropDownsInterface> {
    //     return this._spatitalFlow2;
    // }
    // /**设置全网射频管理的2.4GHz的空间流*/
    // set spatitalFlow2(value: Array<DropDownsInterface>) {
    //     this._spatitalFlow2 = value;
    // }
    /**获取全网射频管理的5GHz的信道*/
    get config5gChannel(): Array<DropDownsInterface> {
        return this._config5gChannel;
    }
    /**设置全网射频管理的5GHz的信道*/
    set config5gChannel(value: Array<DropDownsInterface>) {
        this._config5gChannel = value;
    }
    /**获取全网射频管理的5GHz的功率*/
    get config5gPowerDbm(): Array<DropDownsInterface> {
        return this._config5gPowerDbm;
    }
    /**设置全网射频管理的5GHz的功率*/
    set config5gPowerDbm(value: Array<DropDownsInterface>) {
        this._config5gPowerDbm = value;
    }


    /**获取全网射频管理的5GHz的信道宽度*/
    get config5g11nChannelWidth(): Array<DropDownsInterface> {
        return this._config5g11nChannelWidth;
    }
    /**设置全网射频管理的5GHz的信道宽度*/
    set config5g11nChannelWidth(value: Array<DropDownsInterface>) {
        this._config5g11nChannelWidth = value;
    }


    /**获取全网射频管理的5GHz的空间流*/
    get config5g11nSpace(): Array<DropDownsInterface> {
        return this._config5g11nSpace;
    }
    /**设置全网射频管理的5GHz的空间流*/
    set config5g11nSpace(value: Array<DropDownsInterface>) {
        this._config5g11nSpace = value;
    }

    // /**获取全网射频管理的5GHz的空间流*/
    // get spatitalFlow5(): Array<DropDownsInterface> {
    //     return this._spatitalFlow5;
    // }
    // /**设置全网射频管理的5GHz的空间流*/
    // set spatitalFlow5(value: Array<DropDownsInterface>) {
    //     this._spatitalFlow5 = value;
    // }


    /**获取全网射频管理的漫游诱导*/
    get roamingInductionValue(): Array<DropDownsInterface> {
        return this._roamingInductionValue;
    }
    /**设置全网射频管理的漫游诱导*/
    set roamingInductionValue(value: Array<DropDownsInterface>) {
        this._roamingInductionValue = value;
    }
    /**设置2.4GHz和5GHz的状态*/
    public setAllValue(data: AllRadioFreqModel) {
            this.config2gState = data.config2gState;
            this.config5gState = data.config5gState;
    }
}
