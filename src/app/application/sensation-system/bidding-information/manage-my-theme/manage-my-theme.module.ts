import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgZorroAntdModule} from "ng-zorro-antd";
import {PluginsModule} from "../../../../plugins/plugins.module";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from "../../../../shared/shared.module";
import { ManageMyThemeRoutingModule } from "./manage-my-theme-routing.module";
import { ManageMyThemeService } from "./service/manage-my-theme.service";
import { ManageMyThemeComponent} from "./component/manage-my-theme.component";

@NgModule({
    imports: [
        CommonModule,
        ManageMyThemeRoutingModule,
        NgZorroAntdModule,
        PluginsModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule.forRoot(),
    ],
    providers: [ManageMyThemeService],
    declarations: [ManageMyThemeComponent,],
    entryComponents: []
})

export class ManageMyThemeModule { }
