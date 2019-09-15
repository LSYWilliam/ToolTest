import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgZorroAntdModule} from "ng-zorro-antd";
import {PluginsModule} from "../../../../plugins/plugins.module";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from "../../../../shared/shared.module";
import {MyRecycleBinComponent} from "./component/my-recycle-bin.component";
import {MyRecycleBinService} from "./service/my-recycle-bin.service";
import {MyRecycleBinRoutingModule} from "./my-recycle-bin-routing.module";



@NgModule({
    imports: [
        CommonModule,
        MyRecycleBinRoutingModule,
        NgZorroAntdModule,
        PluginsModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule.forRoot(),
    ],
    providers: [MyRecycleBinService],
    declarations: [
        MyRecycleBinComponent,
    ],
    entryComponents: [
    ]
})

export class MyRecycleBinModule { }
