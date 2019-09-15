/**
 * 关注设备AP组件实体类
 * @class DeviceWebModel
 */
export class DeviceWebModel {
    /**关注网络 网络Id*/
    private _netId: number;
    /**关注网络 网络名称*/
    private _netName: string;
    /**关注网络 当前在线客户端*/
    private _deviceSum: number;
    /**关注网络 今日转发流量*/
    private _netDayTraffic: number;
    /**关注网络 今日AP告警数*/
    private _netAlarmNum: number;
    /**获取关注网络 网络Id*/
    get netId(): number {
        return this._netId;
    }
    /**设置关注网络 网络Id*/
    set netId(value: number) {
        this._netId = value;
    }
    /**获取关注网络 网络名称*/
    get netName(): string {
        return this._netName;
    }
    /**设置关注网络 网络名称*/
    set netName(value: string) {
        this._netName = value;
    }
    /**获取关注网络 当前在线客户端*/
    get deviceSum(): number {
        return this._deviceSum;
    }
    /**设置关注网络 当前在线客户端*/
    set deviceSum(value: number) {
        this._deviceSum = value;
    }
    /**获取关注网络 今日转发流量*/
    get netDayTraffic(): number {
        return this._netDayTraffic;
    }
    /**设置关注网络 今日转发流量*/
    set netDayTraffic(value: number) {
        this._netDayTraffic = value;
    }
    /**获取关注网络 今日AP告警数*/
    get netAlarmNum(): number {
        return this._netAlarmNum;
    }
    /**设置关注网络 今日AP告警数*/
    set netAlarmNum(value: number) {
        this._netAlarmNum = value;
    }

}
