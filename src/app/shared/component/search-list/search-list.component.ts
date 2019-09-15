import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import {DropDownsInterface} from "../dropdown/model/dropdowns.model";

interface searchInterFace{
    value: string;
    label: string;
    status: boolean;
}

/** 待搜索和菜单的组件
 * @Class SearchListComponent
 */
@Component({
    selector: 'app-search-list',
    templateUrl: './search-list.component.html',
    styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnChanges {
    /** 组件输入 搜索列表的数据 参数 */
    @Input() private inData: Array<DropDownsInterface>;
    /** 组件输入的 添加一项的 参数 */
    @Input() private addData: string;
    /** 组件输入的 删除一项的 参数 */
    @Input() private delData: string;
    /** 组件返回内容，返回ID */
    @Output() private id: EventEmitter<string> = new EventEmitter<string>();
    /**选中搜索列表的具体某一项数据*/
    public selectedOption : any;
    /**搜索列表的数据*/
    public searchOptions: Array<searchInterFace> = [];

    constructor() {}
    /**检测组件数据变化的生命周期函数*/
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.hasOwnProperty('inData')) {
            let current = changes['inData'].currentValue;
            if (current != undefined) {
                for(let item in current) {
                    if (item === '0') {
                        this.searchOptions.push(<searchInterFace> {value: current[item].id, label: current[item].name,status: true});
                    } else {
                        this.searchOptions.push(<searchInterFace> {value: current[item].id, label: current[item].name,status: false});
                    }
                }
                this.id.emit(this.searchOptions[0].value);
            }
        }

        if (changes.hasOwnProperty('addData')) {
            let current = changes['addData'].currentValue;
            if (current != undefined) {
                let tmp = <DropDownsInterface> JSON.parse(current);
                for (let obj of this.searchOptions) {
                    obj.status = false;
                }
                this.searchOptions.push(<searchInterFace> {value: tmp.id, label: tmp.name, status: true});
                this.id.emit(tmp.id);
            }
        }

        if (changes.hasOwnProperty('delData')) {
            let current = changes['delData'].currentValue;
            if (current != undefined) {
                for (let obj in this.searchOptions) {
                    if (this.searchOptions[obj].value == current) {
                        this.searchOptions.splice(Number.parseInt(obj),1);
                        if (this.searchOptions.length > 0) {
                            this.searchOptions[0].status = true;
                            this.id.emit(this.searchOptions[0].value);
                        }
                    }
                }
            }
        }
    }
    /**点击搜索列表的具体某一项数据 触发的事件*/
    public onSearch(data: string){
        for (let item of this.searchOptions) {
            item.status = item.value === data;
        }
        this.id.emit(data);
    }
}
