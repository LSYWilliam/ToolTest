export class SearchListModel {
    /**搜索列表标题*/
    private _title: any;
    /**搜索列表新增数据*/
    private _addSearchListData: any;
    /**搜索列表删除数据*/
    private _deleteSearchListData: any;
    get title(): any {
        return this._title;
    }
    set title(value: any) {
        this._title = value;
    }
    get addSearchListData(): any {
        return this._addSearchListData;
    }
    set addSearchListData(value: any) {
        this._addSearchListData = value;
    }
    get deleteSearchListData(): any {
        return this._deleteSearchListData;
    }
    set deleteSearchListData(value: any) {
        this._deleteSearchListData = value;
    }
}
