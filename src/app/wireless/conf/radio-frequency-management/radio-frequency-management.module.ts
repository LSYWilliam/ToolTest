import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {NgZorroAntdModule} from "ng-zorro-antd";
import {RadioFrequencyManagementComponent} from "./component/radio-frequency-management.component";
import { RadioFrequencyManagementRoutingModule } from "./radio-frequency-management-routing.module";
import {PluginsModule} from "../../../plugins/plugins.module";
import {RadioFrequencyManagementService} from "./service/radio-frequency-management.service";
import {SharedModule} from "../../../shared/shared.module";
import {RadioFreqModalComponent} from "./component/radio-freq-modal/radio-freq-modal.component";

@NgModule({
    imports: [
        CommonModule,
        RadioFrequencyManagementRoutingModule,
        NgZorroAntdModule,
        PluginsModule,
        SharedModule
    ],
    providers: [RadioFrequencyManagementService],
    declarations: [ RadioFrequencyManagementComponent, RadioFreqModalComponent ],
    entryComponents : [RadioFreqModalComponent]
})

export class RadioFrequencyManagementModule { }
