import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {NgZorroAntdModule} from "ng-zorro-antd";

import {BlackWhiteListComponent} from "./component/black-white-list.component";
import { BlackWhiteListRoutingModule } from "./black-white-list-routing.module";
import {PluginsModule} from "../../../plugins/plugins.module";
import {BlackWhiteListService} from "./service/black-white-list.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BlackWhiteModalComponent} from "./component/black-white-modal/black-white-modal.component";
import {ConfirmModalComponent} from "../../../shared/component/confirm-modal/confirm-modal.component";
import {SharedModule} from "../../../shared/shared.module";



@NgModule({
    imports: [
        CommonModule,
        BlackWhiteListRoutingModule,
        FormsModule,
        SharedModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
        PluginsModule
    ],
    providers: [BlackWhiteListService],
    declarations: [ BlackWhiteListComponent,BlackWhiteModalComponent ],
    entryComponents: [BlackWhiteModalComponent]
})

export class BlackWhiteListModule { }
