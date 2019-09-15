import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NetworkVisitorComponent} from "./component/network-visitor.component";
import {NetworkVisitorRoutingModule} from "./network-visitor-routing.module";
import {NgZorroAntdModule} from "ng-zorro-antd";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../../../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        NetworkVisitorRoutingModule,
        NgZorroAntdModule.forRoot(),
        SharedModule,
        FormsModule
    ],
    declarations: [
        NetworkVisitorComponent
    ]
})
export class NetworkVisitorModule {
}
