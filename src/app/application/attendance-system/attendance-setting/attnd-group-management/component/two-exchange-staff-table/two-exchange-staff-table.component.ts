import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {TableComponent} from "../../../../../../plugins/component/table/table.component";
import {NzMessageService} from "ng-zorro-antd";
import {routerTransition} from "../../../../../../animations/route-animations";

@Component({
    selector: 'app-two-exchange-staff-table',
    templateUrl: './two-exchange-staff-table.component.html',
    styleUrls: ['./two-exchange-staff-table.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})
export class TwoExchangeStaffTableComponent implements OnInit {
    @ViewChild("leftTable") leftChild: TableComponent;
    @ViewChild("rightTable") rightChild: TableComponent;

    /**数据元输入*/
    @Input() tableInput: any;

    /**双向绑定的左侧表格数据*/
    _leftTableData: any;
    @Input()
    get leftTableData() {
        return this._leftTableData;
    }
    set leftTableData(val: boolean) {
        this._leftTableData = val;
        this.leftTableDataChange.emit(this._leftTableData);
    }
    @Output() leftTableDataChange = new EventEmitter<any>();

    /**双向绑定的右侧表格数据*/
    _rightTableData: any;
    @Input()
    get rightTableData() {
        return this._rightTableData;
    }
    set rightTableData(val: boolean) {
        this._rightTableData = val;
        this.rightTableDataChange.emit(this._rightTableData);
    }
    @Output() rightTableDataChange = new EventEmitter<any>();

    /**数据在两个表格之间转移的输出事件*/
    @Output() right2leftEvent: EventEmitter<any> = new EventEmitter<any>();
    @Output() left2rightEvent: EventEmitter<any> = new EventEmitter<any>();

    /**选择全部的数据的双向绑定*/
    _allChosedData: any;
    @Input()
    get allChosedData() {
        return this._allChosedData;
    }
    set allChosedData(val: boolean) {
        this._allChosedData = val;
        this.allChosedDataChange.emit(this._allChosedData);
    }
    @Output() allChosedDataChange = new EventEmitter<any>();

    flag: string;

    constructor(public _message: NzMessageService) {
    }

    /**
     * 右边数据到左边的点击
     */
    right2leftClick() {
        this.flag = "right2left";
        this.rightChild.selectAll();
    }

    /**
     * 左边数据到右边的点击
     */
    left2rightClick() {
        this.flag = "left2right";
        this.leftChild.selectAll();
    }

    /**
     * 选择左边数据
     * @param ids
     */
    selectLeftItems(ids) {
        let array = [];
        for (let item of ids) {
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

    /**
     * 取消选中
     */
    deselect() {
        this.leftChild.deselect();
    }

    /**
     * 选中数据
     * @param ids
     */
    selectAllItems(ids) {
        let array = [];
        for (let item of ids) {
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
                this.allChosedDataIncrease(array);
                break;
            case 'right2left':
                this.rightChild.singleDelete();
                this.leftChild.addRow(array);
                this.leftChild.deselect();
                this.rightChild.deselect();
                this.allChosedDataDecrease(array);
                break;
        }

    }

    /**
     * 所选的数据增加
     * @param array
     */
    allChosedDataIncrease(array) {
        this.allChosedData = this._allChosedData.concat(array);
    }

    /**
     * 所选的数据减少
     * @param array
     */
    allChosedDataDecrease(array) {
        array.forEach(res => {
            let index = this._allChosedData.findIndex(glt => {
                return glt.usrId == res.usrId;
            });
            if (index > -1) {
                this._allChosedData.splice(index, 1);
            }
        });
    }

    ngOnInit() {
    }

}
