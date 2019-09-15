interface VersionInterface {
    // id?: number;
    version?: string;
    instruction?: string;
    filePath?: string;
    type?: number;
    versionStatus?: number;
    versionStatusName?: string;
    typeName?: string;
    deviceName?: string;
    optionUserName?: string;
    delFlag?: number;
    updateTime?: number;
    createTime?: number;
}
export class VersionModel {

    // private _id: number;
    private _version: string;
    private _instruction: string;
    private _filePath: string;
    private _type: number;
    private _versionStatus: number;
    private _versionStatusName: string;
    private _typeName: string;
    private _deviceName: string;
    private _optionUserName: string;
    private _delFlag: number;
    private _updateTime: number;
    private _createTime: number;

    // constructor (data: VersionInterface) {
    //     this._id = data.id;
    //     this._version = data.version;
    //     this._instruction = data.instruction;
    //     this._filePath = data.filePath;
    //     this._type = data.type;
    //     this._versionStatus = data.versionStatus;
    //     this._versionStatusName = data.versionStatusName;
    //     this._typeName = data.typeName;
    //     this._deviceName = data.deviceName;
    //     this._optionUserName = data.optionUserName;
    //     this._delFlag = data.delFlag;
    //     this._updateTime = data.updateTime;
    //     this._createTime = data.createTime;
    // }

    // get id(): number {
    //     return this._id;
    // }
    //
    // set id(value: number) {
    //     this._id = value;
    // }

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

    get filePath(): string {
        return this._filePath;
    }

    set filePath(value: string) {
        this._filePath = value;
    }

    get type(): number {
        return this._type;
    }

    set type(value: number) {
        this._type = value;
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

    get typeName(): string {
        return this._typeName;
    }

    set typeName(value: string) {
        this._typeName = value;
    }

    get deviceName(): string {
        return this._deviceName;
    }

    set deviceName(value: string) {
        this._deviceName = value;
    }

    get optionUserName(): string {
        return this._optionUserName;
    }

    set optionUserName(value: string) {
        this._optionUserName = value;
    }

    get delFlag(): number {
        return this._delFlag;
    }

    set delFlag(value: number) {
        this._delFlag = value;
    }

    get updateTime(): number {
        return this._updateTime;
    }

    set updateTime(value: number) {
        this._updateTime = value;
    }

    get createTime(): number {
        return this._createTime;
    }

    set createTime(value: number) {
        this._createTime = value;
    }

    // public toString() {
    //     return {
    //         // "id": this.id || null,
    //         "version": this.version || null,
    //         "instruction": this.instruction || null,
    //         "filePath": this.filePath || null,
    //         "type": this.type || null,
    //         "versionStatus": this.versionStatus || null,
    //         "versionStatusName": this.versionStatusName || null,
    //         "typeName": this.typeName || null,
    //         "deviceName": this.deviceName || null,
    //         "optionUserName": this.optionUserName || null,
    //         "delFlag": this.delFlag || null,
    //         "updateTime": this.updateTime || null,
    //         "createTime": this.createTime || null
    //     };
    // }

}
