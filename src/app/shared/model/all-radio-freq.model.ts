import {AllRadioFreqInterface} from "../interface/all-radio-freq.interface";
import {RadioFreqConf} from "../static-data/radio-freq-conf";
/**
 * 全网射频管理 整个页面定义的实体类
 * */
export class AllRadioFreqModel {
    /**全网射频管理的2.4GHz的状态 开启 or 关闭*/
     config2gState: boolean;
    /**全网射频管理的2.4GHz的信道*/
     config2gChannel: string;
    /**全网射频管理的2.4GHz的功率*/
     config2gPowerDbm: string;
    /**全网射频管理的2.4GHz的信道宽度*/
     config2g11nChannelWidth: string;
    /**全网射频管理的5GHz的状态 开启 or 关闭*/
     config5gState: boolean;
    /**全网射频管理的5GHz的信道*/
     config5gChannel: string;
    /**全网射频管理的5GHz的功率*/
     config5gPowerDbm: string;
    /**全网射频管理的5GHz的信道宽度*/
     config5g11nChannelWidth: string;
    /**全网射频管理的漫游诱导*/
     roamingInduction: number;
    /**全网射频管理的2.4GHz的状态ID*/
     config2gStateID: string;
    /**全网射频管理的2.4GHz的信道ID*/
     config2gChannelID: string;
    /**全网射频管理的2.4GHz的功率ID*/
     config2gPowerDbmID: string;
    /**全网射频管理的2.4GHz的信道宽度ID*/
     config2g11nChannelWidthID: string;
    /**全网射频管理的5GHz的状态ID*/
     config5gStateID: string;
    /**全网射频管理的5GHz的信道ID*/
     config5gChannelID: string;
    /**全网射频管理的5GHz的功率ID*/
     config5gPowerDbmID: string;
    /**全网射频管理的5GHz的信道宽度ID*/
     config5g11nChannelWidthID: string;

     id: number;
    /**全网射频管理的 apId*/
     apID: string;
    /**全网射频管理的 ap名称*/
     apName: string;
    /**全网射频管理的 ap型号*/
     apModel: string;
    /**全网射频管理的 apMac地址*/
     apMac: string;
    /**全网射频管理的 场强阙值*/
     rssiThreshold: number;
    /**全网射频管理的 速率阙值*/
     apRateThreshold: number;
    /**全网射频管理的 静态数据*/
     _object: any;

    constructor() {
        this._object = RadioFreqConf();
    }
    /**设置 全网射频管理的 所有数据*/
    public setAllData(data: AllRadioFreqInterface) {
        if (data.config2gState != null) {
            this.config2gState = this._object['state'][data.config2gState];
            this.config2gStateID = data.config2gState.toString();
        }

        if (data.config2gChannel != null) {
            this.config2gChannel = this._object['channel2'][data.config2gChannel];
            this.config2gChannelID = data.config2gChannel.toString();
        }

        // if (data.config2gPowerDbm != null) {
        //     this.config2gPowerDbm = this._object['power'][data.config2gPowerDbm];
        //     this.config2gPowerDbmID = data.config2gPowerDbm.toString();
        // }

        if (data.config2gPowerDbm != null) {

            if (data.config2gPowerDbm === 0 || data.config2gPowerDbm >=10) {
                this.config2gPowerDbm = '100%';
            } else {
                this.config2gPowerDbm = this._object['power'][data.config2gPowerDbm];
            }

            this.config2gPowerDbmID = data.config2gPowerDbm.toString();
        }


        if (data.config2g11nChannelWidth != null) {
            this.config2g11nChannelWidth = this._object['channelWidth'][data.config2g11nChannelWidth];
            this.config2g11nChannelWidthID = data.config2g11nChannelWidth.toString();
        }

        if (data.config5gState != null) {
            this.config5gState = this._object['state'][data.config5gState];
            this.config5gStateID = data.config5gState.toString();
        }

        if (data.config5gChannel != null) {
            this.config5gChannel = this._object['channel5'][data.config5gChannel];
            this.config5gChannelID = data.config5gChannel.toString();
        }

        // if (data.config5gPowerDbm != null) {
        //     this.config5gPowerDbm = this._object['power'][data.config5gPowerDbm];
        //     this.config5gPowerDbmID = data.config5gPowerDbm.toString();
        // }

        if (data.config5gPowerDbm != null) {

            if (data.config5gPowerDbm === 0 || data.config5gPowerDbm >= 10) {
                this.config5gPowerDbm = '100%';
            } else {
                this.config5gPowerDbm = this._object['power'][data.config5gPowerDbm];
            }
            this.config5gPowerDbmID = data.config5gPowerDbm.toString();
        }

        if (data.config5g11nChannelWidth != null) {
            this.config5g11nChannelWidth = this._object['channelWidth'][data.config5g11nChannelWidth];
            this.config5g11nChannelWidthID = data.config5g11nChannelWidth.toString();
        }

        if (data.radioFrequencyRoamInduction != null) {
            this.roamingInduction = data.radioFrequencyRoamInduction;
        }

        if (data.apId != null) {
            this.apID = data.apId;
        }

        if (data.apName != null) {
            this.apName = data.apName;
        }

        if (data.apModel != null) {
            this.apModel = data.apModel;
        }

        if (data.apMac != null) {
            this.apMac = data.apMac;
        }

        if (data.fieldsStrengthThreshold != null) {
            this.rssiThreshold = data.fieldsStrengthThreshold;
        }

        if (data.apRateThreshold != null) {
            this.apRateThreshold = data.apRateThreshold;
        }

        if(data.id != null) {
            this.id = data.id;
        }
    }
    /**判断 全网射频管理的数据 是否已修改*/
    public equalArgs(args: any): boolean {
        const config2gState = this.config2gState? 1 : 0;
        const config5gState = this.config5gState? 1 : 0;

        return args['channel2'] === this.config2gChannelID &&
            args['power2'] === this.config2gPowerDbmID &&
            args['channelWidth2'] === this.config2g11nChannelWidthID &&
            args['channel5'] === this.config5gChannelID &&
            args['power5'] === this.config5gPowerDbmID &&
            args['channelWidth5'] === this.config5g11nChannelWidthID &&
            args['channel2Enable'] == config2gState &&
            args['channel5Enable'] == config5gState &&
            args['roamingInduction'] === this.roamingInduction;
    }
}
