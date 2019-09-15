import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from "ng-zorro-antd";
import { AuthenticationComponent } from "./component/authentication.component";
import { AuthenticationRoutingModule } from "./authentication-routing.module";
import { PluginsModule } from "../../../plugins/plugins.module";
import { SharedModule } from "../../../shared/shared.module";
import { AuthenticationService } from "./service/authentication.service";
import { PortalComponent } from "./component/portal/portal.component";
import {AuthenticationModalComponent} from "./component/authentication-modal/authentication-modal.component";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AuthenticationRoutingModule,
        NgZorroAntdModule,
        PluginsModule,
        SharedModule
    ],
    providers: [AuthenticationService],
    declarations: [
        AuthenticationComponent,
        PortalComponent,
        AuthenticationModalComponent
    ],
    entryComponents: [AuthenticationModalComponent]
})

export class AuthenticationModule { }
