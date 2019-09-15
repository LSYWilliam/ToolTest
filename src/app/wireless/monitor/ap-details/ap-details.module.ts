import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {NgZorroAntdModule} from "ng-zorro-antd";

import {ApDetailsComponent} from "./component/ap-details.component";
import { ApDetailsRoutingModule } from "./ap-details-routing.module";
import {PluginsModule} from "../../../plugins/plugins.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../../shared/shared.module";
import {SummaryStatisticsComponent} from "./component/summary-statistics/summary-statistics.component";
import {EventLogsComponent} from "./component/event-logs/event-logs.component";
import {AlarmInformationComponent} from "./component/alarm-information/alarm-information.component";
import {ApInfoComponent} from "./component/ap-info/ap-info.component";

@NgModule({
    imports: [
        CommonModule,
        ApDetailsRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        NgZorroAntdModule.forRoot(),
        PluginsModule
    ],
    providers: [],
    declarations: [
        ApInfoComponent,
        ApDetailsComponent,
        SummaryStatisticsComponent,
        EventLogsComponent,
        AlarmInformationComponent,
    ]
})

export class ApDetailsModule { }
