export class ApplicationStoreModel {
    private _tableData: Array<ApplicationItem> = [];

    get tableData(): Array<ApplicationItem> {
        return this._tableData;
    }

    set tableData(value: Array<ApplicationItem>) {
        this._tableData = value;
    }
}
export class ApplicationItem {
    id?;
    name?;
    desc?;
    url?;
    picture?;
}
