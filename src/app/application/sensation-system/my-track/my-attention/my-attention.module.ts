import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgZorroAntdModule} from "ng-zorro-antd";
import {PluginsModule} from "../../../../plugins/plugins.module";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from "../../../../shared/shared.module";
import {MyAttentionRoutingModule} from "./my-attention-routing.module";
import {MyAttentionService} from "./service/my-attention.service";
import {MyAttentionComponent} from "./component/my-attention.component";


@NgModule({
    imports: [
        CommonModule,
        MyAttentionRoutingModule,
        NgZorroAntdModule,
        PluginsModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule.forRoot(),
    ],
    providers: [MyAttentionService],
    declarations: [
        MyAttentionComponent,
    ],
    entryComponents: [
    ]
})

export class MyAttentionModule { }
