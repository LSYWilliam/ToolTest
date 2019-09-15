import {Component, OnInit} from '@angular/core';
import {OnlineStaffService} from "../service/online-staff.service";
import {routerTransition} from "../../../../../animations/route-animations";

@Component({
    selector: 'app-online-staff',
    templateUrl: './online-staff.component.html',
    styleUrls: ['./online-staff.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})
export class OnlineStaffComponent extends OnlineStaffService implements OnInit {

    ngOnInit() {
    }

}
