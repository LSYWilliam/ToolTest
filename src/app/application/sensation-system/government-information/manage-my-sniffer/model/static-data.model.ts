export class StaticDataModel {
    /**我的主题表格字段数据 接口*/
    private _myThemeTableInput: TableInterface;
    /**获取我的主题表格字段*/
    get myThemeTableInput(): TableInterface {
        this._myThemeTableInput = {
            tableHeaderData: [
                {
                    headerCheckboxSelection: true,
                    checkboxSelection: true,
                    width: 40,
                    suppressFilter: true,
                    suppressMenu:true,
                    suppressSorting:true

                },
                {
                    headerName: '主题名称',
                    field: 'teName',
                    suppressMenu:true,
                    suppressSorting:true
                },
                {
                    headerName: '创建日期',
                    field: 'teCreateTime',
                    suppressMenu:true
                }
            ],
            rightMenu : false,
            paginationBool: true,
            sizeEveryPage: 13,
            tableRowHeight: 35
        };
        return this._myThemeTableInput;
    }
    /**设置商家表格字段*/
    set myThemeTableInput(value: TableInterface) {
        this._myThemeTableInput = value;
    }
}
