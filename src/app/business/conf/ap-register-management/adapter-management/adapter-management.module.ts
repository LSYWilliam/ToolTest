import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdapterManagementRoutingModule} from "./adapter-management-routing.module";
import {NgZorroAntdModule} from "ng-zorro-antd";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AdapterManagementComponent} from "./component/adapter-management.component";
import {AdapterManagementService} from "./service/adapter-management.service";
import {PluginsModule} from "../../../../plugins/plugins.module";
import { AdapterManagementModalComponent } from './component/adapter-management-modal/adapter-management-modal.component';
import {SharedModule} from "../../../../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        AdapterManagementRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        PluginsModule,
        SharedModule,
        NgZorroAntdModule.forRoot()
    ],
    providers: [AdapterManagementService],
    declarations: [
        AdapterManagementComponent,
        AdapterManagementModalComponent
    ],
    entryComponents: [
        AdapterManagementModalComponent
    ]
})
export class AdapterManagementModule {
}
