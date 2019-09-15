import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OnlineUsersRoutingModule} from "./online-users-routing.module";
import {OnlineUsersComponent} from "./component/online-users.component";
import {NgZorroAntdModule} from "ng-zorro-antd";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../../../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        OnlineUsersRoutingModule,
        NgZorroAntdModule.forRoot(),
        SharedModule,
        FormsModule
    ],
    declarations: [
        OnlineUsersComponent
    ]
})
export class OnlineUsersModule {
}
