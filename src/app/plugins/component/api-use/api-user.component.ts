import {Component, Input} from '@angular/core';

/**
  * 顶部菜单布局组件
  * @class ApiComponent
*/
@Component({
  selector: 'app-api-user',
  templateUrl: './api-user.component.html',
  styleUrls: ['./api-user.component.scss']
})

export class ApiUserComponent {
    /**接收从父组件传递来的API使用说明*/
    @Input() public data: any;
    constructor() {
    }
}
