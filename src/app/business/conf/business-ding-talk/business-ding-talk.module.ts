import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BusinessDingTalkComponent} from "./component/business-ding-talk.component";
import {BusinessDingTalkService} from "./service/business-ding-talk.service";
import {BusinessDingTalkRoutingModule} from "./business-ding-talk-routing.module";
import {NgZorroAntdModule} from "ng-zorro-antd";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonUtilService} from "../../../shared/service/common-util.service";
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        BusinessDingTalkRoutingModule,
        NgZorroAntdModule.forRoot(),
        SharedModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [BusinessDingTalkService,CommonUtilService],
    declarations: [
        BusinessDingTalkComponent
    ]
})
export class BusinessDingTalkModule {
}
