import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FirmwareManagementPlatformComponent } from './component/firmware-management-platform.component';
import { FirmwareManagementPlatformRoutingModule } from './firmware-management-platform-routing.module';
import { PluginsModule} from '../../../plugins/plugins.module';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
    imports: [
        CommonModule,
        FirmwareManagementPlatformRoutingModule,
        NgZorroAntdModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        PluginsModule,
        SharedModule
    ],
    providers: [],
    declarations: [
        FirmwareManagementPlatformComponent
    ]
})

export class FirmwareManagementPlatformModule { }
