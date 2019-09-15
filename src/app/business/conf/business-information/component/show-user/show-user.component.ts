import {Component, OnInit} from '@angular/core';
import {routerTransition} from "../../../../../animations/route-animations";


/**
 * 当日概况模块
 * @class OverviewComponent
*/
@Component
({
    selector: 'app-show-user',
    templateUrl: './show-user.component.html',
    styleUrls: ['./show-user.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})

export class ShowUserComponent implements OnInit  {

    ngOnInit() {}
}
