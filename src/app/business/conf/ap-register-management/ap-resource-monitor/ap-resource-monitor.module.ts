import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ApResourceMonitorRoutingModule} from "./ap-resource-monitor-routing.module";
import {ApResourceMonitorService} from "./service/ap-resource-monitor.service";
import {NgZorroAntdModule} from "ng-zorro-antd";
import {ApResourceMonitorComponent} from "./component/ap-resource-monitor.component";
import {SharedModule} from "../../../../shared/shared.module";
import {PluginsModule} from "../../../../plugins/plugins.module";

@NgModule({
    imports: [
        CommonModule,
        ApResourceMonitorRoutingModule,
        NgZorroAntdModule.forRoot(),
        SharedModule,
        PluginsModule
    ],
    providers: [ApResourceMonitorService],
    declarations: [
        ApResourceMonitorComponent
    ]
})
export class ApResourceMonitorModule {
}
