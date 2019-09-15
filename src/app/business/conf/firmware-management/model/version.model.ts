export class VersionModel {

    /** 固件ID */
    private _id: number;
    /** 版本号 */
    private _version: string;
    /** 版本介绍 */
    private _instruction: string;
    /** 类型 */
    private _type: number;
    /** 类型名称 */
    private _typeName:string;
    /** 版本状态 */
    private _versionStatus: number;
    /** 版本状态名 */
    private _versionStatusName:string;
    /** 设备名称 */
    private _deviceName: string;

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get version(): string {
        return this._version;
    }

    set version(value: string) {
        this._version = value;
    }

    get instruction(): string {
        return this._instruction;
    }

    set instruction(value: string) {
        this._instruction = value;
    }

    get type(): number {
        return this._type;
    }

    set type(value: number) {
        this._type = value;
    }

    get typeName(): string {
        return this._typeName;
    }

    set typeName(value: string) {
        this._typeName = value;
    }

    get versionStatus(): number {
        return this._versionStatus;
    }

    set versionStatus(value: number) {
        this._versionStatus = value;
    }

    get versionStatusName(): string {
        return this._versionStatusName;
    }

    set versionStatusName(value: string) {
        this._versionStatusName = value;
    }

    get deviceName(): string {
        return this._deviceName;
    }

    set deviceName(value: string) {
        this._deviceName = value;
    }

    public toString() {
        return {
            "id":this.id || null,
            "version": this.version || null,
            "instruction": this.instruction || null,
            "type":this.type || null,
            "typeName": this.typeName || null,
            "versionStatus": this.versionStatus || null,
            "versionStatusName": this.versionStatusName || null,
            "deviceName": this.deviceName || null
        };
    }

}
