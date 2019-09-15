import {Component, OnInit, Input} from '@angular/core';
import {routerTransition} from "../../../../animations/route-animations";
import {TableComponent} from "../../../../plugins/component/table/table.component";
import {TableModel} from "../../../../plugins/component/table/table.model";
/**
 * 当日概况模块
 * @class OverviewComponent
*/
@Component
({
    selector: 'app-alert-receiver-list',
    templateUrl: './alert-receiver-list.component.html',
    styleUrls: ['./alert-receiver-list.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})

export class AlertReceiverListComponent implements OnInit  {
    private gridApi;
    private gridColumnApi;

    public columnDefs;
    private rowData;
    public defaultColDef;
    public rowSelection;

    public kindOfAlert:any;
    public operation:any;

    public tableArgs: TableModel;
    constructor() {
      this.kindOfAlert="设备运行-异常上报";
      this.operation="移除";
       /*  this.tableArgs=new TableModel(new TableInterface()); */
      this.columnDefs = [
        {
          headerName: "userName",
          field: "userName"
        },
        {
          headerName: "phoneNo",
          field: "phoneNo"
        },
        {
          headerName: "mail",
          field: "mail"
        },
        {
          headerName: "role",
          field: "role"
        }
      ];
      this.defaultColDef = {
        width: 100,
        headerCheckboxSelection: isFirstColumn,
        checkboxSelection: isFirstColumn
      };
      this.rowSelection = "multiple";
    }

    onQuickFilterChanged() {
      this.gridApi.setQuickFilter(document.getElementById("quickFilter")['value']);
    }

    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      let data=[{userName:"abc",phoneNo:"123",mail:"cdf",role:"def"},
        {userName:"abc123",phoneNo:"123",mail:"cdf",role:"def"},
        {userName:"abcqw",phoneNo:"123",mail:"cdf",role:"def"},
        {userName:"abced",phoneNo:"123",mail:"cdf",role:"def"}];
      params.api.setRowData(data);
    }

    ngOnInit() {}
  }

  function isFirstColumn(params) {
    let displayedColumns = params.columnApi.getAllDisplayedColumns();
    let thisIsFirstColumn = displayedColumns[0] === params.column;
    return thisIsFirstColumn;
  }
