import {Component, OnInit} from '@angular/core';
import {routerTransition} from "../../../../animations/route-animations";

/**
 * 当日概况模块
 * @class OverviewComponent
*/
@Component
({
    selector: 'app-alert-receiver-conf',
    templateUrl: './alert-receiver-conf.component.html',
    styleUrls: ['./alert-receiver-conf.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})

export class AlertReceiverConfComponent implements OnInit  {

    ngOnInit() {}
}
