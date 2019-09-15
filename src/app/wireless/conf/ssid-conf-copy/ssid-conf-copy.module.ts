import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {NgZorroAntdModule} from "ng-zorro-antd";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {SsidConfCopyComponent} from "./component/ssid-conf-copy.component";
import { SsidConfCopyRoutingModule } from "./ssid-conf-copy-routing.module";
import {PluginsModule} from "../../../plugins/plugins.module";
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        SsidConfCopyRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        NgZorroAntdModule.forRoot(),
        PluginsModule
    ],
    providers: [],
    declarations: [ SsidConfCopyComponent],
    entryComponents: []

})

export class SsidConfCopyModule { }
