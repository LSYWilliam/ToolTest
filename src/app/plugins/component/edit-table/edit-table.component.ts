import {Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {EditTableModel} from './edit-table.model';
/**
 * table效果组件
 * @class EditTableComponent
 */

@Component({
    selector: 'app-edit-table',
    templateUrl: './edit-table.component.html',
    styleUrls: ['./edit-table.component.scss']
})
export class EditTableComponent implements  OnInit {
    private gridApi: any;
    private gridColumnApi: any;
    public getRowNodeId: any;
    /**table表行数据*/
    @Input() public rowData: any;
    /**接收父组件的传参接口*/
    @Input() private editTableInput: EditTableInterface;
    /**点击单元格事件*/
    @Output() cellStopEditEvent: EventEmitter<any> = new EventEmitter<any>();
    /**在点击新增或者删除的时候实时返回表格数据事件*/
    @Output() getTableRowDataEvent: EventEmitter<any> = new EventEmitter<any>();
    /**点击删除返回删除的数据*/
    @Output() getDeleteTableRowDataEvent: EventEmitter<any> = new EventEmitter<any>();
    public editTableArgs: EditTableModel;
     constructor() {
         this.getRowNodeId = (data) => {
             // return data.rowId;
             return data.id;
         };
    }
    /**新增一行表格数据*/
    addRow(value, keyCol) {
        this.gridApi.updateRowData({ add: [value] });
        this.gridApi.setFocusedCell(this.rowData.length, keyCol);
        this.gridApi.startEditingCell({
            rowIndex: this.rowData.length,
            colKey: keyCol
        });
        this.rowData.push(value);
        this.getTableRowDataEvent.emit(this.rowData);
    }
    /**删除选中的行数据*/
    deleteRow() {
        const selectedData = this.gridApi.getSelectedRows();
        const res = this.gridApi.updateRowData({ remove: selectedData });
        this.getDeleteTableRowDataEvent.emit(selectedData);
        /**如果updateRowData是假删的话，执行下面的(下面的代码只适合一次性删除多行)*/
        res.remove.forEach((rowNode, i) => {
            if (i === 0) {
                this.rowData.splice(rowNode.rowIndex, 1);
            } else {
                this.rowData.splice( --rowNode.rowIndex, 1);
            }
        });
        this.getTableRowDataEvent.emit(this.rowData);
    }
    /**当在单元格下面按下回车键之后,即验证当前数据是否正确*/
    onCellEditingStopped(value) {
        this.cellStopEditEvent.emit( value );
    }
    /**清空单元格里面的值*/
    emptyCellValue(id, colKey) {
        const rowNode = this.gridApi.getRowNode(id);
        rowNode.setDataValue(colKey, '');
    }
    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    }
    ngOnInit() {
        this.editTableArgs = new EditTableModel(this.editTableInput);
    }
}
