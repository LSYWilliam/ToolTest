import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {NgZorroAntdModule} from "ng-zorro-antd";
import {AlertReceiverConfComponent} from "./component/alert-receiver-conf.component";
import { AlertReceiverConfRoutingModule } from "./alert-receiver-conf-routing.module";
import {PluginsModule} from "../../../plugins/plugins.module";



@NgModule({
    imports: [
        CommonModule,
        AlertReceiverConfRoutingModule,
        NgZorroAntdModule,
        PluginsModule
    ],
    providers: [],
    declarations: [ AlertReceiverConfComponent ]
})

export class AlertReceiverConfModule { }
