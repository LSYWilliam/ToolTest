import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgZorroAntdModule} from "ng-zorro-antd";
import {PluginsModule} from "../../../../plugins/plugins.module";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from "../../../../shared/shared.module";
import {ExamineMySnifferRoutingModule} from "./examine-my-sniffer-routing.module";
import {ExamineMySnifferService} from "./service/examine-my-sniffer.service";
import {ExamineMySnifferComponent} from "./component/examine-my-sniffer.component";
import {QueryCriteriaComponent} from "./component/query-criteria/query-criteria.component";

@NgModule({
    imports: [
        CommonModule,
        ExamineMySnifferRoutingModule,
        NgZorroAntdModule.forRoot(),
        SharedModule,
        PluginsModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [ExamineMySnifferService],
    declarations: [ ExamineMySnifferComponent, QueryCriteriaComponent ],
    entryComponents: []
})

export class ExamineMySnifferModule { }
