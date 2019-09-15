import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgZorroAntdModule} from "ng-zorro-antd";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PluginsModule} from "../../../plugins/plugins.module";
import {SharedModule} from "../../../shared/shared.module";
import {InstallRecordRoutingModule} from './install-record-routing.module';
import {InstallRecordComponent} from './component/install-record.component';
import {InstallRecordService} from "./service/install-record.service";


@NgModule({
    imports: [
        CommonModule,
        InstallRecordRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule.forRoot(),
        PluginsModule,
        SharedModule
    ],
    providers: [ InstallRecordService ],
    declarations: [ InstallRecordComponent ]
})

export class InstallRecordModule { }
