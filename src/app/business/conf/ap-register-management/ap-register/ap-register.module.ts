import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ApRegisterRoutingModule} from "./ap-register-routing.module";
import {NgZorroAntdModule} from "ng-zorro-antd";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ApRegisterService} from "./service/ap-register.service";
import {ApRegisterComponent} from "./component/ap-register.component";
import {ApRegisterModalComponent} from './component/ap-register-modal/ap-register-modal.component';
import {PluginsModule} from "../../../../plugins/plugins.module";
import {AdapterManagementModalComponent} from "../adapter-management/component/adapter-management-modal/adapter-management-modal.component";
import {SharedModule} from "../../../../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        ApRegisterRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule.forRoot(),
        SharedModule,
        PluginsModule
    ],
    providers: [ApRegisterService],
    declarations: [
        ApRegisterComponent,
        ApRegisterModalComponent
    ],
    entryComponents: [
        ApRegisterModalComponent
    ]
})
export class ApRegisterModule {
}
