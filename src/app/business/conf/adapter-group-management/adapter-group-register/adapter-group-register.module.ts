import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgZorroAntdModule} from "ng-zorro-antd";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PluginsModule} from "../../../../plugins/plugins.module";
import {SharedModule} from "../../../../shared/shared.module";
import {AdapterGroupRegisterComponent} from "./component/adapter-group-register.component";
import {AdapterGroupRegisterService} from "./service/adapter-group-register.service";
import {AdapterGroupRegisterModalComponent} from "./component/adapter-group-register-modal/adapter-group-register-modal.component";
import {AdapterGroupRegisterRoutingModule} from "./adapter-group-register-routing.module";

@NgModule({
    imports: [
        CommonModule,
        AdapterGroupRegisterRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule.forRoot(),
        SharedModule,
        PluginsModule
    ],
    providers: [AdapterGroupRegisterService],
    declarations: [
        AdapterGroupRegisterComponent,
        AdapterGroupRegisterModalComponent
    ],
    entryComponents: [
        AdapterGroupRegisterModalComponent
    ]
})
export class AdapterGroupRegisterModule {
}
