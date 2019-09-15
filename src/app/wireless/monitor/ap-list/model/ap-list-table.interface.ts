export class ApListTableInterface {
    /** AP ID */
    apId?: number;
    /** AP序列号 */
    apSn?: string;
    /** AP名称 */
    apName?: string;
    /** AP MAC */
    apMac?: string;
    /** AP Ip */
    apIp?: string;
    /** AP 型号 */
    apModel?: string;
    /** AP 状态 */
    apStatus?: number;
    /** AP 状态代表的小图标 */
    apStatusIcon?: string;
    /** 在线用户数 */
    onlineNum?: number;
    /** 今日转发流量 */
    dayTraffic?: string;
    /**备注*/
    remark: string;
}
