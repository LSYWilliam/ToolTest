import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgZorroAntdModule } from "ng-zorro-antd";
import { PluginsModule } from "../../../plugins/plugins.module";
import { SharedModule } from "../../../shared/shared.module";

import {AuthenticateAssetManagementService} from "./service/authenticate-asset-management.service";

import {AuthenticateUserListComponent} from "./commponent/authenticate-user-list.component";
import {AuthenticateUserListRoutingModule} from "./authenticate-user-list-routing.module";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
        PluginsModule,
        SharedModule,
        AuthenticateUserListRoutingModule
    ],
    providers: [AuthenticateAssetManagementService],
    declarations: [ AuthenticateUserListComponent ],
    entryComponents: []
})

export class AuthenticateUserListModule { }
