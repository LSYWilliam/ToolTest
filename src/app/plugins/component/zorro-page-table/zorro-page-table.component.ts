import {
    Component,
    EventEmitter,
    Input, OnChanges,
    OnInit,
    Output
} from '@angular/core';

/**
 * zorroTable效果组件
 * @class ZorroPageTableComponent
 */
@Component({
    selector: 'app-zorro-page-table',
    templateUrl: './zorro-page-table.component.html',
    styleUrls: ['./zorro-page-table.component.scss']
})
export class ZorroPageTableComponent implements  OnChanges, OnInit {
  /**搜索值*/
  private searchValue: any;
  /**编辑哪一行*/
  public editCache= {};
    /**编辑哪一列*/
  public editColCache= {};
  /**是否全选*/
  public allChecked: boolean;
  /**当前页码*/
  // public current: number;
  @Input() public current: number;
  /**重置的内容*/
  @Input() public resetArray: any;
  /**表格数据*/
  @Input() public dataSet: any;
  /**表格头部字段数据*/
  @Input() public headData: any;
  /**是否选中复选框*/
  @Input() public isCheckBox: any;
  /**当前每页大小*/
  @Input() public pageSize: any;
    /**总条数*/
  @Input() total: number;
  /**表格的增删改*/
  @Output() tableOperateEvent: EventEmitter<any> = new EventEmitter<any>();
  /**单元格的点击跳转*/
  @Output() clickRouteEvent: EventEmitter<any> = new EventEmitter<any>();
  /**表格选中事件*/
  @Output() selectAllEvent: EventEmitter<any> = new EventEmitter<any>();
  /**表格搜索事件*/
  @Output() searchEvent: EventEmitter<any> = new EventEmitter<any>();
  /**表格过滤事件*/
  @Output() filterEvent: EventEmitter<any> = new EventEmitter<any>();
  /**表格重置事件*/
  @Output() resetEvent: EventEmitter<any> = new EventEmitter<any>();
  /**表格过滤事件*/
  @Output() pageIndexEvent: EventEmitter<any> = new EventEmitter<any>();
  /**表格排序事件*/
  @Output() sortEvent: EventEmitter<any> = new EventEmitter<any>();
  /**表格单元格编辑事件*/
  @Output() cellEditEvent: EventEmitter<any> = new EventEmitter<any>();
  indeterminate = false;
  constructor(){
      this.allChecked = false;
      this.current = 1;
  }
  /**改变是否选中的状态*/
  refreshStatus(): void {
      const allChecked = this.dataSet.every(value => value.disabled || value.checked);
      const allUnChecked = this.dataSet.every(value => value.disabled || !value.checked);
      this.allChecked = allChecked;
      this.indeterminate = (!allChecked) && (!allUnChecked);
  }
  /**选中数据*/
  selectedData() {
      const arr = [];
      this.dataSet.filter(value => value.checked);
      this.dataSet.forEach( item => {
          if (item.hasOwnProperty('checked') && item.checked) {
              arr.push(item);
          }
      });
      this.selectAllEvent.emit(arr);
  }
  /**当前页码改版时的回调函数*/
  indexChange() {
    this.refreshStatus();
    this.pageIndexEvent.emit(this.current);
  }
  /**页数改变时的回调函数	*/
  sizeChange() {
    this.refreshStatus();
  }
  /**点击搜索*/
  search(value) {
    this.searchEvent.emit([value, this.searchValue]);
    this.searchValue = '';
  }
  /**操作行数据*/
  operate(data, operate) {
    this.tableOperateEvent.emit([data, operate]);
  }
  /**排序*/
  sort($event, filed) {
    this.sortEvent.emit([$event, filed]);
  }
  /**重置 重置*/
  resetArrayChange() {
      this.resetArray.forEach( item => { item.checked = false});
      this.resetEvent.emit();
  }
  /**重置  确定*/
  onOk() {
      const arr = this.resetArray.filter( item => item.checked === true);
      this.filterEvent.emit(arr);
  }
  /**全选 */
  checkAll(value: boolean): void {
      if (value) {
          this.dataSet.forEach(data => {
              if (!data.disabled) {
                  data.checked = true;
              }
          });
      } else {
          this.dataSet.forEach(data => data.checked = false);
      }
      this.refreshStatus();
  }

  /**双击编辑编辑*/
    startEdit(data, key, value) {
        this.editCache[ key ].edit = true;
        this.editColCache[ value ].edit = true;
    }
      save(head, data, value, editValue){
        this.editCache[ data.key ].edit = false;
        this.cellEditEvent.emit([data, editValue, head.field]);
    }

    /**点击可跳转*/
    clickRoute(header,data) {
        this.clickRouteEvent.emit([header, data]);
    }
    /**检测组件数据变化的生命周期函数*/
    ngOnChanges(): void {
        if (this.total) {
            this.dataSet.forEach( (item, index) => {
                Object.assign(item, {key: index.toString()})
            });
            this.dataSet.forEach(item => {
                if (!this.editCache[ item.key ]) {
                    this.editCache[ item.key ] = {
                        edit: false,
                        data: { ...item }
                    };
                }
            });
        }

        if (this.headData.length) {
            this.headData.forEach( (item, index) => {
                Object.assign(item, {keyCol: index.toString()})
            });
            this.headData.forEach( item => {
                if (!this.editColCache[item.keyCol]) {
                    this.editColCache[ item.keyCol ] = {
                        edit: false,
                        data: { ...item }
                    };
                }
            });
        }
    }
      ngOnInit(): void {

      }
}
