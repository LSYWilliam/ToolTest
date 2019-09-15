import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {NgZorroAntdModule} from "ng-zorro-antd";

import {AlertReceiverListComponent} from "./component/alert-receiver-list.component";
import { AlertReceiverListRoutingModule } from "./alert-receiver-list-routing.module";
import {PluginsModule} from "../../../plugins/plugins.module";
import {TableModel} from "../../../plugins/component/table/table.model";
import {TableComponent} from "../../../plugins/component/table/table.component";
import { AgGridModule } from 'ag-grid-angular/main';

@NgModule({
    imports: [
        CommonModule,
        AlertReceiverListRoutingModule,
        NgZorroAntdModule,
        PluginsModule,
        /* TableComponent, */
        AgGridModule
    ],
    providers: [],
    declarations: [ AlertReceiverListComponent ]
})

export class AlertReceiverListModule { }
