export class RadioValueModalModel {
    /**apId*/
    private _id: string;
    /**ap的MAC地址*/
    private _apMac: string;
    /**ap的型号*/
    private _apModel: string;
    /**ap的名称*/
    private _apName: string;
    /**2.4GHz的状态*/
    private _config2gState: boolean;
    /**2.4GHz的信道*/
    private _channel2: string;
    /**2.4GHz的功率*/
    private _power2: string;
    /**5GHz的状态*/
    private _config5gState: boolean;
    /**5GHz的信道*/
    private _channel5: string;
    /**5GHz的功率*/
    private _power5: string;
    /**场强阙值*/
    private _rssiThreshold: string;
    /**速率阙值*/
    private _apRateThreshold: string;

    private _config2g11nChannelWidth: string;

    private _config5g11nChannelWidth: string;

    private _config2g11nChannelWidthDesc: string;

    private _config5g11nChannelWidthDesc: string;


    private _config2g11nSpace: string;

    private _config5g11nSpace: string;

    private _config2g11nSpaceDesc: string;

    private _config5g11nSpaceDesc: string;



    // private _spatitalFlow2: string;
    //
    // private _spatitalFlow5: string;
    //
    // private _config2SpatitalFlow: string;
    //
    // private _config5SpatitalFlow: string;

    constructor(data: any) {
        this.id = data['apId'];
        this.apMac = data['apMac'];
        this.apModel = data['apModel'];
        this.apName = data['apName'];

        if (data['config2gPowerDbm'] === '默认' || data['config2gPowerDbm'] === '未开启') {
            this.power2 = data['config2gPowerDbm'];
        } else {
            this.power2 = data['config2gPowerDbm'] + "%";
        }

        if (data['config5gPowerDbm'] === '默认' || data['config5gPowerDbm'] === '未开启') {
            this.power5 = data['config5gPowerDbm'];
        } else {
            this.power5 = data['config5gPowerDbm'] + "%";
        }

        this.channel2 = data['config2gChannel'];
        this.channel5 = data['config5gChannel'];

        this.config2gState = data['config2gState'];
        this.config5gState = data['config5gState'];
        this.rssiThreshold = data['rssiThreshold'] + "dBm";
        this.apRateThreshold = data['apRateThreshold'] + "Mbps";

        this.config2g11nChannelWidth = data["config2g11nChannelWidth"];
        this.config5g11nChannelWidth = data["config5g11nChannelWidth"];
        this.config2g11nChannelWidthDesc = data["config2g11nChannelWidthDesc"];
        this.config5g11nChannelWidthDesc = data["config5g11nChannelWidthDesc"];

        this.config2g11nSpace = data["config2g11nSpace"];
        this.config5g11nSpace = data["config5g11nSpace"];
        this.config2g11nSpaceDesc = data["config2g11nSpaceDesc"];
        this.config5g11nSpaceDesc = data["config5g11nSpaceDesc"];


        // this.config2SpatitalFlow = data["config2SpatitalFlow"];
        // this.config5SpatitalFlow = data["config5SpatitalFlow"];


    }
    /**获取双击AP射频管理表格请求的参数数据*/
    public getPostValue () {
        let object = {
            'apId': null, 'apMac': null, 'config2gChannel': null,
            'config2gPowerDbm': null, 'config5gChannel': null, 'config5gPowerDbm': null,
            'fieldsStrengthThreshold': null, 'apRateThreshold': null,
            'config2g11nChannelWidth': null, 'config5g11nChannelWidth': null, 'config2g11nSpace': null,  'config5g11nSpace': null
        };

        object['apId'] = this.id;
        object['apMac'] = this.apMac;
        object['fieldsStrengthThreshold'] = this.rssiThreshold.replace('dBm','');
        object['apRateThreshold'] = this.apRateThreshold.replace('Mbps','');

        object['config2g11nChannelWidth'] = this.config2g11nChannelWidth;
        object['config5g11nChannelWidth'] = this.config5g11nChannelWidth;

        object['config2g11nSpace'] = this.config2g11nSpace;
        object['config5g11nSpace'] = this.config5g11nSpace;


        // object['spatitalFlow2'] = this.spatitalFlow2;
        // object['spatitalFlow5'] = this.spatitalFlow5;

        if (this.channel2 === '自动' || this.channel2 === '未开启') {
            object['config2gChannel'] = 0;
        } else {
            object['config2gChannel'] = this.channel2;
        }

        if (this.power2 === '默认' || this.power2 === '未开启') {
            object['config2gPowerDbm'] = 0;
        } else {
            let tmp1: number = Number(this.power2.replace('%',''));
            if (tmp1 > 11) {
                object['config2gPowerDbm'] = (tmp1 / 10).toString();
            } else {
                object['config2gPowerDbm'] = tmp1.toString();
            }
            // object['config2gPowerDbm'] = this.power2.replace('%','');
        }

        if (this.channel5 === '自动' || this.channel5 === '未开启') {
            object['config5gChannel'] = 0;
        } else {
            object['config5gChannel'] = this.channel5;
        }

        if (this.power5 === '默认' || this.power5 === '未开启') {
            object['config5gPowerDbm'] = 0;
        } else {
            let tmp1: number = Number(this.power5.replace('%',''));
            if (tmp1 > 11) {
                object['config5gPowerDbm'] = (tmp1 / 10).toString();
            } else {
                object['config5gPowerDbm'] = tmp1.toString();
            }

            // object['config5gPowerDbm'] = this.power5.replace('%','');
        }
        return object;
    }
    /**双击AP射频管理表格然后点击确定按钮判断模态框数据是否修改过*/
    public equal(data: any) :boolean {
        let channel2 = this.channel2 === '0'? '自动' : this.channel2;
        let channel5 = this.channel5 === '0'? '自动' : this.channel5;
        let power2 = this.power2 === '0'? '默认' : this.power2.replace("%", "");
        let power5 = this.power5 === '0'? '默认' : this.power5.replace("%", "");

        // return data['config2gChannel'] === channel2 &&
        //     data['config5gChannel'] === channel5 &&
        //     data['config2gPowerDbm'] === power2 &&
        //     data['config5gPowerDbm'] === power5 &&
        //     data['rssiThreshold'] === this.rssiThreshold.replace("dBm", "") &&
        //     data['apRateThreshold'] === this.apRateThreshold.replace("Mbps", "") &&
        //     data['config2g11nChannelWidth'] === this.config2g11nChannelWidth &&
        //     data['config5g11nChannelWidth'] === this.config5g11nChannelWidth &&
        //     data['config2g11nSpace'] === this.config2g11nSpace &&
        //     data['config5g11nSpace'] === this.config5g11nSpace;

        return data['config2gChannel'] === channel2 &&
            data['config5gChannel'] === channel5 &&
            data['config2gPowerDbm'] === power2 &&
            data['config5gPowerDbm'] === power5 &&
            data['config2g11nChannelWidth'] === this.config2g11nChannelWidth &&
            data['config5g11nChannelWidth'] === this.config5g11nChannelWidth &&
            data['config2g11nSpace'] === this.config2g11nSpace &&
            data['config5g11nSpace'] === this.config5g11nSpace;
    }
    /**获取apId的值*/
    get id(): string {
        return this._id;
    }
    /**设置apId的值*/
    set id(value: string) {
        this._id = value;
    }
    /**获取ap的MAC地址的值*/
    get apMac(): string {
        return this._apMac;
    }
    /**设置ap的MAC地址的值*/
    set apMac(value: string) {
        this._apMac = value;
    }
    /**获取ap的型号的值*/
    get apModel(): string {
        return this._apModel;
    }
    /**设置ap的型号的值*/
    set apModel(value: string) {
        this._apModel = value;
    }
    /**获取ap的名称的值*/
    get apName(): string {
        return this._apName;
    }
    /**设置ap的名称的值*/
    set apName(value: string) {
        this._apName = value;
    }
    /**获取2.4GHz的信道的值*/
    get channel2(): string {
        return this._channel2;
    }
    /**设置2.4GHz的信道的值*/
    set channel2(value: string) {
        this._channel2 = value;
    }
    /**获取2.4GHz的功率的值*/
    get power2(): string {
        return this._power2;
    }
    /**设置2.4GHz的功率的值*/
    set power2(value: string) {
        this._power2 = value;
    }
    /**获取5GHz的信道的值*/
    get channel5(): string {
        return this._channel5;
    }
    /**设置5GHz的信道的值*/
    set channel5(value: string) {
        this._channel5 = value;
    }
    /**获取5GHz的功率的值*/
    get power5(): string {
        return this._power5;
    }
    /**设置5GHz的功率的值*/
    set power5(value: string) {
        this._power5 = value;
    }
    /**获取场强阙值*/
    get rssiThreshold(): string {
        return this._rssiThreshold;
    }
    /**设置场强阙值*/
    set rssiThreshold(value: string) {
        this._rssiThreshold = value;
    }
    /**获取速率阙值*/
    get apRateThreshold(): string {
        return this._apRateThreshold;
    }
    /**设置速率阙值*/
    set apRateThreshold(value: string) {
        this._apRateThreshold = value;
    }
    /**获取2.4GHz的状态*/
    get config2gState(): boolean {
        return this._config2gState;
    }
    /**设置2.4GHz的状态*/
    set config2gState(value: boolean) {
        this._config2gState = value;
    }
    /**获取5GHz的状态*/
    get config5gState(): boolean {
        return this._config5gState;
    }
    /**设置5GHz的状态*/
    set config5gState(value: boolean) {
        this._config5gState = value;
    }

    get config2g11nChannelWidth(): string {
        return this._config2g11nChannelWidth;
    }

    set config2g11nChannelWidth(value: string) {
        this._config2g11nChannelWidth = value;
    }

    get config5g11nChannelWidth(): string {
        return this._config5g11nChannelWidth;
    }

    set config5g11nChannelWidth(value: string) {
        this._config5g11nChannelWidth = value;
    }

    get config2g11nChannelWidthDesc(): string {
        return this._config2g11nChannelWidthDesc;
    }

    set config2g11nChannelWidthDesc(value: string) {
        this._config2g11nChannelWidthDesc = value;
    }

    get config5g11nChannelWidthDesc(): string {
        return this._config5g11nChannelWidthDesc;
    }

    set config5g11nChannelWidthDesc(value: string) {
        this._config5g11nChannelWidthDesc = value;
    }



    get config2g11nSpace(): string {
        return this._config2g11nSpace;
    }

    set config2g11nSpace(value: string) {
        this._config2g11nSpace = value;
    }

    get config5g11nSpace(): string {
        return this._config5g11nSpace;
    }

    set config5g11nSpace(value: string) {
        this._config5g11nSpace = value;
    }

    get config2g11nSpaceDesc(): string {
        return this._config2g11nSpaceDesc;
    }

    set config2g11nSpaceDesc(value: string) {
        this._config2g11nSpaceDesc = value;
    }

    get config5g11nSpaceDesc(): string {
        return this._config5g11nSpaceDesc;
    }

    set config5g11nSpaceDesc(value: string) {
        this._config5g11nSpaceDesc = value;
    }
    //
    // get spatitalFlow2(): string {
    //     return this._spatitalFlow2;
    // }
    //
    // set spatitalFlow2(value: string) {
    //     this._spatitalFlow2 = value;
    // }
    //
    // get config2SpatitalFlow(): string {
    //     return this._config2SpatitalFlow;
    // }
    //
    // set config2SpatitalFlow(value: string) {
    //     this._config2SpatitalFlow = value;
    // }
    //
    // get spatitalFlow5(): string {
    //     return this._spatitalFlow5;
    // }
    //
    // set spatitalFlow5(value: string) {
    //     this._spatitalFlow5 = value;
    // }
    //
    // get config5SpatitalFlow(): string {
    //     return this._config5SpatitalFlow;
    // }
    //
    // set config5SpatitalFlow(value: string) {
    //     this._config5SpatitalFlow = value;
    // }
}
