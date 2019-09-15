export class StaffListHeadModel {
    /**用户table表格 静态数据 接口*/
    private _tableInput: TableInterface;
    /**获取用户table表格 静态数据*/
    get tableInput(): TableInterface {
      this._tableInput = {
          tableHeaderData: [
              {
                  width: 40,
                  suppressFilter: true,
                  rowSelection: "multiple"
              },
              {
                  headerName: 'id',
                  field: 'id',
                  hide: true
              },
              {
                  headerName: '真实姓名',
                  field: 'empName',
                  suppressMenu: true,
                  suppressSorting: true
              },
              {
                  headerName: '个人账号',
                  field: 'empName',
                  suppressMenu: true,
                  suppressSorting: true
              },
              {
                  headerName: '手机号码',
                  field: 'empMobile',
                  suppressMenu: true,
                  suppressSorting: true,
                  cellRenderer:res=> {
                      return res.value?res.value.replace(res.value.substring(3,9),"******"):"";
                  }
              },
              {
                  headerName: '职位',
                  field: 'empPosition',
                  suppressSorting: true
              },
              {
                  headerName: '部门',
                  field: 'deptNameList',
                  suppressMenu: true,
                  suppressSorting: true,
                  suppressFilter:true
              },
              {
                  headerName: '邮箱',
                  field: 'empEmail',
                  suppressMenu: true,
                  suppressSorting: true,
                  suppressFilter:true
              },
              // {
              //     headerName: '入职时间',
              //     field: 'usrRegisterTime',
              //     suppressMenu: true,
              //     suppressSorting: true,
              //     suppressFilter:true
              // },
              // {
              //     headerName: '状态',
              //     field: 'usrWorkStatus',
              //     suppressMenu: true,
              //     suppressSorting: true,
              //     suppressFilter:true
              // }
          ],
          paginationBool: true,
          rightMenu : true,
          sizeEveryPage: 10,
          tableRowHeight: 35
      };
      return this._tableInput;
    }
    /**设置用户table表格 静态数据*/
    set tableInput(value: TableInterface) {
      this._tableInput = value;
    }
}
