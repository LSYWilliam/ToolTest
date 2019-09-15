import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {NgZorroAntdModule} from 'ng-zorro-antd';

import {OverviewComponent} from './component/overview.component';
import {OverviewRoutingModule} from './overview-routing.module';
import {OverviewService} from './service/overview.service';
import {PluginsModule} from '../../plugins/plugins.module';
import {ColumnchartsComponent} from "./component/columncharts/columncharts.component";
import {ChartModule} from "angular2-highcharts";
import {CarouserComponent} from "./component/carouser/carouser.component";
import {SharedModule} from "../../shared/shared.module";
import {DeviceWebComponent} from "./component/device-web/device-web.component";

@NgModule({
    imports: [
        CommonModule,
        OverviewRoutingModule,
        NgZorroAntdModule,
        SharedModule,
        PluginsModule,
        ChartModule
    ],
    providers: [OverviewService],
    declarations: [
        OverviewComponent,
        ColumnchartsComponent,
        CarouserComponent,
        DeviceWebComponent
    ],
    entryComponents: [
        ColumnchartsComponent,
        CarouserComponent,
        DeviceWebComponent
    ]
})

export class OverviewModule { }
