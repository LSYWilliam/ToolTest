import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgZorroAntdModule} from "ng-zorro-antd";
import {PluginsModule} from "../../../../plugins/plugins.module";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from "../../../../shared/shared.module";
import { EditTopicRoutingModule } from "./edit-topic-routing.module";
import { EditTopicService } from "./service/edit-topic.service";
import { EditTopicComponent} from "./component/edit-topic.component";
import {LinkComponent} from "./component/area/area.component";

@NgModule({
    imports: [
        CommonModule,
        EditTopicRoutingModule,
        NgZorroAntdModule,
        PluginsModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule.forRoot(),
    ],
    providers: [EditTopicService],
    declarations: [ EditTopicComponent, LinkComponent ],
    entryComponents: [LinkComponent]
})

export class EditTopicModule { }
