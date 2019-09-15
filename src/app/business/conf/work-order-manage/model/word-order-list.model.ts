export class WordOrderListModel {

    /**工单列表 行数据*/
    private _wordOrderTableData: any;

    get wordOrderTableData(): any {
        return this._wordOrderTableData;
    }

    set wordOrderTableData(value: any) {
        this._wordOrderTableData = value;
    }

}
