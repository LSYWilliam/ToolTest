import {Component, Input} from '@angular/core';

/**
  * 顶部菜单布局组件
  * @class HeaderLayoutComponent
*/
@Component({
  selector: 'app-instructions-user',
  templateUrl: './instructions-user.component.html',
  styleUrls: ['./instructions-user.component.scss']
})

export class InstructionsUserComponent {
    /**接收父组件传递来的组件使用介绍的数据*/
    @Input() public intructionUse: any;
    @Input() public tabs: any;
    public isClosed: any;
    constructor() {
      this.isClosed = true;
    }
    downOrUp() {
      this.isClosed = !this.isClosed;
    }
}
