export interface AllRadioFreqInterface {
    /** apID */
    apId?: string;
    /** ap名称 */
    apName?: string;
    /** ap型号 */
    apModel?: string;
    /** ap的MAC */
    apMac?: string;
    /** 2.4G是否开启。0：关闭，1：开启  */
    config2gState?: number;
    /** 2.4G信道 */
    config2gChannel?: number;
    /** 2.4G。0dBm~30dBm。0：默认 */
    config2gPowerDbm?: number;
    /** 信道宽度.0:20; 1:20/40; 2:40+; 3:40-;默认为：3 */
    config2g11nChannelWidth?: number;
    config2g11nChannelWidthDesc?: string;

    config2g11nSpace?: number;
    config2g11nSpaceDesc?: string;

    /** 5G是否开启。0：关闭，1：开启  */
    config5gState?: number;
    /** 信道。0:auto; 36 40 44 48 52 56 60 64 100 104 108 112 116 120 124 128 132 136 140 144 149 153 157 161 165 默认：0 */
    config5gChannel?: number;
    /** 功率。0dBm~30dBm。步长为1.后台返回数字，前台加dBm */
    config5gPowerDbm?: number;
    /** 信道宽度。0:20; 1:20/40; 2:40+; 3:40-; 4:80; 。默认：3 */
    config5g11nChannelWidth?: number;
    config5g11nChannelWidthDesc?: string;

    config5g11nSpace?: number;
    config5g11nSpaceDesc?: string;
    /** 漫游诱导。数字。取值范围：-(60-95)，0为禁止测功能，默认值：-85 */
    radioFrequencyRoamInduction?: number;
    /**场强阈值*/
    fieldsStrengthThreshold ?: number;
    /**速率阈值*/
    apRateThreshold?: number;
    /**2.4GHz信道*/
    config2gChannelDesc?: string;
    /**2.4GHz功率*/
    config2gPowerDbmDesc?: string;
    /**5GHz信道*/
    config5gChannelDesc?: string;
    /**5GHz功率*/
    config5gPowerDbmDesc?: string;
    id?: number;

}
