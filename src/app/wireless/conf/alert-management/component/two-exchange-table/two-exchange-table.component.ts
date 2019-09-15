import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AlertReceiverHeadModel} from "../../model/alert-receiver-head.model";
import {NzMessageService} from "ng-zorro-antd";
import {TableComponent} from "../../../../../plugins/component/table/table.component";

@Component({
    selector: 'app-two-exchange-table',
    templateUrl: './two-exchange-table.component.html',
    styleUrls: ['./two-exchange-table.component.scss']
})
export class TwoExchangeTableComponent implements OnInit {
    /** 定义个windowHeight类型 */
    public windowHeight: number;
    @Input() leftTableData: any;
    @Input() rightTableData: any;
    @ViewChild("leftTable") leftChild: TableComponent;
    @ViewChild("rightTable") rightChild: TableComponent;

    @Output() public right2leftEvent: EventEmitter<any> = new EventEmitter<any>();
    @Output() public left2rightEvent: EventEmitter<any> = new EventEmitter<any>();

    /** 返回表格数组 */
    @Output() outputRightData: EventEmitter<any> = new EventEmitter<any>();

    public flag: string;

    public alertReceiverHeadModel: AlertReceiverHeadModel = new AlertReceiverHeadModel();
    public tableInput: any;
    constructor(public _message: NzMessageService) {
        this.tableInput=this.alertReceiverHeadModel.tableInput;
    }

    right2leftClick() {
        this.flag="right2left";
        this.rightChild.selectAll();
    }

    left2rightClick() {
        this.flag="left2right";
        this.leftChild.selectAll();
    }

    selectLeftItems(ids) {
        let array = [];
        for( let item of ids ) {
            array.push(item.data);
        }
        const len = array.length;
        if (len === 0) {
            this._message.create('error', "至少要选中一行，才能进行操作！");
            return;
        }
        switch (this.flag) {
            case 'left2right':
                this.leftChild.singleDelete();
                this.rightChild.addRow(array);
                break;
            case 'right2left':
                this.rightChild.singleDelete();
                this.leftChild.addRow(array);
                break;
        }
    }

    deselect() {
        this.leftChild.deselect();
    }

    selectAllItems(ids) {
        let array = [];
        for( let item of ids ) {
            array.push(item.data);
        }
        const len = array.length;
        if (len === 0) {
            this._message.create('error', "至少要选中一行，才能进行操作！");
            return;
        }
        switch (this.flag) {
            case 'left2right':
                this.leftChild.singleDelete();
                this.rightChild.addRow(array);
                this.leftChild.deselect();
                this.rightChild.deselect();
                break;
            case 'right2left':
                this.rightChild.singleDelete();
                this.leftChild.addRow(array);
                this.leftChild.deselect();
                this.rightChild.deselect();
                break;
        }
    }

    outputTableData() {
        let rowData = [];
        this.rightChild.gridApi.forEachNode( function(rowNode, index) {
            rowData.push(rowNode.data.userId);
        });
        this.outputRightData.emit(rowData);
    }

    ngOnInit() {
        this.windowHeight = window.innerHeight-140;
    }

}
