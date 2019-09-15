export class BusinessListModel {
    /**商户列表 行数据*/
    private _businessTableData: any;
    /**获取商户列表 行数据*/
    get businessTableData(): any {
        return this._businessTableData;
    }
    /**设置商户列表 行数据*/
    set businessTableData(value: any) {
        this._businessTableData = value;
    }
}
