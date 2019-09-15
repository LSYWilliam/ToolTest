import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {routerTransition} from "../../../../../../animations/route-animations";

@Component({
    selector: 'app-dept-drop-tree',
    templateUrl: './dept-drop-tree.component.html',
    styleUrls: ['./dept-drop-tree.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})
export class DeptDropTreeComponent implements OnInit {

    /**从父组件获取下拉树结构菜单数据*/
    @Input() dataMenu;
    /**向父组件输出点击的每一项菜单数据*/
    @Output() selectedItem: EventEmitter<string> = new EventEmitter<string>();
    rootSelected=true;
    rootOpenFlag=true;

    constructor() {
    }

    /**
     * 点击下拉树结构的每一项菜单
     * @param $event
     * @param item
     */
    menuClick($event, item) {
        this.iteratorSearchTree(res=> {
            res.iSelected=false;
        });
        if(!item) {
            this.rootSelected=true;
            this.selectedItem.emit("组织机构");
        } else {
            this.rootSelected=false;
            item.iSelected=true;
            this.selectedItem.emit(item);
        }
        event.stopPropagation();
    }

    /**
     * 子节点节点点击
     * @param item
     */
    clickNode(item) {
        this.rootSelected=false;
        this.iteratorSearchTree(res=> {
            res.iSelected=false;
        });
        item.iSelected=true;
        this.selectedItem.emit(item);
    }

    /**
     * 搜索数据树，找出对应的节点数据，打开父节点，选中此节点
     * @param value
     */
    searchDataMenu(value) {
        this.rootOpenFlag=true;
        this.closeDropDownTree(this.dataMenu);
        let item,flag=false;
        let searchData = ( tmpArray: Array<any> )=> {
            for(let i=0;i<tmpArray.length;i++) {
                if(tmpArray[i].partName.indexOf(value)>-1) {
                    item=tmpArray[i];
                    flag=true;
                    tmpArray[i].iSelected=true;
                    tmpArray[i].iOpen=true;
                    return;
                } else if(tmpArray[i].childs.length !== 0 ) {
                    searchData(tmpArray[i].childs);
                    if(flag) {
                        tmpArray[i].iOpen=true;
                        break;
                    }
                } else if(i<tmpArray.length ) {
                } else {
                    if(tmpArray[i].parentPartCode) {
                        break;
                    }
                }
            }
        };
        searchData(this.dataMenu);
        if(item) {
            this.clickNode(item);
        }
    }

    /**
     * 关闭下拉树
     * @param tree
     */
    closeDropDownTree(tree) {
        this.iteratorSearchTree(res=> {
            res.iOpen=false;
            res.iSelected=false;
        });
    }

    /**
     * 树迭代操作
     * @param process
     */
    iteratorSearchTree = (process)=> {
        let subIiterator = (subTree) => {
            subTree.forEach(res=> {
                process(res);
                if(res.childs.length !== 0) {
                    subIiterator(res.childs);
                }
            });
        };
        return subIiterator(this.dataMenu);
    }

    ngOnInit() {
    }


}
