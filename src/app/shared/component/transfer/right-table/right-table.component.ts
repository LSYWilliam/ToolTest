import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {TableComponent} from "../../../../plugins/component/table/table.component";
/**
 * 右边组件(即已选设备模块)模块
 * @class RightTableComponent
 */
@Component({
  selector: 'app-right-table',
  templateUrl: './right-table.component.html',
  styleUrls: ['./right-table.component.scss']
})
export class RightTableComponent implements OnInit {
    /**获取右边表格中的数据*/
    private rightSelectedData: any;
    /**右边表格的数据长度*/
    private selectDeviceNumber: any;
    /**右边table表头字段*/
    @Input() public leftTableInput: any;
    /**右边table表行数据*/
    @Input() public rowDataRight: any;
    /**输出右边行数据*/
    @Output() rowDow: EventEmitter<any> = new EventEmitter<any>();
    /**在父组件中引入table组件*/
    @ViewChild(TableComponent) child: TableComponent;
    constructor() {
    }
    /**获取表格选中的数据*/
    selectAllEventRight(value) {
        this.rightSelectedData = value;
    }
    /**触发选中数据的方法*/
    selectEvent() {
        this.child.selectAll();
    }
    /**选中的数据*/
    selectedData() {
        return this.rightSelectedData;
    }
    /**删除表格中的数据*/
    deleteData() {
        this.child.singleDelete();
    }
    /**获取右边表格的数据长度*/
    rowDowRight(value) {
        this.selectDeviceNumber = value.length;
        this.rowDow.emit(value);
    }
    /**双击表格*/
    doubleClick(data: any){
        this.rowDow.emit(data);
    }
    /**添加数据到表格中*/
    addTableData(value) {
        this.child.addRow(value);
    }
    /**页面初始化数据*/
    ngOnInit() {
    }

}
