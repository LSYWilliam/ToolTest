import { DropDownsInterface } from "../../../../shared/component/dropdown/model/dropdowns.model";

export class ApListModel {
    /** 网络下拉框 */
    private _dropDowns: Array<DropDownsInterface>;
    /** 网络设备数 */
    private _apNum: number;
    /** 表格数据 */
    private _tableData: any;

    get dropDowns(): Array<DropDownsInterface> {
        return this._dropDowns;
    }

    set dropDowns(value: Array<DropDownsInterface>) {
        this._dropDowns = value;
    }

    get apNum(): number {
        return this._apNum;
    }

    set apNum(value: number) {
        this._apNum = value;
    }

    get tableData(): any {
        return this._tableData;
    }

    set tableData(value: any) {
        this._tableData = value;
    }
}
