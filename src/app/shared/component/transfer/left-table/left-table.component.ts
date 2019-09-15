import {
    Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges,
    ViewChild
} from '@angular/core';
import {TableComponent} from "../../../../plugins/component/table/table.component";
/**
 * 左边组件(即可选设备模块)模块
 * @class LeftTableComponent
 */
@Component({
  selector: 'app-left-table',
  templateUrl: './left-table.component.html',
  styleUrls: ['./left-table.component.scss']
})
export class LeftTableComponent implements OnInit, OnChanges {
    /**左边表格选中的数据*/
    private leftSelectedData: any;
    /**左边表格的数据长度*/
    public allowAddDeviceNumber: number;
    /**左边table表头字段*/
    @Input() public leftTableInput: any;
    /**左边table表行数据*/
    @Input() public rowDataLeft: any;
    @Output() rowDow: EventEmitter<any> = new EventEmitter<any>();
    /**在父组件中引入table组件*/
    @ViewChild(TableComponent) child: TableComponent;

    /**获取左边表格选中的数据*/
    selectAllEventLeft(value) {
        this.leftSelectedData = value;
    }
    /**触发选中数据的方法*/
    selectEvent() {
        this.child.selectAll();
    }
    /**选中的数据*/
    selectedData() {
        return this.leftSelectedData;
    }
    /**删除表格中的数据*/
    deleteData() {
        this.child.singleDelete();
    }
    /**添加数据到表格中*/
    addTableData(value) {
        this.child.addRow(value);
    }
    /**获取左边表格的数据长度*/
    rowDowLeft(value) {
        this.allowAddDeviceNumber = value.length;
    }
    /**双击表格数据*/
    doubleClick(data: any){
        this.rowDow.emit(data);
    }
    /**监听组件表格内容是否改变的 生命周期函数*/
    ngOnChanges(changes: SimpleChanges): void {
    }
    /**页面初始化数据*/
    ngOnInit() {
    }

}
