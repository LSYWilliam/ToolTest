import {Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit} from '@angular/core';
import {NewDropDownsInterface} from "./model/newdropdown.model";


/**
 * table效果组件
 * @class EditTableComponent
 */

@Component({
  selector: 'app-newdropdown',
  templateUrl: './newdropdown.component.html',
  styleUrls: ['./newdropdown.component.scss']
})
export class NewDropDownComponent implements OnChanges, OnInit {
  /**下拉组件输入状态(开启 or 禁用)*/
  @Input() status: boolean;
  /**下拉组件展示字体尺寸*/
  @Input() fontSize: number;
  /**下拉组件被选中数据，双向绑定，可以直接使用*/
  _dropDownValue: string;
  @Input()
  get dropDownValue() {
    // if (this.dropdownlist && this.dropdownlist.length > 0) {
    //   this.dropdownlist.foreach(res => {
    //     if (res.id === this._dropdownvalue) {
    //       this.ngmodelvalue = res.name;
    //       return;
    //     }
    //   });
    // }
    return this._dropDownValue;
  }
  set dropDownValue(val: string) {
    this._dropDownValue = val;
    if (this.dropDownList && this.dropDownList.length > 0) {
      this.dropDownList.forEach(res => {
        if (res.id === this._dropDownValue) {
          this.ngModelValue = res.name;
          return;
        }
      });
    }
    this.dropDownValueChange.emit(this._dropDownValue);
  }
  @Output() dropDownValueChange = new EventEmitter<any>();
  /**下拉组件下拉菜单内容*/
  _dropDownList: Array<NewDropDownsInterface>;
  @Input()
  get dropDownList() {
    return this._dropDownList;
  }
  set dropDownList(val: Array<NewDropDownsInterface>) {
    this._dropDownList = val;
    this.dropDownListChange.emit(this._dropDownList);
  }
  @Output() dropDownListChange = new EventEmitter<any>();

  /**下拉组件页面展示值，与_dropDownValue一一对应*/
  ngModelValue: string;
  /**下拉组件页面高度*/
  height: number;

  constructor() {
      console.log()
  }

  /**检测组件数据变化的生命周期函数*/
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('dropDownValue')) {
      const dropDown = changes['dropDownValue'].currentValue;
      if (dropDown === undefined && this.dropDownList && this.dropDownList.length > 0) {
        this.dropDownValue = this.dropDownList[0].id;
        this.ngModelValue = this.dropDownList[0].name;
      }
      if (dropDown !== undefined && this.dropDownList && this.dropDownList.length > 0) {
        this.dropDownList.forEach(res => {
          if (res.id === dropDown) {
            this.ngModelValue = res.name;
            return;
          }
        });
      }
    }

    if (changes.hasOwnProperty("dropDownList")) {
      // let defaultValue = changes['dropDownList'].currentValue;
      // console.log(defaultValue);
    } else {
      // if (this.value && this.value.length > 0) {
      //     this.defaultValue = this.value[0].name;
      // }
    }
  }


  ngOnInit() {
    /**下拉组件字符尺寸赋值*/
    if (!this.fontSize) {
      this.fontSize = 12;
    }
    /**下拉组件限制下拉页面*/
    if (this.dropDownList && this.dropDownList.length > 5) {
      this.height = 175;
    }
  }

  /**点击下拉组件 下拉的某一项触发的事件*/
  selectDropDown(data) {
    this.ngModelValue = data.name;
    this.dropDownValue = data.id;
  }

}
