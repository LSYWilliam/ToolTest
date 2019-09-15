export class NetApDetailsModel {

    /** APID */
    private _apId: number;
    /** AP名称 */
    private _apName: string;
    /** AP状态 */
    private _apStatus: number;
    /** APIp */
    private _apIp: string;
    /** AP名称 */
    private _apModel: string;
    /** APMAC */
    private _apMac: string;
    /** 公共IP */
    private _publicIp: string;
    /** 当前客户端数量 */
    private _currentClient: number;
    /** 累计转发流量 */
    private _dayTraffic: number;

    get apId(): number {
        return this._apId;
    }

    set apId(value: number) {
        this._apId = value;
    }

    get apName(): string {
        return this._apName;
    }

    set apName(value: string) {
        this._apName = value;
    }

    get apStatus(): number {
        return this._apStatus;
    }

    set apStatus(value: number) {
        this._apStatus = value;
    }

    get apIp(): string {
        return this._apIp;
    }

    set apIp(value: string) {
        this._apIp = value;
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

    get publicIp(): string {
        return this._publicIp;
    }

    set publicIp(value: string) {
        this._publicIp = value;
    }

    get currentClient(): number {
        return this._currentClient;
    }

    set currentClient(value: number) {
        this._currentClient = value;
    }

    get dayTraffic(): number {
        return this._dayTraffic;
    }

    set dayTraffic(value: number) {
        this._dayTraffic = value;
    }

}
