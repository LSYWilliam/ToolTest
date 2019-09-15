export class UpdateTableModel {

    /** 版本ID */
    private _id: number;
    /** 更新描述 */
    private _description: string;
    /** 更新时间 */
    private _updateTime: string;
    /** 当前版本id */
    private _currentVersionInfoID: number;
    /** 当前版本 */
    private _currentVersion: string;
    /** 当前版本描述 */
    private _currentInstruction: string;
    /** 当前版本名称 */
    private _currentTypeName: string;
    /** 当前版本创建时间 */
    private _currentCreateTime: string;
    /** 过去版本id */
    private _oldVersionInfoID: number;
    /** 过去版本 */
    private _oldVersion: string;
    /** 过去版本描述 */
    private _oldInstruction: string;
    /** 过去版本名称 */
    private _oldTypeName: string;
    /** 过去版本创建时间 */
    private _oldCreateTime: string;

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get updateTime(): string {
        return this._updateTime;
    }

    set updateTime(value: string) {
        this._updateTime = value;
    }

    get currentVersionInfoID(): number {
        return this._currentVersionInfoID;
    }

    set currentVersionInfoID(value: number) {
        this._currentVersionInfoID = value;
    }

    get currentVersion(): string {
        return this._currentVersion;
    }

    set currentVersion(value: string) {
        this._currentVersion = value;
    }

    get currentInstruction(): string {
        return this._currentInstruction;
    }

    set currentInstruction(value: string) {
        this._currentInstruction = value;
    }

    get currentTypeName(): string {
        return this._currentTypeName;
    }

    set currentTypeName(value: string) {
        this._currentTypeName = value;
    }

    get currentCreateTime(): string {
        return this._currentCreateTime;
    }

    set currentCreateTime(value: string) {
        this._currentCreateTime = value;
    }

    get oldVersionInfoID(): number {
        return this._oldVersionInfoID;
    }

    set oldVersionInfoID(value: number) {
        this._oldVersionInfoID = value;
    }

    get oldVersion(): string {
        return this._oldVersion;
    }

    set oldVersion(value: string) {
        this._oldVersion = value;
    }

    get oldInstruction(): string {
        return this._oldInstruction;
    }

    set oldInstruction(value: string) {
        this._oldInstruction = value;
    }

    get oldTypeName(): string {
        return this._oldTypeName;
    }

    set oldTypeName(value: string) {
        this._oldTypeName = value;
    }

    get oldCreateTime(): string {
        return this._oldCreateTime;
    }

    set oldCreateTime(value: string) {
        this._oldCreateTime = value;
    }

}
