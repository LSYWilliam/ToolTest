import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgZorroAntdModule} from "ng-zorro-antd";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LogManagementModalComponent} from "./component/log-management-modal/log-management-modal.component";
import {LogManagementComponent} from "./component/log-management.component";
import {LogManagementRoutingModule} from "./log-management-routing.module";
import {PluginsModule} from "../../../plugins/plugins.module";
import {LogManagementService} from "./service/log-management.service";
import {SharedModule} from "../../../shared/shared.module";
import {NetworkResolverService} from "../../../shared/service/network-resolver.service";

@NgModule({
    imports: [
        CommonModule,
        LogManagementRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        PluginsModule,
        NgZorroAntdModule.forRoot(),
        SharedModule
    ],
    providers: [LogManagementService,NetworkResolverService],
    declarations: [
        LogManagementComponent,
        LogManagementModalComponent
    ],
    entryComponents: [
        LogManagementModalComponent
    ]
})
export class LogManagementModule {
}
