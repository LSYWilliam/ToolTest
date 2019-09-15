import {Component, OnInit} from '@angular/core';
import {ApResourceMonitorService} from "../service/ap-resource-monitor.service";
import {routerTransition} from "../../../../../animations/route-animations";

@Component({
    selector: 'app-ap-resource-monitor',
    templateUrl: './ap-resource-monitor.component.html',
    styleUrls: ['./ap-resource-monitor.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})
export class ApResourceMonitorComponent extends ApResourceMonitorService implements OnInit {
    /** 定义个windowHeight类型 */
    public windowHeight: number;

    ngOnInit() {
        this.windowHeight = window.innerHeight-170;
    }

}
