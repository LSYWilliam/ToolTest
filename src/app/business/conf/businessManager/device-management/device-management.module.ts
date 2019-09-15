import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {NgZorroAntdModule} from "ng-zorro-antd";
import {DeviceManagementComponent} from "./component/device-management.component";
import { DeviceManagementRoutingModule } from "./device-management-routing.module";
import {PluginsModule} from "../../../../plugins/plugins.module";
import {BusinessListService} from "./service/device-management.service";
import {SharedModule} from "../../../../shared/shared.module";
import {FormsModule} from "@angular/forms";



@NgModule({
    imports: [
        CommonModule,
        DeviceManagementRoutingModule,
        FormsModule,
        NgZorroAntdModule,
        SharedModule,
        PluginsModule
    ],
    providers: [BusinessListService],
    declarations: [ DeviceManagementComponent ]
})

export class DeviceManagementModule { }
