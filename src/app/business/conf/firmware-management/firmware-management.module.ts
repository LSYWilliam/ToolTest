import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {NgZorroAntdModule} from "ng-zorro-antd";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FirmwareManagementComponent} from "./component/firmware-management.component";
import {FirmwareManagementRoutingModule} from "./firmware-management-routing.module";
import {PluginsModule} from "../../../plugins/plugins.module";
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        FirmwareManagementRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule.forRoot(),
        PluginsModule,
        SharedModule
    ],
    providers: [],
    declarations: [ FirmwareManagementComponent ]
})

export class FirmwareManagementModule { }
