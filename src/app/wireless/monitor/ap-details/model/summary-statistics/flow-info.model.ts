export interface FlowInfoInterface {
    /** 流速监控-累计流量 */
    dayTraffic?: number;
    /** 流速监控-上行流量 */
    upDayTraffic?: number;
    /** 流速监控-下行流量 */
    downDayTraffic?: number;
}

export class FlowInfoModel {

    private _dayTraffic: number;
    private _upDayTraffic: number;
    private _downDayTraffic: number;

    get dayTraffic(): number {
        return this._dayTraffic;
    }

    set dayTraffic(value: number) {
        this._dayTraffic = value;
    }

    get upDayTraffic(): number {
        return this._upDayTraffic;
    }

    set upDayTraffic(value: number) {
        this._upDayTraffic = value;
    }

    get downDayTraffic(): number {
        return this._downDayTraffic;
    }

    set downDayTraffic(value: number) {
        this._downDayTraffic = value;
    }

}
