import {Component, OnInit} from '@angular/core';
import {TerminalInformationService} from "../service/terminal-information.service";
import {routerTransition} from "../../../../../animations/route-animations";

@Component({
    selector: 'app-terminal-information',
    templateUrl: './terminal-information.component.html',
    styleUrls: ['./terminal-information.component.scss'],
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
})
export class TerminalInformationComponent extends TerminalInformationService implements OnInit {

    ngOnInit() {
    }

}
