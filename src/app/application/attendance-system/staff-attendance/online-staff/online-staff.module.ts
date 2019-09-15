import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OnlineStaffRoutingModule} from "./online-staff-routing.module";
import {OnlineStaffComponent} from "./component/online-staff.component";
import {NgZorroAntdModule} from "ng-zorro-antd";
import {ChartModule} from "angular2-highcharts";

@NgModule({
    imports: [
        CommonModule,
        OnlineStaffRoutingModule,
        NgZorroAntdModule.forRoot(),
        ChartModule
    ],
    declarations: [
        OnlineStaffComponent
    ]
})
export class OnlineStaffModule {
}
