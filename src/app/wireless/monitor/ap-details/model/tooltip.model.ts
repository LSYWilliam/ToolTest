/**
 * AP详情-提示词
 * @class TooltipModel
 */
export class TooltipModel {

    /** 实时统计提示 */
    private _dataMonitoring: string;
    /** 运行状态提示 */
    private _operatingStatus: string;
    /** 流速监控提示 */
    private _flowRateMonitoring: string;
    /** 在线客户端提示 */
    private _onlineClient: string;
    /** AP心跳提示 */
    private _apHeartbeat: string;
    /** AP性能指标提示 */
    private _apPerformance: string;
    /** AP使用异常提示 */
    private _apUseException: string;
    /** AP安全告警提示 */
    private _apSecurityAlarm: string;

    get dataMonitoring(): string {
        return this._dataMonitoring;
    }

    set dataMonitoring(value: string) {
        this._dataMonitoring = value;
    }

    get operatingStatus(): string {
        return this._operatingStatus;
    }

    set operatingStatus(value: string) {
        this._operatingStatus = value;
    }

    get flowRateMonitoring(): string {
        return this._flowRateMonitoring;
    }

    set flowRateMonitoring(value: string) {
        this._flowRateMonitoring = value;
    }

    get onlineClient(): string {
        return this._onlineClient;
    }

    set onlineClient(value: string) {
        this._onlineClient = value;
    }

    get apHeartbeat(): string {
        return this._apHeartbeat;
    }

    set apHeartbeat(value: string) {
        this._apHeartbeat = value;
    }

    get apPerformance(): string {
        return this._apPerformance;
    }

    set apPerformance(value: string) {
        this._apPerformance = value;
    }

    get apUseException(): string {
        return this._apUseException;
    }

    set apUseException(value: string) {
        this._apUseException = value;
    }

    get apSecurityAlarm(): string {
        return this._apSecurityAlarm;
    }

    set apSecurityAlarm(value: string) {
        this._apSecurityAlarm = value;
    }

}
