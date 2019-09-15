import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { TreeTableModel } from './tree-table.module';

/**
 * 树形table效果组件
 * @class TreeTableComponent
 */
@Component({
    selector: 'app-tree-table',
    templateUrl: './tree-table.component.html',
    styleUrls: ['./tree-table.component.scss']
})
export class TreeTableComponent implements OnInit {

    private gridApi;
    private gridColumnApi;

    private groupDefaultExpanded;

    /**设置为树形表格*/
    public getNodeChildDetails;

    /**是否允许复选*/
    public rowSelection;

    /**表格Data*/
    @Input() public rowData: any;

    /**接收父组件的传参接口*/
    @Input() private treeTableInput: TreeTableInterface;

    /** 复选框点击事件 */
    @Output() selectAllEvent: EventEmitter<any> = new EventEmitter<any>();
    /** 复选框子节点事件 */
    @Output() selectSubEvent: EventEmitter<any> = new EventEmitter<any>();
    /** 点击单元格事件 */
    @Output() cellClickEvent: EventEmitter<any> = new EventEmitter<any>();
    /** 返回表格数据 */
    @Output() outputData: EventEmitter<any> = new EventEmitter<any>();

    /**设置表格*/
    public treeTableArgs: TreeTableModel;

    constructor() {
        this.groupDefaultExpanded=-1;
        /**复选框可选择多行*/
        this.rowSelection = 'multiple';

        this.getNodeChildDetails = function getNodeChildDetails(rowItem) {
            if (rowItem.participants) {
                return {
                    group: true,
                    expanded: true,
                    children: rowItem.participants,
                    key: rowItem.group
                };
            } else {
                return null;
            }
        };
    }

    /**获取表格全选或者选中的数据节点*/
    public selectAll() {
        let selectedData = this.gridApi.getBestCostNodeSelection();
        this.selectAllEvent.emit(selectedData);
    }

    public selectSubNodes() {
        let selectedSubNodes = this.gridApi.getSelectedNodes();
        this.selectSubEvent.emit(selectedSubNodes);
    }

    /**点击单元格事件*/
    public cellClick(value) {
        this.cellClickEvent.emit(value);
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        params.api.sizeColumnsToFit();
        if(this.rowData) {
            this.rowData.forEach(function(dataItem, index) {
                dataItem.rowHeight =200;
            });
        }
    }

    outputTableData() {
        let rowData = [];
        this.gridApi.forEachNode( function(rowNode, index) {
            rowData.push(rowNode.data);
        });
        this.outputData.emit(rowData);
    }

    ngOnInit() {
        this.treeTableArgs = new TreeTableModel(this.treeTableInput);
    }
}
