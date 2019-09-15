import {Component, OnInit} from '@angular/core';
import {OnlineVisitorsService} from "../service/online-visitors.service";
import {routerTransition} from "../../../../../animations/route-animations";

@Component({
    selector: 'app-online-visitors',
    templateUrl: './online-visitors.component.html',
    styleUrls: ['./online-visitors.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})
export class OnlineVisitorsComponent extends OnlineVisitorsService implements OnInit {
    ngOnInit() {
    }

}
