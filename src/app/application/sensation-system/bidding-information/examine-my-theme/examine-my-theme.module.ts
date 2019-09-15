import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgZorroAntdModule} from "ng-zorro-antd";
import {PluginsModule} from "../../../../plugins/plugins.module";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from "../../../../shared/shared.module";
import {ExamineMyThemeRoutingModule} from "./examine-my-theme-routing.module";
import {ExamineMyThemeService} from "./service/examine-my-theme.service";
import {ExamineMyThemeComponent} from "./component/examine-my-theme.component";
import {OperateComponent} from "../../../../plugins/component/table/operate/operate.component";
import {QueryCriteriaComponent} from "./component/query-criteria/query-criteria.component";

@NgModule({
    imports: [
        CommonModule,
        ExamineMyThemeRoutingModule,
        NgZorroAntdModule.forRoot(),
        SharedModule,
        PluginsModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [ExamineMyThemeService],
    declarations: [ ExamineMyThemeComponent, QueryCriteriaComponent ],
    entryComponents: []
})

export class ExamineMyThemeModule { }
