import {Component, Input, Output, EventEmitter, OnChanges, OnInit} from '@angular/core';
import "ag-grid-enterprise";
import {TableModel} from './table.model';
import {TableLocaleModel} from "./model/table-locale.model";
import {NzMessageService} from "ng-zorro-antd";

/**
 * table效果组件
 * @class TableComponent
 */
@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnChanges, OnInit {
    /** 表格数据内容 */
    @Input() public rowData: any;
    /** 接收父组件的传参接口 */
    @Input() private tableInput: TableInterface;
    /** 点击单元格事件 */
    @Output() cellClickEvent: EventEmitter<any> = new EventEmitter<any>();
    /** 复选框点击事件 */
    @Output() selectAllEvent: EventEmitter<any> = new EventEmitter<any>();
    /** 单元格双击事件 */
    @Output() cellDoubleClickEvent: EventEmitter<any> = new EventEmitter<any>();
    /** 行双击事件 */
    @Output() rowDoubleClickEvent: EventEmitter<any> = new EventEmitter<any>();
    /** 返回行的数量 */
    @Output() rowDowLength: EventEmitter<any> = new EventEmitter<any>();
    /**复选框点击删除事件*/
    @Output() rightEventDel: EventEmitter<any> = new EventEmitter<any>();
    /**复选框点击编辑事件*/
    @Output() rightEventEdit: EventEmitter<any> = new EventEmitter<any>();
    /**返回表格数据*/
    @Output() rowDow: EventEmitter<any> = new EventEmitter<any>();
    /**返回表格数据*/
    @Output() editCellData: EventEmitter<any> = new EventEmitter<any>();

    public gridApi;
    private gridColumnApi;
    /**汉化文字*/
    public localeText;
    public tableArgs: TableModel;
    public defaultColDef: any;
    public contextMenuItems;


    constructor(private message: NzMessageService) {
        let vm = this;

        this.defaultColDef = {
            enableCellChangeFlash: true
        };
        /** 设置汉化内容 */
        this.localeText = new TableLocaleModel().localText;

        this.contextMenuItems = function getContextMenuItems(params) {
            let status = vm.getSelectRowNum();
            return [
                {
                    name: "删除",
                    action: function () {
                        vm.setRightEventDel();
                    },
                    cssClasses: ["redFont", "bold"]
                },
                {
                    name: "编辑",
                    action: function () {
                        vm.setRightEventEdit(params);
                    },
                    disabled: status,
                    cssClasses: ["redFont", "bold"]
                },
                "copy",
                "autoSizeAll",
                "resetColumns",
                "export"
            ];
        };
    }

    private getSelectRowNum(): boolean {
        let selectedData = this.gridApi.getBestCostNodeSelection();
        return selectedData.length > 1;
    }

    private setRightEventEdit(params) {
        this.rightEventEdit.emit(params.node);
    }

    private setRightEventDel() {
        if (this.gridApi.getSelectedRows().length > 0) {
            this.rightEventDel.emit(this.gridApi.getSelectedRows());
        } else {
            this.message.warning('请选择需要删除的行!');
        }
    }

    /**点击单元格事件*/
    public cellClick(value) {
        this.cellClickEvent.emit(value);
    }

    public cellDoubleClick(value) {
        this.cellDoubleClickEvent.emit(value);
    }

    public rowDoubleClick(value) {
        this.rowDoubleClickEvent.emit(value);
    }

    /** 表格内部删除操作 */
    public singleDelete() {
        const selectedData = this.gridApi.getSelectedRows();
        this.gridApi.updateRowData({ remove: selectedData });
    }

    /**获取表格全选或者选中的数据节点*/
    public selectAll() {
        let selectedData = this.gridApi.getBestCostNodeSelection();
        this.selectAllEvent.emit(selectedData);
    }

    public getAllData() {
        let rowData = [];

        this.gridApi.forEachNode( function(rowNode, index) {
            rowData.push(rowNode.data);
        });
        this.rowDow.emit(rowData);
    }

    /**向表格内新增数据
     * @param data Array<any>
     *     需要插入的数据数组，重点数组
     */
    public addRow(data: Array<any>) {
        let newItems = [];
        for (let obj of data) {
            newItems.push(obj);
        }

        this.gridApi.updateRowData({
            add: newItems,
            addIndex: 0
        });
    }

    /**编辑某一行数据*/
    public editRow(rowData: any) {
        this.gridApi.updateRowData({ update: [rowData] });
    }
    onCellEditingStopped(event) {
        this.editCellData.emit(event);
    }
    ngOnChanges() {
        if (this.rowData) {
            this.rowDowLength.emit(this.rowData.length);
        }
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.gridApi.setHeaderHeight(35);
        this.gridColumnApi = params.columnApi;
        /**让table表格每一列自适应*/
        this.gridApi.sizeColumnsToFit();
    }

    deselect() {
        this.gridApi.deselectAll();
    }

    ngOnInit() {
        this.tableArgs = new TableModel(this.tableInput);
    }

    onPaginationChanged(value) {
        if(value.newPage) {
            this.deselect();
        }
    }

}
