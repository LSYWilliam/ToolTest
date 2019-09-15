import {RadioFreqConf} from "../../../../shared/static-data/radio-freq-conf";
import {containerStart} from "@angular/core/src/render3/instructions";

export interface ApInfoInterface {
    /** AP ID */
    apId?: number;
    /** AP 型号 */
    apModel?: string;
    /** AP MAC */
    apMac?: string;
    /** AP SSID */
    ssidList?: any;
    /** AP 2g信道 */
    channel2?: number;
    /** AP 2ggonglv */
    power2?: number;
    /** AP 5g信道 */
    channel5?: number;
    /** AP 5ggonglv */
    power5?: number;
    /** AP 本地IP */
    localIp?: string;
    /** AP 公共IP */
    publicIp?: string;
    /** AP 网关  */
    gateway?: string;
    /** AP dns */
    dns?: string;
    /** AP 序列号 */
    apSn?: string;
    /** AP 版本 */
    version?: string;
    /**备注*/
    remark?: any;
}

export class ApInfoModel {
    private _apId: number;
    private _apModel: string;
    private _apMac: string;
    private _ssidList: Array<string>;
    private _channel2: string;
    private _power2: string;
    private _channel5: string;
    private _power5: string;
    private _localIp: string;
    private _publicIp: string;
    private _gateway: string;
    private _dns: string;
    private _apSn: string;
    private _version: string;
    private _conf: any;
    private _remark: any;

    constructor () {
        this.conf = RadioFreqConf();
    }

    public setData(data: ApInfoInterface) {
        this.apId = data.apId;
        this.apModel = data.apModel;
        this.apMac = data.apMac;
        this.ssidList = data.ssidList;
        this.localIp = data.localIp;
        this.publicIp = data.publicIp;
        this.gateway = data.gateway;
        this.dns = data.gateway;
        this.apSn = data.apSn;
        this.version = data.version;
        this.remark = data.remark;
        if (Number(data.channel2) === -1) {
            this.channel2 = '未开启';
        } else {
            this.channel2 = this.conf['channel2'][data.channel2];
        }

        if (Number(data.channel5) === -1) {
            this.channel5 = '未开启';
        } else {
            this.channel5 = this.conf['channel5'][data.channel5];
        }

        if (Number(data.power2) === -1) {
            this.power2 = '未开启';
        } else {
            this.power2 = this.conf['power'][data.power2];
        }

        if (Number(data.power5) === -1) {
            this.power5 = '未开启';
        } else {
            this.power5 = this.conf['power'][data.power5];
        }

        let tmp: Array<string> = [];
        for (let obj of data.ssidList) {
                tmp.push(obj['ssidName']);
        }
        this.ssidList = tmp;
    }

    get apId(): number {
        return this._apId;
    }

    set apId(value: number) {
        this._apId = value;
    }

    get apModel(): string {
        return this._apModel;
    }

    set apModel(value: string) {
        this._apModel = value;
    }

    get apMac(): string {
        return this._apMac;
    }

    set apMac(value: string) {
        this._apMac = value;
    }


    get ssidList(): Array<string> {
        return this._ssidList;
    }

    set ssidList(value: Array<string>) {
        this._ssidList = value;
    }

    get channel2(): string {
        return this._channel2;
    }

    set channel2(value: string) {
        this._channel2 = value;
    }

    get power2(): string {
        return this._power2;
    }

    set power2(value: string) {
        this._power2 = value;
    }

    get channel5(): string {
        return this._channel5;
    }

    set channel5(value: string) {
        this._channel5 = value;
    }

    get power5(): string {
        return this._power5;
    }

    set power5(value: string) {
        this._power5 = value;
    }

    get localIp(): string {
        return this._localIp;
    }

    set localIp(value: string) {
        this._localIp = value;
    }

    get publicIp(): string {
        return this._publicIp;
    }

    set publicIp(value: string) {
        this._publicIp = value;
    }

    get gateway(): string {
        return this._gateway;
    }

    set gateway(value: string) {
        this._gateway = value;
    }

    get dns(): string {
        return this._dns;
    }

    set dns(value: string) {
        this._dns = value;
    }

    get apSn(): string {
        return this._apSn;
    }

    set apSn(value: string) {
        this._apSn = value;
    }

    get version(): string {
        return this._version;
    }

    set version(value: string) {
        this._version = value;
    }

    get conf(): any {
        return this._conf;
    }

    set conf(value: any) {
        this._conf = value;
    }

    get remark(): any {
        return this._remark;
    }

    set remark(value: any) {
        this._remark = value;
    }
}
