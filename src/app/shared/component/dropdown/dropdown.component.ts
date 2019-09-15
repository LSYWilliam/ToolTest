import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { DropDownsInterface } from "./model/dropdowns.model";


/**
 * table效果组件
 * @class EditTableComponent
 */

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss']
})
export class DropDownComponent implements  OnChanges {
    /**下拉组件 默认值*/
    public defaultValue : string;
    /**下拉组件 下拉列表数据*/
    public value: Array<DropDownsInterface>;
    /**下拉组件输入数据 接口*/
    @Input() public dropDowns : Array<DropDownsInterface>;
    /**下拉组件输入默认数据*/
    @Input() public inDefault: string;
    /**下拉组件输入状态(开启 or 禁用)*/
    @Input() public status: boolean;
    /**下拉组件元素个数*/
    @Input() public dropDownItemNumber: number;
    /**下拉组件长度*/
    public dropHeight: number;
    /**输出下拉组件 选中某一项的id*/
    @Output() public selectID = new EventEmitter<string>();
    /**输出下拉组件 选中某一项的名称*/
    @Output() public selectValue = new EventEmitter<string>();
    /**一个下拉组件元素高度*/
    public itemHeight = 33;

    constructor() {}
    /**检测组件数据变化的生命周期函数*/
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.hasOwnProperty('dropDowns')) {
            let dropDown = changes['dropDowns'].currentValue;
            if (dropDown != undefined) {
                this.value = dropDown;
            }
        }

        if (changes.hasOwnProperty('dropDownItemNumber')) {
            let dropDownItemNumber = changes['dropDownItemNumber'].currentValue;
            if (dropDownItemNumber != undefined) {
                this.dropHeight = dropDownItemNumber>0?this.itemHeight*dropDownItemNumber:this.itemHeight*1;
            }
        }

        if (changes.hasOwnProperty("inDefault")) {
            this.defaultValue = changes['inDefault'].currentValue;
        } else {
            if (this.value && this.value.length > 0) {
                this.defaultValue = this.value[0].name;
            }
        }
    }
    /**点击下拉组件 下拉的某一项触发的事件*/
    selectDropDown(data) {
        this.defaultValue = data.name;
        this.selectID.emit(data.id);
        this.selectValue.emit(data.name);
    }
}
