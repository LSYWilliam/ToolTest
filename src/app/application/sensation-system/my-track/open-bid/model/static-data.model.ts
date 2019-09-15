import {CommonLinkComponent} from "../../../../../plugins/component/table/commonLink/commonLink.component";
import {OperateComponent} from "../../../../../plugins/component/table/operate/operate.component";

export class StaticDataModel {
    /**查看我的主题表格字段数据 接口*/
    private _myThemeTableInput: TableInterface;
    /**获取查看我的主题表格字段*/
    get myThemeTableInput(): TableInterface {
        this._myThemeTableInput = {
            tableHeaderData: [
                // {
                //     headerCheckboxSelection: false,
                //     checkboxSelection: false,
                //     width: 40,
                //     suppressFilter: true,
                //     suppressMenu:true,
                //     suppressSorting:true
                //
                // },
                {
                    headerName: '文件名称',
                    field: 'collectTitle',
                    cellRendererFramework: CommonLinkComponent,
                    suppressMenu:true,
                    suppressSorting:true,
                    tooltip: res=> {
                        return res.value?`${res.value}`:``;
                    }
                },
                {
                    headerName: '发布时间',
                    field: 'collectPublishTime',
                    suppressMenu:true,
                    suppressSorting:true
                },
                {
                    headerName: '开标时间',
                    field: 'collectTime',
                    suppressMenu:true,
                    suppressSorting:true
                },
                {
                    headerName: '距离开标',
                    field: 'collectToDay',
                    suppressMenu:true,
                    suppressSorting:true
                }
            ],
            rightMenu : false,
            paginationBool: true,
            sizeEveryPage: 13,
            tableRowHeight: 35
        };
        return this._myThemeTableInput;
    }

    /**设置我的主题表格字段*/
    set myThemeTableInput(value: TableInterface) {
        this._myThemeTableInput = value;
    }
}
