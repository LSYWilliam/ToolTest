import {UpdateTableModel} from "./update-table.model";

export class FirmwareManagementModel {

    /** 版本管理表格列表 */
    private _tableData: any;
    /** 版本详情 */
    private _versionDetails: any;
    /** 版本更新列表 */
    private _upadteNote: Array<UpdateTableModel> = [];

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

    get upadteNote(): Array<UpdateTableModel> {
        return this._upadteNote;
    }

    set upadteNote(value: Array<UpdateTableModel>) {
        this._upadteNote = value;
    }

}
