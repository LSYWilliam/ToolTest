import {OperationComponent} from "../../../../../plugins/component/table/operation/operation.component";

export class UserHeadDataModel {
    /**用户table表格 静态数据 接口*/
    private _tableInput: TableInterface;
    /**获取用户table表格 静态数据*/
    get tableInput(): TableInterface {
      this._tableInput = {
          tableHeaderData: [
              {
                  headerCheckboxSelection: true,
                  checkboxSelection: true,
                  width: 40,
                  suppressFilter: true,
                  rowSelection: "multiple"
              },
              {
                  headerName: 'userId',
                  field: 'userId',
                  hide: true
              },
              {
                  headerName: 'peakConcurrentUsers',
                  field: 'peakConcurrentUsers',
                  hide: true
              },
              {
                  headerName: 'businessId',
                  field: 'businessId',
                  hide: true
              },
              {
                  headerName: 'userStatus',
                  field: 'userStatus',
                  hide: true
              },
              {
                  headerName: 'rolesStr',
                  field: 'rolesStr',
                  hide: true
              },
              {
                  headerName: 'roles',
                  field: 'roles',
                  hide: true
              },
              {
                  headerName: 'roleId',
                  field: 'roleId',
                  hide: true
              },
              {
                  headerName: '用户名',
                  field: 'username',
                  suppressMenu: true,
                  suppressSorting: true
              },
              {
                  headerName: '联系人',
                  field: 'contactName',
                  suppressMenu: true,
                  suppressSorting: true
              },
              {
                  headerName: '电话',
                  field: 'contactTele',
                  suppressMenu: true,
                  suppressSorting: true,
                  cellRenderer:res=> {
                      return res.value?res.value.replace(res.value.substring(3,9),"******"):"";
                  }
              },
              {
                  headerName: '邮箱',
                  field: 'contactEmail',
                  menuTabs: ["filterMenuTab"],
                  filter: "agTextColumnFilter",
                  suppressSorting: true
              },
              {
                  headerName: '企业',
                  field: 'businessName',
                  suppressMenu: true,
                  suppressSorting: true,
                  suppressFilter:true
              },
              {
                  headerName: '创建时间',
                  field: 'createTime',
                  suppressMenu: true,
                  suppressSorting: true,
                  suppressFilter:true
              },
              {
                  headerName: '最近登录时间',
                  field: 'latestLoginTime',
                  suppressMenu: true,
                  suppressSorting: true,
                  suppressFilter:true
              },
              {
                  headerName: 'IP地址',
                  field: 'ipAddress',
                  suppressMenu: true,
                  suppressSorting: true,
                  suppressFilter:true
              },
              {
                  headerName: '状态',
                  field: 'userStatusStr',
                  suppressMenu: true,
                  suppressSorting: true,
                  suppressFilter:true
              },
              {
                  headerName: '角色',
                  field: 'roleName',
                  menuTabs: ["filterMenuTab"],
                  filter: "agTextColumnFilter",
                  suppressSorting: true
              },
              {
                  headerName: '操作',
                  field: 'operation',
                  suppressFilter:true,
                  suppressMenu: true,
                  suppressSorting: true,
                  cellRendererFramework: OperationComponent
              }
          ],
          paginationBool: true,
          rightMenu : true,
          sizeEveryPage: 13,
          tableRowHeight: 35
      };
      return this._tableInput;
    }
    /**设置用户table表格 静态数据*/
    set tableInput(value: TableInterface) {
      this._tableInput = value;
    }
}
