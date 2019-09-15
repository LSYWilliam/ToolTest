import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgZorroAntdModule} from "ng-zorro-antd";
import {PluginsModule} from "../../../../plugins/plugins.module";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from "../../../../shared/shared.module";
import { EditSnifferRoutingModule } from "./edit-sniffer-routing.module";
import { EditSnifferService } from "./service/edit-sniffer.service";
import { EditSnifferComponent} from "./component/edit-sniffer.component";
import {LinkComponent} from "./component/area/area.component";

@NgModule({
    imports: [
        CommonModule,
        EditSnifferRoutingModule,
        NgZorroAntdModule,
        PluginsModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule.forRoot(),
    ],
    providers: [EditSnifferService],
    declarations: [ EditSnifferComponent, LinkComponent ],
    entryComponents: [LinkComponent]
})

export class EditSnifferModule { }
