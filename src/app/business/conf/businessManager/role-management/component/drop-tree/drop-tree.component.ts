import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
/**
 * 下拉树模块
 * @class DropTreeComponent
 */
@Component({
  selector: 'app-drop-tree',
  templateUrl: './drop-tree.component.html',
  styleUrls: ['./drop-tree.component.scss']
})
export class DropTreeComponent implements OnInit {
    /**从父组件获取下拉树结构菜单是横向展示还是竖向展示*/
    @Input() public isCollapsed;
    /**从父组件获取下拉树结构菜单数据*/
    @Input() public dataMenu;
    /**向父组件输出点击的每一项菜单数据*/
    @Output() public selectedItem: EventEmitter<string> = new EventEmitter<string>();
    /**展开并选中数据*/
    @Input() public item;

    constructor() { }
    /**点击下拉树结构的每一项菜单*/
    menuClick($event,item) {
        let list=document.getElementsByClassName("custom-menu-selected");
        for(let i=0;i<list.length;i++) {
            list[i].setAttribute("class","");
        }
        $event.target.setAttribute("class","custom-menu-selected");
        this.selectedItem.emit(item);
    }
    /**页面数据初始化*/
    ngOnInit() {

    }

    searchDataMenu() {
    }

    searchData(value,item) {
        if(item.permissionName.indexOf(value)>0) {
            return item;
        } else {
            if(item.children !=null){
                item.children.forEach(glt=>{
                   this.searchData(glt,value);
                });
            } else {
                return;
            }
        }
    }
}
