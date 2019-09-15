import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgZorroAntdModule} from "ng-zorro-antd";
import {PluginsModule} from "../../../../plugins/plugins.module";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from "../../../../shared/shared.module";
import {OpenBidRoutingModule} from "./open-bid-routing.module";
import {OpenBidComponent} from "./component/open-bid.component";
import {OpenBidService} from "./service/open-bid.service";


@NgModule({
    imports: [
        CommonModule,
        OpenBidRoutingModule,
        NgZorroAntdModule,
        PluginsModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule.forRoot(),
    ],
    providers: [OpenBidService],
    declarations: [
        OpenBidComponent,
    ],
    entryComponents: [
    ]
})

export class OpenBidModule { }
