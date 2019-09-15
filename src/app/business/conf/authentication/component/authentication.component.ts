import {Component} from '@angular/core';
import {routerTransition} from '../../../../animations/route-animations';
import {TableHeader} from "../model/table-header";

/**
 * 认证计费
 * @class AuthenticationComponent
 */
@Component
({
    selector: 'app-authentication',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})

export class AuthenticationComponent {
    /** 表格头部实例化 */
    public tableHeader: TableHeader = new TableHeader();
}


