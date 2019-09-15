export class ExchangeStaffHead {

    private _tableInput: TableInterface;

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
                    headerName: 'id',
                    field: 'id',
                    hide: true
                },
                // {
                //     headerName: 'usrMac',
                //     field: 'usrMac',
                //     hide: true
                // },
                {
                    headerName: '真实姓名',
                    field: 'empName',
                    suppressMenu: true,
                    suppressSorting: true
                },
                // {
                //     headerName: '个人账号',
                //     field: 'empName',
                //     suppressMenu: true,
                //     suppressSorting: true,
                //     hide: true
                // },
                // {
                //     headerName: '手机号码',
                //     field: 'empMobile',
                //     suppressMenu: true,
                //     suppressSorting: true,
                //     hide: true,
                //     cellRenderer:res=> {
                //         return res.value.replace(res.value.substring(3,9),"******");
                //     }
                // },
                // {
                //     headerName: '职位',
                //     field: 'empPosition',
                //     suppressSorting: true,
                //     hide: true
                // },
                // {
                //     headerName: '部门',
                //     field: 'partName',
                //     suppressMenu: true,
                //     suppressSorting: true,
                //     suppressFilter:true,
                //     hide: true
                // },
                // {
                //     headerName: '邮箱',
                //     field: 'empEmail',
                //     suppressMenu: true,
                //     suppressSorting: true,
                //     suppressFilter:true,
                //     hide: true
                // },
                // {
                //     headerName: '入职时间',
                //     field: 'usrRegisterTime',
                //     suppressMenu: true,
                //     suppressSorting: true,
                //     suppressFilter:true,
                //     hide: true
                // },
                // {
                //     headerName: '状态',
                //     field: 'usrWorkStatus',
                //     suppressMenu: true,
                //     suppressSorting: true,
                //     suppressFilter:true,
                //     hide: true
                // }
            ],
            sizeEveryPage: 10,
            tableRowHeight: 35,
            tableStyle: {
                height: "410px"
            }
        };
        return this._tableInput;
    }

    set tableInput(value: TableInterface) {
        this._tableInput = value;
    }
}
