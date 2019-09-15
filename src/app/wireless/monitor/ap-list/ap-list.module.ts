import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {NgZorroAntdModule} from "ng-zorro-antd";

import {ApListComponent} from "./component/ap-list.component";
import { ApListRoutingModule } from "./ap-list-routing.module";
import {PluginsModule} from "../../../plugins/plugins.module";
import {SharedModule} from "../../../shared/shared.module";
import {ApListServer} from "./service/ap-list.server";
import {ApListModalComponent} from "./component/ap-list-modal/ap-list-modal.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        ApListRoutingModule,
        NgZorroAntdModule,
        PluginsModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [ApListServer],
    declarations: [ ApListComponent, ApListModalComponent ],
    entryComponents: [ ApListModalComponent ]
})

export class ApListModule { }
