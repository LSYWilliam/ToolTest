export class VersionUploadModel {

    /** 版本号 */
    private _version: string;
    /** 版本类型 */
    private _type: number;
    /** 校验MD5 */
    private _checkMd5: string;
    /** 设备型号 */
    private _deviceModel: string;
    /** 版本文件 */
    private _filePath: string;
    /** 版本描述 */
    private _instruction: string;
    /** 文件大小 */
    private _fileSize: number;

    get version(): string {
        return this._version;
    }

    set version(value: string) {
        this._version = value;
    }

    get type(): number {
        return this._type;
    }

    set type(value: number) {
        this._type = value;
    }

    get deviceModel(): string {
        return this._deviceModel;
    }

    set deviceModel(value: string) {
        this._deviceModel = value;
    }

    get filePath(): string {
        return this._filePath;
    }

    set filePath(value: string) {
        this._filePath = value;
    }

    get instruction(): string {
        return this._instruction;
    }

    set instruction(value: string) {
        this._instruction = value;
    }

    get fileSize(): number {
        return this._fileSize;
    }

    set fileSize(value: number) {
        this._fileSize = value;
    }

    get checkMd5(): string {
        return this._checkMd5;
    }

    set checkMd5(value: string) {
        this._checkMd5 = value;
    }

    public toString() {
        return {
            'version': this._version || null,
            'checkMd5': this._checkMd5 || null,
            'type': this._type || null,
            'deviceModel': this._deviceModel || null,
            'filePath': this._filePath || null,
            'instruction': this._instruction || null,
            'fileSize': this._fileSize || null
        };
    }

}
