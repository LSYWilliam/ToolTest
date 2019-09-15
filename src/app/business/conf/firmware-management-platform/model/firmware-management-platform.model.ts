export class FirmwareManagementPlatformModel {

    /** 服务器地址 */
    private _fileUploadServer: string;
    /** 版本列表数据 */
    private _tableData: any;
    /** 版本详情 */
    private _versionDetails: any;

    get fileUploadServer(): string {
        return this._fileUploadServer;
    }

    set fileUploadServer(value: string) {
        this._fileUploadServer = value;
    }

    get tableData(): any {
        return this._tableData;
    }

    set tableData(value: any) {
        this._tableData = value;
    }

    get versionDetails(): any {
        return this._versionDetails;
    }

    set versionDetails(value: any) {
        this._versionDetails = value;
    }

}
