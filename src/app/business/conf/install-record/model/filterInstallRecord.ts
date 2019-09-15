export interface FilterInstallRecordInterface {
    workNum?: string;
    enterprise?: string;
    deviceSn?: string;
}

export class FilterInstallRecord {

    private _workNum: string;
    private _enterprise: string;
    private _deviceSn: string;

    constructor () {
        this.workNum = '';
        this.enterprise = '';
        this.deviceSn = '';
    }

    getFliterInstallRecord () {
        return {
            'workNum' : this.workNum,
            'enterprise' : this.enterprise,
            'deviceSn' : this.deviceSn
        };
    }

    getClear() {
        this.workNum = '';
        this.enterprise = '';
        this.deviceSn = '';
    }

    get workNum(): string {
        return this._workNum;
    }

    set workNum(value: string) {
        this._workNum = value;
    }

    get enterprise(): string {
        return this._enterprise;
    }

    set enterprise(value: string) {
        this._enterprise = value;
    }

    get deviceSn(): string {
        return this._deviceSn;
    }

    set deviceSn(value: string) {
        this._deviceSn = value;
    }

}
