import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {NgZorroAntdModule} from "ng-zorro-antd";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {SsidConfComponent} from "./component/ssid-conf.component";
import { SsidConfRoutingModule } from "./ssid-conf-routing.module";
import {PluginsModule} from "../../../plugins/plugins.module";
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        SsidConfRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        NgZorroAntdModule.forRoot(),
        PluginsModule
    ],
    providers: [],
    declarations: [ SsidConfComponent],
    entryComponents: []

})

export class SsidConfModule { }
