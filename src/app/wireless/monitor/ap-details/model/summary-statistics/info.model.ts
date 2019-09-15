export interface InfoInterface {
    /** 摘要统计-当前在线客户端 */
    upUsrNum?: number;
    /** 摘要统计-今日累计流量 */
    dayTraffic?: number;
    /** 摘要统计-上行流量 */
    dayUpTraffic?: number;
    /** 摘要统计-下行流量 */
    dayDownTraffic?: number;
}

export class InfoModel {
    private _upUsrNum: number;
    private _dayTraffic: number;
    private _dayUpTraffic: number;
    private _dayDownTraffic: number;

    get upUsrNum(): number {
        return this._upUsrNum;
    }

    set upUsrNum(value: number) {
        this._upUsrNum = value;
    }

    get dayTraffic(): number {
        return this._dayTraffic;
    }

    set dayTraffic(value: number) {
        this._dayTraffic = value;
    }

    get dayUpTraffic(): number {
        return this._dayUpTraffic;
    }

    set dayUpTraffic(value: number) {
        this._dayUpTraffic = value;
    }

    get dayDownTraffic(): number {
        return this._dayDownTraffic;
    }

    set dayDownTraffic(value: number) {
        this._dayDownTraffic = value;
    }
}
