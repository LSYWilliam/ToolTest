import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgZorroAntdModule} from "ng-zorro-antd";
import {PluginsModule} from "../../../../plugins/plugins.module";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from "../../../../shared/shared.module";
import {ManageMySnifferRoutingModule} from "./manage-my-sniffer-routing.module";
import { ManageMySnifferService } from "./service/manage-my-sniffer.service";
import {ManageMySnifferComponent} from "./component/manage-my-sniffer.component";

@NgModule({
    imports: [
        CommonModule,
        ManageMySnifferRoutingModule,
        NgZorroAntdModule,
        PluginsModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule.forRoot(),
    ],
    providers: [ManageMySnifferService],
    declarations: [ManageMySnifferComponent,],
    entryComponents: []
})

export class ManageMySnifferModule { }
