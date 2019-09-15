export class RoleHeadDataModel {
    /**table表格字段数据 接口*/
    private _tableInput: TableInterface;
    /**获取table表格字段数据*/
    get tableInput(): TableInterface {
      this._tableInput = {
          tableHeaderData: [
                {
                    headerName: '',
                    field: 'permissionId',
                    width: 50,
                    hide: true
                },
                {
                    headerName: '',
                    field: 'editAuthority',
                    width: 50,
                    hide: true
                },
                {
                    headerName: '',
                    field: 'searchAuthority',
                    width: 50,
                    hide: true
                },
                {
                    headerName: "页面名称",
                    field: "pageName",
                    width: 150,
                    suppressResize: true,
                    suppressMenu:true,
                    suppressSorting: true
                },
                {
                    headerName: "编辑权限",
                    field: "editAuthDisplay",
                    width: 150,
                    suppressResize: true,
                    suppressMenu:true,
                    suppressSorting: true
                },
                {
                    headerName: "查询权限",
                    field: "searchAuthDisplay",
                    width: 696,
                    suppressResize: true,
                    suppressMenu:true,
                    suppressSorting: true
                }],
                paginationBool: false,
                sizeEveryPage: 2,
                tableRowHeight: 35,
                tableStyle: {}
      };
      return this._tableInput;
    }
    /**设置table表格字段数据*/
    set tableInput(value: TableInterface) {
      this._tableInput = value;
    }
}
