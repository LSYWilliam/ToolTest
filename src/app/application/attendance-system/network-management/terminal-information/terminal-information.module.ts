import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TerminalInformationRoutingModule} from "./terminal-information-routing.module";
import {NgZorroAntdModule} from "ng-zorro-antd";
import {TerminalInformationComponent} from "./component/terminal-information.component";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../../../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        TerminalInformationRoutingModule,
        NgZorroAntdModule.forRoot(),
        SharedModule,
        FormsModule
    ],
    declarations: [
        TerminalInformationComponent
    ]
})
export class TerminalInformationModule {
}
