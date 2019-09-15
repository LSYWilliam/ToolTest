/**
 * AP详情-警报信息-AP性能指标
 * @class PerformanceModel
 */
export class PerformanceModel {

    /** AP ID*/
    private _id: number;
    /** AP cpu */
    private _cpu: number;
    /** AP 内存  */
    private _memory: number;
    /** AP 磁盘  */
    private _disk: number;
    /** AP  更新时间 */
    private _logTime: number;
    /** AP 序列号  */
    private _apsn: string;
    /** AP 类型  */
    private _type: string;
    /** AP MAC  */
    private _apmac: string;
    /** AP IP  */
    private _apip: string;
    /** AP 创建时间 */
    private _createTime: number;

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get cpu(): number {
        return this._cpu;
    }

    set cpu(value: number) {
        this._cpu = value;
    }

    get memory(): number {
        return this._memory;
    }

    set memory(value: number) {
        this._memory = value;
    }

    get disk(): number {
        return this._disk;
    }

    set disk(value: number) {
        this._disk = value;
    }

    get logTime(): number {
        return this._logTime;
    }

    set logTime(value: number) {
        this._logTime = value;
    }

    get apsn(): string {
        return this._apsn;
    }

    set apsn(value: string) {
        this._apsn = value;
    }

    get type(): string {
        return this._type;
    }

    set type(value: string) {
        this._type = value;
    }

    get apmac(): string {
        return this._apmac;
    }

    set apmac(value: string) {
        this._apmac = value;
    }

    get apip(): string {
        return this._apip;
    }

    set apip(value: string) {
        this._apip = value;
    }

    get createTime(): number {
        return this._createTime;
    }

    set createTime(value: number) {
        this._createTime = value;
    }

}
