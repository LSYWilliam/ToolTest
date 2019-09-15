import {Component, OnInit} from '@angular/core';
import {OnlineUsersService} from "../service/online-users.service";
import {routerTransition} from "../../../../../animations/route-animations";

@Component({
    selector: 'app-online-users',
    templateUrl: './online-users.component.html',
    styleUrls: ['./online-users.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})
export class OnlineUsersComponent extends OnlineUsersService implements OnInit {

    ngOnInit() {
    }

}
