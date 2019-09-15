import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OnlineVisitorsComponent} from "./component/online-visitors.component";
import {OnlineVisitorsRoutingModule} from "./online-visitors-routing.module";
import {NgZorroAntdModule} from "ng-zorro-antd";
import {ChartModule} from "angular2-highcharts";
import {PluginsModule} from "../../../../plugins/plugins.module";

@NgModule({
    imports: [
        CommonModule,
        OnlineVisitorsRoutingModule,
        NgZorroAntdModule.forRoot(),
        ChartModule,
        PluginsModule
    ],
    declarations: [
        OnlineVisitorsComponent
    ]
})
export class OnlineVisitorsModule {
}
