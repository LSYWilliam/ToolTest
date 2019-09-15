import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {DropDownsInterface} from "../../../../../../shared/component/dropdown/model/dropdowns.model";
import {DeptDropTreeComponent} from "../dept-drop-tree/dept-drop-tree.component";
import {routerTransition} from "../../../../../../animations/route-animations";

interface SearchInterFace {
    value: string;
    label: string;
}

@Component({
    selector: 'app-search-drop-tree',
    templateUrl: './search-drop-tree.component.html',
    styleUrls: ['./search-drop-tree.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})
export class SearchDropTreeComponent {
    @ViewChild(DeptDropTreeComponent) child: DeptDropTreeComponent;

    /** 组件输入 搜索列表的数据 参数 */
    @Input() inData: Array<DropDownsInterface>;
    /** 组件返回内容，返回ID */
    @Output() id: EventEmitter<string> = new EventEmitter<string>();
    /**从父组件获取下拉树结构菜单数据*/
    @Input() dataMenu;
    /**菜单树选中项*/
    @Output() selectedItem: EventEmitter<any> = new EventEmitter<any>();
    /**搜索结果的选中项*/
    chosenValue;

    /**选中搜索列表的具体某一项数据*/
    selectedOption: any;
    /**搜索列表的数据*/
    searchOptions: Array<SearchInterFace> = [];

    constructor() {
    }

    /**
     * 检测组件数据变化的生命周期函数
     * @param {SimpleChanges} changes
     */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.hasOwnProperty('inData')) {
            let current = changes['inData'].currentValue;
            if (current !== undefined) {
                for (let item of current) {
                    this.searchOptions.push(<SearchInterFace> {value: item.id, label: item.name
                    });
                }
                this.id.emit(this.searchOptions[0].value);
            }
        }
    }

    /**
     * 点击搜索列表的具体某一项数据 触发的事件
     * @param data
     */
    onSearch(data) {
        for (let item of this.searchOptions) {
            if (item.value === data) {
                this.chosenValue = item.label;
            }
        }
        this.child.searchDataMenu(this.chosenValue);
        this.id.emit(data);
    }

    /**
     * 菜单树点击
     * @param value
     */
    menuClick(value) {
        this.selectedOption = value.partCode;
        this.selectedItem.emit(value);
    }
}
