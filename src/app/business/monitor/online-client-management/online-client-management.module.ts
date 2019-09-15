import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OnlineClientManagementComponent} from './component/online-client-management.component';
import {OnlineClientManagementService} from "./service/online-client-management.service";
import {SharedModule} from "../../../shared/shared.module";
import {NgZorroAntdModule} from "ng-zorro-antd";
import {PluginsModule} from "../../../plugins/plugins.module";
import {FormsModule} from "@angular/forms";
import {OnlineClientManagementRoutingModule} from "./online-client-management-routing.module";

@NgModule({
    imports: [
        CommonModule,
        NgZorroAntdModule,
        PluginsModule,
        SharedModule,
        FormsModule,
        OnlineClientManagementRoutingModule
    ],
    providers: [OnlineClientManagementService],
    declarations: [OnlineClientManagementComponent]
})
export class OnlineClientManagementModule {
}
