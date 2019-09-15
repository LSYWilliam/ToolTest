import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MonthlySummaryRoutingModule} from "./monthly-summary-routing.module";
import {MonthlySummaryComponent} from "./component/monthly-summary.component";
import {NgZorroAntdModule} from "ng-zorro-antd";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../../../shared/shared.module";
import { MothlyUserDetailModalComponent } from './component/mothly-user-detail-modal/mothly-user-detail-modal.component';

@NgModule({
    imports: [
        CommonModule,
        MonthlySummaryRoutingModule,
        NgZorroAntdModule.forRoot(),
        SharedModule,
        FormsModule
    ],
    declarations: [
        MonthlySummaryComponent,
        MothlyUserDetailModalComponent
    ],
    entryComponents: [
        MothlyUserDetailModalComponent
    ]
})
export class MonthlySummaryModule {
}
