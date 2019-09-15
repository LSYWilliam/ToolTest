import {VersionModel} from "./version.model";

export class TableModel {

    /** AP ID */
    private _apId: number;
    /** AP名称 */
    private _apName: string;
    /** AP MAC */
    private _apMac: string;
    /** AP 型号 */
    private _apModel: string;
    /** AP 类型 */
    private _apStatus: number;
    /** AP 类型 ICON */
    private _apStatusIcon: string;
    /** 网络名称 */
    private _netName: string;
    /** 固件版本 */
    private _currentVersionInfo: VersionModel;

    get apId(): number {
        return this._apId;
    }

    set apId(value: number) {
        this._apId = value;
    }

    get apName(): string {
        return this._apName;
    }

    set apName(value: string) {
        this._apName = value;
    }

    get apMac(): string {
        return this._apMac;
    }

    set apMac(value: string) {
        this._apMac = value;
    }

    get apModel(): string {
        return this._apModel;
    }

    set apModel(value: string) {
        this._apModel = value;
    }

    get apStatus(): number {
        return this._apStatus;
    }

    set apStatus(value: number) {
        this._apStatus = value;
    }

    get apStatusIcon(): string {
        return this._apStatusIcon;
    }

    set apStatusIcon(value: string) {
        this._apStatusIcon = value;
    }

    get netName(): string {
        return this._netName;
    }

    set netName(value: string) {
        this._netName = value;
    }

    get currentVersionInfo(): VersionModel {
        return this._currentVersionInfo;
    }

    set currentVersionInfo(value: VersionModel) {
        this._currentVersionInfo = value;
    }

    public toString() {
        return {
            "apId":this.apId || null,
            "apName": this.apName || null,
            "apMac": this.apMac || null,
            "apModel":this.apModel || null,
            "apStatus": this.apStatus || null,
            "apStatusIcon": this.apStatusIcon || null,
            "netName": this.netName || null,
            "currentVersionInfo": this.currentVersionInfo || null
        };
    }

}
