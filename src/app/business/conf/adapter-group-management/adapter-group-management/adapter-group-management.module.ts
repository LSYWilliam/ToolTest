import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgZorroAntdModule} from "ng-zorro-antd";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PluginsModule} from "../../../../plugins/plugins.module";
import {AdapterGroupManagementComponent} from "./component/adapter-group-management.component";
import {AdapterGroupManagementService} from "./service/adapter-group-management.service";
import {AdapterGroupManagementModalComponent} from "./component/adapter-management-modal/adapter-group-management-modal.component";
import {AdapterGroupManagementRoutingModule} from "./adapter-group-management-routing.module";

@NgModule({
    imports: [
        CommonModule,
        AdapterGroupManagementRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        PluginsModule,
        NgZorroAntdModule.forRoot()
    ],
    providers: [AdapterGroupManagementService],
    declarations: [
        AdapterGroupManagementComponent,
        AdapterGroupManagementModalComponent
    ],
    entryComponents: [
        AdapterGroupManagementModalComponent
    ]
})
export class AdapterGroupManagementModule {
}
