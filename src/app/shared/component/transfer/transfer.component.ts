import {
    Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges,
    ViewChild
} from '@angular/core';
import {LeftTableComponent} from "./left-table/left-table.component";
import {RightTableComponent} from "./right-table/right-table.component";
import {NzMessageService} from "ng-zorro-antd";
/**
 * 穿梭组件模块
 * @class TransferComponent
 */
@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnChanges {
    /**左边表格(可选设备)长度*/
    public leftData: any;
    /**右边表格(已用设备)长度*/
    public rightData: any;
    public dataIDList: any = {};
    /**已用设备的长度*/
    public useDevice: number;
    /**可选设备的长度*/
    public unUserDevice: number;
    /**左右表格静态数据*/
    @Input() public leftTableInput: any;
    /**左边表格(可选设备)表格数据*/
    @Input() public rowDataLeft: any;
    /**右边表格(已用设备)表格数据*/
    @Input() public rowDataRight: any;

    @Input() public idName: string;
    /**穿梭组件 输出 具体向左表格和向右表格删除和添加了哪些数据*/
    @Output() outData: EventEmitter<any> = new EventEmitter<any>();
    /**父组件引入左边表格(可选设备)表格组件*/
    @ViewChild(LeftTableComponent) childLeft: LeftTableComponent;
    /**父组件引入右边表格(已用设备)表格组件*/
    @ViewChild(RightTableComponent) childRight: RightTableComponent;

    constructor(private message: NzMessageService) {}
    /**设置左右表格每一项行数据的的idName的值设置为属性，且该属性值设置为0*/
    private setListID(status: number) {
        let data = status === 1? this.leftData : this.rightData;
        for (let obj of data) {
            this.dataIDList[obj[this.idName]] = 0;
        }
    }
    /**点击向左，向右箭头数据在左右表格中间穿梭*/
    public convert(status : boolean) {
        let delTable = status === true? this.childLeft : this.childRight;
        let addTable =  status === true? this.childRight : this.childLeft;
        let delTableNum = status === true? this.unUserDevice : this.useDevice;
        let addTableNum = status === true? this.useDevice : this.unUserDevice;

        delTable.selectEvent();
        let selectData = delTable.selectedData();
        if (selectData.length <= 0) {
            let info = status === true? '添加' : '删除';
            this.message.warning('请选择需要'+ info + '的行');
        } else {
            let tmp = [];
            for (let item of selectData) {
                tmp.push(item['data']);
                this.dataIDList[item['data'][this.idName]] = status === true ? this.dataIDList[item['data'][this.idName]] + 1 : this.dataIDList[item['data'][this.idName]] - 1;
            }
            delTable.deleteData();
            addTable.addTableData(tmp);
            delTableNum = delTableNum - selectData.length;
            addTableNum = addTableNum + selectData.length;
            this.setOutPut();
        }

        if (status === true) {
            this.unUserDevice = delTableNum;
            this.useDevice = addTableNum;
        } else {
            this.unUserDevice = addTableNum;
            this.useDevice = delTableNum;
        }
    }
    /**双击右边表格(即已选设备表格)*/
    public rightDoubleClick(data: any){
        this.unUserDevice = this.unUserDevice + 1;
        this.useDevice = this.useDevice - 1;
        this.dataIDList[data['data'][this.idName]] = this.dataIDList[data['data'][this.idName]] - 1;
        this.childLeft.addTableData([data['data']]);
        this.childRight.deleteData();
        this.setOutPut();
    }
    /**双击左边表格(即可选设备表格)*/
    public leftDoubleClick(data: any) {
        this.unUserDevice = this.unUserDevice - 1;
        this.useDevice = this.useDevice + 1;
        this.dataIDList[data['data'][this.idName]] = this.dataIDList[data['data'][this.idName]] + 1;
        this.childRight.addTableData([data['data']]);
        this.childLeft.deleteData();
        this.setOutPut();
    }
    /**计算穿梭组件具体向左表格和向右表格删除和添加了哪些数据*/
    private setOutPut() {
        let data = {'del':[], 'add':[]};
        for (let obj in this.dataIDList) {
            if (this.dataIDList[obj] === 1) {
                data.add.push(obj);
            } else if (this.dataIDList[obj] === -1) {
                data.del.push(obj);
            }
        }
        this.outData.emit(data);
    }

    /**清空数据*/
    emptyData() {
        let data = {'del':[], 'add':[]};
        if (this.leftData != undefined) {
            this.setListID(1);
            this.unUserDevice = this.leftData.length;
        } else {
            this.unUserDevice = 0;
        }

        if (this.rightData != undefined) {
            this.setListID(2);
            this.useDevice = this.rightData.length;
        } else {
            this.useDevice = 0;
        }
        this.outData.emit(data);
    }
    /**监听组件表格内容是否改变的 生命周期函数*/
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.hasOwnProperty('rowDataLeft') && changes.hasOwnProperty('rowDataRight')) {
            this.leftData = changes['rowDataLeft'].currentValue;
            this.rightData = changes['rowDataRight'].currentValue;

            if (this.leftData != undefined) {
                this.setListID(1);
                this.unUserDevice = this.leftData.length;
            } else {
                this.unUserDevice = 0;
            }

            if (this.rightData != undefined) {
                this.setListID(2);
                this.useDevice = this.rightData.length;
            } else {
                this.useDevice = 0;
            }
        }
    }
}
