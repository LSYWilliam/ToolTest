/**
 * 全网-监控器-概览 商户监控信息的实体
 * @class BusinessMonitorModel
 */
export class BusinessMonitorModel {
    /** 今日上行流量 */
    dayUpTraffic: number;
    /** 今日下行流量 */
    dayDownTraffic: number;
    /** 今日总流量 */
    dayTraffic: number;
    /** 当前客户端 */
    allClient: number;

    /**在用设备数*/
    useDeviceNum: number;
    /**设备总数*/
    allDeviceNum: number;

}
