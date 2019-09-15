/**
 * 全局探针数据接口
 * @interface ProbeConfInterface
 */
export interface ProbeConfInterface {
    /** 网络ID */
    netId?: number;
    /** 探针是否开启,ap扫频模式 ０禁用 １热点＋扫频 ２　全频扫频  */
    probeStatus?: number;
    /** 探针状态的描述 */
    probeStatusName?: string;
    /** 探针接受服务器IP地址 */
    probeServerIp?: string;
    /** 探针接受服务器端口 */
    probeServerPort?: number;
    /** 扫频周期/间隔 */
    probeInterval?: number;
    /** 接受日志服务器IP */
    sysLogIp?: string;
    /** 日志服务器端口 */
    sysLogPort?: number;
    /** 扫频场强，40-90的正整数 */
    scanRssi?: number;
}

export class ProbeConfOutModel {
    /** 网络ID */
    private _netId?: number;
    /** 探针是否开启,ap扫频模式 0禁用 1热点+扫频 2全频扫频  */
    private _probeStatus?: number;
    /** 探针状态的描述 */
    private _probeStatusName?: string;
    /** 探针接受服务器IP地址 */
    private _probeServerIp?: string;
    /** 探针接受服务器端口 */
    private _probeServerPort?: number;
    /** 扫频周期/间隔 */
    private _probeInterval?: number;
    /** 接受日志服务器IP */
    private _sysLogIp?: string;
    /** 日志服务器端口 */
    private _sysLogPort?: number;
    /** 扫频场强，40-90的正整数 */
    private _scanRssi?: number;

    /**
     * 将接口请求到的数据塞入实体中
     * @param data  ProbeConfInterface
     *          接口请求到的数据
     */
    public setData ( data: ProbeConfInterface) {
        this.netId = data.netId;
        this.probeStatus = data.probeStatus;
        this.probeStatusName = data.probeStatusName;
        this.probeServerIp = data.probeServerIp;
        this.probeServerPort = data.probeServerPort;
        this.probeInterval = data.probeInterval;
        this.sysLogIp = data.sysLogIp;
        this.sysLogPort = data.sysLogPort;
        this.scanRssi = data.scanRssi;
    }

    /** 返回全局修改时需要用的json */
    public getPatchData() {
        return {
            "netId" : this.netId,
            "probeStatus" : this.probeStatus,
            "probeStatusName" : this.probeStatusName,
            "probeServerIp" : this.probeServerIp,
            "probeServerPort" : this.probeServerPort,
            "probeInterval" : this.probeInterval,
            "sysLogIp" : this.sysLogIp,
            "sysLogPort" : this.sysLogPort,
            "scanRssi" : this.scanRssi
        };
    }

    public getPatchDatas(id: string) {
        return [{
            "netId" : id,
            "probeStatus" : this.probeStatus,
            "probeStatusName" : this.probeStatusName,
            "probeServerIp" : this.probeServerIp,
            "probeServerPort" : this.probeServerPort,
            "probeInterval" : this.probeInterval,
            "sysLogIp" : this.sysLogIp,
            "sysLogPort" : this.sysLogPort,
            "scanRssi" : this.scanRssi
        }];
    }


    get netId(): number {
        return this._netId;
    }

    set netId(value: number) {
        this._netId = value;
    }

    get probeStatus(): number {
        return this._probeStatus;
    }

    set probeStatus(value: number) {
        this._probeStatus = value;
    }

    get probeStatusName(): string {
        return this._probeStatusName;
    }

    set probeStatusName(value: string) {
        this._probeStatusName = value;
    }

    get probeServerIp(): string {
        return this._probeServerIp;
    }

    set probeServerIp(value: string) {
        this._probeServerIp = value;
    }

    get probeServerPort(): number {
        return this._probeServerPort;
    }

    set probeServerPort(value: number) {
        this._probeServerPort = value;
    }

    get probeInterval(): number {
        return this._probeInterval;
    }

    set probeInterval(value: number) {
        this._probeInterval = value;
    }

    get sysLogIp(): string {
        return this._sysLogIp;
    }

    set sysLogIp(value: string) {
        this._sysLogIp = value;
    }

    get sysLogPort(): number {
        return this._sysLogPort;
    }

    set sysLogPort(value: number) {
        this._sysLogPort = value;
    }

    get scanRssi(): number {
        return this._scanRssi;
    }

    set scanRssi(value: number) {
        this._scanRssi = value;
    }
}
