import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {NgZorroAntdModule} from "ng-zorro-antd";
import {ProbeConfComponent} from "./component/probe-conf.component";
import { ProbeConfRoutingModule } from "./probe-conf-routing.module";
import {PluginsModule} from "../../../plugins/plugins.module";
import {ProbeConfService} from "./service/probe-conf.service";
import {SharedModule} from "../../../shared/shared.module";
import {ProbeConfModalComponent} from "./component/probe-conf-modal/probe-conf-modal.component";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
    imports: [
        CommonModule,
        ProbeConfRoutingModule,
        NgZorroAntdModule,
        PluginsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    providers: [ProbeConfService],
    declarations: [ ProbeConfComponent,ProbeConfModalComponent ],
    entryComponents : [ProbeConfModalComponent]
})

export class ProbeConfModule { }
