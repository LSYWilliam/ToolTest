export class NetDetailsDataModel {
    /** 网络ID */
    private _netId: number;
    /** 网络ID */
    private _netName: string;
    /** 当前流速 */
    private _currentFlowVelocity: number;
    /** 上行流速 */
    private _upFlowVelocity: number;
    /** 下行流速 */
    private _downFlowVelocity: number;
    /** 当前客户端数量 */
    private _currentClient: number;
    /** 设备数量 */
    private _deviceNum: number;
    /** 当前总转发流量 */
    private _dayTraffic: number;

    get netId(): number {
        return this._netId;
    }

    set netId(value: number) {
        this._netId = value;
    }

    get netName(): string {
        return this._netName;
    }

    set netName(value: string) {
        this._netName = value;
    }

    get currentFlowVelocity(): number {
        return this._currentFlowVelocity;
    }

    set currentFlowVelocity(value: number) {
        this._currentFlowVelocity = value;
    }

    get upFlowVelocity(): number {
        return this._upFlowVelocity;
    }

    set upFlowVelocity(value: number) {
        this._upFlowVelocity = value;
    }

    get downFlowVelocity(): number {
        return this._downFlowVelocity;
    }

    set downFlowVelocity(value: number) {
        this._downFlowVelocity = value;
    }

    get currentClient(): number {
        return this._currentClient;
    }

    set currentClient(value: number) {
        this._currentClient = value;
    }

    get deviceNum(): number {
        return this._deviceNum;
    }

    set deviceNum(value: number) {
        this._deviceNum = value;
    }

    get dayTraffic(): number {
        return this._dayTraffic;
    }

    set dayTraffic(value: number) {
        this._dayTraffic = value;
    }

}
